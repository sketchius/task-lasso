import React, { useState, useEffect } from 'react';
import {
	Button,
	StyleSheet,
	ScrollView,
	DeviceEventEmitter,
	View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import uuid from 'react-native-uuid';

import { Logs } from 'expo';

import * as chrono from 'chrono-node';

import formatDistance from 'date-fns/formatDistance';
import formatRelative from 'date-fns/formatRelative';

import {
	DateTimeComponent,
	EditField,
	EditFieldArray,
	SelectionList,
} from './../../components/Form';
import { getTaskByUniqid } from './../../tools/tools';

import { navigate } from './../task-screen/navigation';

import { styles } from './../../styles/styles';
import getIcon from '../../tools/Icons';
import { newTask, setRamProperty, updateTask } from '../../redux/data';
import IconPicker from '../../iconPicker';
import StyledText from '../../components/StyledText';
import StyledButton from '../../components/StyledButton';
import { addDays, differenceInCalendarDays, format } from 'date-fns';

Logs.enableExpoCliLogging();

export default function TaskEditor({ route, navigation }) {
	const tasks = useSelector(state => state.tasks);

	const [action, setAction] = useState('new');

	const [taskType, setTaskType] = useState('flexible');
	const [title, setTitle] = useState('');
	const [checklistMode, setChecklistMode] = useState(0);
	const [checklistContent, setChecklistContent] = useState([
		'Take out the trash',
		'Do the dishes',
	]);
	const [description, setDescription] = useState('');
	const [taskId, setTaskId] = useState('');
	const [taskPriority, setTaskPriority] = useState(1);
	const [taskDuration, setTaskDuration] = useState(15);
	const [iconFamily, setIconFamily] = useState('');
	const [iconName, setIconName] = useState('');
	const [dateDue, setDateDue] = useState('');
	const [dateSeed, setDateSeed] = useState('');
	const [frequency, setFrequency] = useState('');
	const [checkboxStyle, setCheckboxStyle] = useState(0);

	const isFocused = useIsFocused();

	useEffect(() => {
		if (
			route.params.action == 'edit' ||
			(route.params.action == 'expand' && route.params.uniqid)
		) {
			const task = getTaskByUniqid(route.params.uniqid);
			if (task) {
				setTitle(task.title);
				setDescription(task.description);
				setTaskId(task.uniqid);
				if (action == 'expand') setTaskType('FLEXIBLE');
				else setTaskType(task.type.toLowerCase());
				setTaskPriority(task.priority);
				setTaskDuration(task.duration);
				setIconFamily(task.iconLibrary);
				setIconName(task.iconName);
				if (task.dateDue)
					setDateDue(formatRelative(task.dateDue, new Date()));
			}
		}
		setAction(route.params.action);
	}, [isFocused]);

	const form = {};

	const handleInput = (parameter, value) => {
		form[parameter] = value;
	};

	const reportData = () => {
		alert(JSON.stringify(form));
		sendNewTask();
	};

	const testNewDateThing = () => {};

	const onSave = () => {
		let task = {
			title,
			description,
			type: taskType.toUpperCase(),
			priority: taskPriority,
			duration: taskDuration,
			dateDue: dateDue ? chrono.parseDate(dateDue) : undefined,
			dateSeed: dateSeed ? chrono.parseDate(dateSeed) : undefined,
			frequency: frequency ? parseInt(frequency) : undefined,
			useTime: false,
			iconLibrary: iconFamily,
			checkboxStyle,
			iconName,
			dateModified: new Date().newDate,
		};

		if (checklistMode == 1)
			task.checklist = checklistContent.map((item, index) => {
				return {
					text: item,
					state: 0,
					index,
				};
			});

		if (action == 'new') {
			task.uniqid = uuid.v4();
			task.assigned = false;
			task.status = 0;
			task.dateCreated = new Date();
		} else {
			task.uniqid = taskId;
		}

		if (action == 'new') {
			setRamProperty('navigationTab', 1);
			newTask(task);
		} else if (action == 'edit' || action == 'expand') {
			updateTask(task);
		}
		navigation.goBack();
	};

	const handleChecklistOnChange = (text, index) => {
		if (index < checklistContent.length) {
			const newList = [...checklistContent];
			newList[index] = text;
			setChecklistContent(newList);
		}
	};

	const handleChecklistOnAdd = () => {
		const newList = [...checklistContent];
		newList.push('');
		setChecklistContent(newList);
	};

	const handleChecklistOnDelete = index => {
		if (index < checklistContent.length) {
			const newList = [...checklistContent];
			newList.splice(index, 1);
			setChecklistContent(newList);
		}
	};

	const handleIconPickerOnChange = (family, name) => {
		setIconFamily(family);
		setIconName(name);
	};

	const handleFrequencyChange = newFrequency => {
		if (newFrequency < 1 && newFrequency != '') setFrequency('1');
		else setFrequency(newFrequency + '');
	};

	return (
		<View style={{ flexDirection: 'column', height: '100%' }}>
			<View
				style={[
					{ backgroundColor: styles.colors.teal5 },
					styles.alignedRow,
					styles.padding4,
				]}>
				<StyledButton
					onPress={() => {}}
					styling='subtle'
					iconFamily='MaterialCommunityIcons'
					iconName='arrow-left'
				/>
				<StyledText style={styles.editScreenHeaderText}>
					{action == 'new' ? 'NEW TASK' : 'EDIT TASK'}
				</StyledText>
				<View style={styles.flex1} />
				<StyledButton
					onPress={onSave}
					styling='horizontal'
					label='SAVE'
					iconFamily='MaterialCommunityIcons'
					iconName='check'
				/>
			</View>
			<ScrollView style={{ flex: 1 }}>
				<SelectionList
					styles={styles}
					label={'TASK TYPE'}
					labelIconFamily={'MaterialCommunityIcons'}
					labelIconName={'animation'}
					selection={taskType}
					onPress={setTaskType}
					orientation={'column'}
					iconStyle={1}
					useSubtext={true}
					selections={[
						{
							index: 0,
							stateValue: 'draft',
							iconFamily: 'Entypo',
							iconName: 'pencil',
							iconSize: 32,
							text: 'Draft',
							subtext:
								'A quick note of a task, to be expanded on later',
							activeColor: 'blue',
							hide: action == 'expand',
						},
						{
							index: 1,
							stateValue: 'flexible',
							iconFamily: 'FontAwesome',
							iconName: 'arrows',
							iconSize: 32,
							text: 'Flexible',
							subtext: 'A task that needs to be done eventually',
							activeColor: 'blue',
						},
						{
							index: 2,
							stateValue: 'deadline',
							iconFamily: 'FontAwesome',
							iconName: 'dot-circle-o',
							iconSize: 32,
							text: 'Deadline',
							subtext:
								'A task that needs to be done by a certain date',
							activeColor: 'blue',
						},
						{
							index: 3,
							stateValue: 'scheduled',
							iconFamily: 'AntDesign',
							iconName: 'pushpin',
							iconSize: 32,
							text: 'Scheduled',
							subtext:
								'A task that needs to be done on a certain date',
							activeColor: 'blue',
						},
						{
							index: 4,
							stateValue: 'repeating',
							iconFamily: 'FontAwesome',
							iconName: 'refresh',
							iconSize: 32,
							text: 'Repeating',
							subtext: 'A task that needs to be done regularly',
							activeColor: 'blue',
						},
					]}></SelectionList>
				<EditField
					styles={styles}
					text={title}
					labelIconFamily={'MaterialCommunityIcons'}
					labelIconName={'card-text'}
					onChange={setTitle}
					label={'TASK TITLE'}
					required={true}
					helpTips={[
						`Required.`,
						`Describe the primary action to be done for a task.`,
						`Start with a verb, i.e. "Do the dishes".`,
						`Keep it short and succinct.`,
					]}></EditField>
				{taskType != 'draft' && (
					<View>
						<EditField
							styles={styles}
							text={description}
							labelIconFamily={'MaterialCommunityIcons'}
							labelIconName={'text-box'}
							onChange={setDescription}
							label={'DETAILS'}
							multiline={true}
							subtext={`Additional information to help complete the task.`}
							helpTips={[
								`Optional.`,
								`Add additional information need to complete the task.\nI.e. an address, phone number, or set of instructions.`,
							]}></EditField>
						<IconPicker
							label={'TASK ICON'}
							family={iconFamily}
							name={iconName}
							labelIconFamily={'MaterialIcons'}
							labelIconName={'image'}
							onChange={handleIconPickerOnChange}
							taskTitle={title}
						/>
						<SelectionList
							styles={styles}
							label={'CHECKLIST'}
							labelIconFamily={'MaterialCommunityIcons'}
							labelIconName={'view-list-outline'}
							selection={checklistMode}
							onPress={setChecklistMode}
							orientation={'row'}
							columns={2}
							iconStyle={1}
							selections={[
								{
									index: 0,
									stateValue: 0,
									iconFamily: 'MaterialIcons',
									iconName: 'not-interested',
									iconSize: 24,
									text: 'No Checklist',
									subtext: '',
									activeColor: 'gray',
								},
								{
									index: 1,
									stateValue: 1,
									iconFamily: 'MaterialIcons',
									iconName: 'check',
									iconSize: 24,
									text: 'Attach Checklist ',
									subtext:
										'A set of subtasks to be done in any order',
									activeColor: 'blue',
								},
							]}></SelectionList>
						{checklistMode != 0 && (
							<EditFieldArray
								styles={styles}
								label={'CHECKLIST ITEMS'}
								content={checklistContent}
								onChange={handleChecklistOnChange}
								onAdd={handleChecklistOnAdd}
								onDelete={handleChecklistOnDelete}
								helpTips={[]}></EditFieldArray>
						)}
						<SelectionList
							styles={styles}
							label={'PRIORITY'}
							labelIconFamily={'MaterialCommunityIcons'}
							labelIconName={'alert-box'}
							selection={taskPriority}
							onPress={setTaskPriority}
							orientation={'row'}
							columns={3}
							iconStyle={0}
							selections={[
								{
									index: 0,
									stateValue: 0,
									iconFamily: 'Entypo',
									iconName: 'dot-single',
									iconSize: 20,
									text: 'Low',
									activeColor: 'blue',
								},
								{
									index: 1,
									stateValue: 1,
									iconFamily: 'Entypo',
									iconName: 'minus',
									iconSize: 20,
									text: 'Med',
									activeColor: 'blue',
								},
								{
									index: 2,
									stateValue: 2,
									iconFamily: 'Feather',
									iconName: 'alert-circle',
									iconSize: 20,
									text: 'High',
									activeColor: 'blue',
								},
							]}></SelectionList>
						<SelectionList
							styles={styles}
							label={'TASK DURATION'}
							labelIconFamily={'MaterialCommunityIcons'}
							labelIconName={'clock-time-four'}
							selection={taskDuration}
							onPress={setTaskDuration}
							orientation={'row'}
							columns={6}
							wrap={true}
							iconStyle={0}
							selections={[
								{
									index: 0,
									stateValue: 5,
									text: '5m',
									activeColor: 'blue',
								},
								{
									index: 1,
									stateValue: 10,
									text: '10m',
									activeColor: 'blue',
								},
								{
									index: 2,
									stateValue: 15,
									text: '15m',
									activeColor: 'blue',
								},
								{
									index: 3,
									stateValue: 30,
									text: '30m',
									activeColor: 'blue',
								},
								{
									index: 4,
									stateValue: 45,
									text: '45m',
									activeColor: 'blue',
								},
								{
									index: 5,
									stateValue: 60,
									text: '60m',
									activeColor: 'blue',
								},
							]}></SelectionList>
						{(taskType == 'scheduled' ||
							taskType == 'deadline') && (
							<EditField
								styles={styles}
								text={dateDue}
								onChange={setDateDue}
								label={'DATE DUE'}
								multiline={false}
								helpTips={[]}></EditField>
						)}
						{taskType == 'repeating' && (
							<EditField
								styles={styles}
								text={frequency}
								onChange={freq => handleFrequencyChange(freq)}
								label={'REPEAT FREQUENCY'}
								multiline={false}
								number={true}
								helpTips={[]}></EditField>
						)}

						{taskType == 'repeating' && (
							<EditField
								styles={styles}
								text={dateSeed}
								onChange={setDateSeed}
								label={'SEED DATE'}
								multiline={false}
								helpTips={[]}></EditField>
						)}

						<SelectionList
							styles={styles}
							label={'Task Scale'}
							labelIconFamily={'MaterialCommunityIcons'}
							labelIconName={'arrow-expand-horizontal'}
							selection={checkboxStyle}
							onPress={setCheckboxStyle}
							orientation={'column'}
							columns={2}
							iconStyle={1}
							useSubtext={true}
							selections={[
								{
									index: 0,
									stateValue: 0,
									iconFamily: 'MaterialCommunityIcons',
									iconName: 'circle-medium',
									iconSize: 35,
									text: 'Normal',
									subtext:
										'Task can be completed in one day.',
									selectedStyle: styles.blueHighlight,
									deselectedStyle: styles.hiddenHighlight,
									activeColor: 'blue',
								},
								{
									index: 1,
									stateValue: 1,
									iconFamily: 'MaterialCommunityIcons',
									iconName: 'dots-horizontal',
									iconSize: 35,
									text: 'Extended',
									subtext: `Task will take multiple days to complete. Task will persist until you click 'Mark Complete'.`,
									selectedStyle: styles.blueHighlight,
									deselectedStyle: styles.hiddenHighlight,
									activeColor: 'blue',
								},
							]}></SelectionList>
					</View>
				)}
			</ScrollView>
		</View>
	);
}

// <DateTimeComponent styles={styles} dataKey={'due'} label={'DUE DATE / TIME'} onChange={handleInput}/>

const myStyle = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
	},
});
