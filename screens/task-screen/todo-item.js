import React, { useState, useEffect } from 'react';
import { View, Pressable, DeviceEventEmitter, LayoutAnimation } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { isToday } from 'date-fns';
import { formatRelative } from '../../tools/date';
import differenceInHours from 'date-fns/differenceInHours';

import {
	AntDesign,
	FontAwesome5,
	FontAwesome,
	MaterialIcons,
	Octicons,
	Entypo,
	Feather,
	Ionicons,
} from '@expo/vector-icons';

import { getDateInContext, getTime } from '../../tools/DateContext';
import getIcon from '../../tools/Icons';
import MultistateCheckbox from '../../components/MultistateCheckbox';
import StyledText from '../../components/StyledText';
import StyledButton from '../../components/StyledButton';
import { completeTask, deleteTask, setTaskProperty } from '../../redux/data';
import { saveTask } from '../../network/network';

export default function TodoItem(props) {
	const [expanded, setExpanded] = useState(false);

	const [didMount, setDidMount] = useState(false);

	useEffect(() => {
		setDidMount(true);
	}, []);

	useEffect(() => {
		if (didMount) LayoutAnimation.easeInEaseOut();
	}, [expanded]);

	const task = props.task;

	const styles = props.styles;

	const navigation = useNavigation();

	const [checkboxState, updateCheckboxState] = useState(task.status || 0);

	const [checklistCheckboxState, updateChecklistCheckboxState] = useState(
		task.checklist ? task.checklist.map(item => item.state) : []
	);

	const [buttonMode, setButtonMode] = useState('normal');

	const handleCheckboxStateChange = () => {
		let newState;
		switch (task.checkboxStyle) {
			default:
			case 0:
				if (checkboxState == 0) newState = 1;
				else newState = 0;
				break;
			case 1:
				if (checkboxState == 0) newState = 0.5;
				else newState = 0;
				break;
		}

		updateCheckboxState(newState);
		setTaskProperty(task, 'status', newState);
	};

	const handleChecklistCheckboxStateChange = index => {
		if (checklistCheckboxState.length > index) {
			const newState = [...checklistCheckboxState];
			newState[index] = 1 - newState[index];
			updateChecklistCheckboxState(newState);
		}

		// updateCheckboxState(newState);
		// DeviceEventEmitter.emit("event.taskEvent", {event:'setStatus', newState, uniqid: task.uniqid});
	};

	let expandedContent;

	const getChecklistContent = () => {
		return task.checklist.map((checklistItem, index) => {
			return (
				<View key={index} style={styles.alignedRow}>
					<MultistateCheckbox
						state={checklistCheckboxState[checklistItem.index]}
						onStateChange={handleChecklistCheckboxStateChange}
						style={[styles.padding2, styles.marginTop3, styles.paddingHorizontal4]}
						checkboxStyle={styles.checkboxBoxSmall}
						index={checklistItem.index}
						size={16}
						iconColor={styles.colors.teal}
						label={checklistItem.text}
						labelStyle={styles.checklistLabel}
					/>
				</View>
			);
		});
	};

	const getPriorityElement = () => {
		switch (task.priority) {
			case 0:
				return <View style={styles.lowPriority}></View>;
			case 1:
				return <View style={styles.medPriority}></View>;
			case 2:
				return <View style={styles.hiPriority}></View>;
		}
	};

	const getTaskButtons = () => {
		let buttonConfigType = `${props.tasklist ? 'tasklist/' : 'todo/'}${task.type}`;
		const buttons = [];
		if (buttonMode == 'delete') {
			buttonConfigType = 'special/DELETE';
		}
		switch (buttonConfigType) {
			case 'todo/DRAFT':
				break;
			case 'tasklist/DRAFT':
				buttons.push(getButtonOfType(buttons.length, 'delete'));
				buttons.push(getButtonOfType(buttons.length, 'expand'));
				break;
			case 'todo/FLEXIBLE':
				if (task.checkboxStyle == 0) buttons.push(getButtonOfType(buttons.length, 'edit'));
				else buttons.push(getButtonOfType(buttons.length, 'mark complete'));
				buttons.push(getButtonOfType(buttons.length, 'schedule'));
				buttons.push(getButtonOfType(buttons.length, 'defer'));
				break;
			case 'tasklist/FLEXIBLE':
				buttons.push(getButtonOfType(buttons.length, 'delete'));
				buttons.push(getButtonOfType(buttons.length, 'edit'));
				buttons.push(getButtonOfType(buttons.length, 'schedule'));
				break;
			case 'todo/DEADLINE':
				if (task.checkboxStyle == 1) buttons.push(getButtonOfType(buttons.length, 'mark complete'));
				buttons.push(getButtonOfType(buttons.length, 'edit'));
				if (isToday(task.dateDue)) buttons.push(getButtonOfType(buttons.length, 'extend'));
				else buttons.push(getButtonOfType(buttons.length, 'defer'));
				break;
			case 'tasklist/DEADLINE':
				buttons.push(getButtonOfType(buttons.length, 'delete'));
				buttons.push(getButtonOfType(buttons.length, 'edit'));
				buttons.push(getButtonOfType(buttons.length, 'extend'));
				break;
			case 'todo/SCHEDULED':
				buttons.push(getButtonOfType(buttons.length, 'edit'));
				buttons.push(getButtonOfType(buttons.length, 'reschedule'));
				break;
			case 'tasklist/SCHEDULED':
				buttons.push(getButtonOfType(buttons.length, 'delete'));
				buttons.push(getButtonOfType(buttons.length, 'edit'));
				buttons.push(getButtonOfType(buttons.length, 'reschedule'));
				break;
			case 'todo/REPEATING':
				buttons.push(getButtonOfType(buttons.length, 'edit'));
				buttons.push(getButtonOfType(buttons.length, 'defer'));
				break;
			case 'tasklist/REPEATING':
				buttons.push(getButtonOfType(buttons.length, 'delete'));
				buttons.push(getButtonOfType(buttons.length, 'edit'));
				break;
			case 'special/DELETE':
				buttons.push(getButtonOfType(buttons.length, 'cancel'));
				buttons.push(getButtonOfType(buttons.length, 'delete-confirm'));
				break;
		}
		return buttons;
	};

	const getButtonOfType = (index, buttonType) => {
		switch (buttonType) {
			case 'edit':
				return (
					<StyledButton
						key={index}
						onPress={() => {
							navigation.navigate('Editor', {
								action: 'edit',
								uniqid: task.uniqid,
							});
						}}
						data='edit'
						label='Edit'
						iconFamily='Feather'
						iconName='edit'
					/>
				);
			case 'delete':
				return (
					<StyledButton
						key={index}
						onPress={() => {
							setButtonMode('delete');
						}}
						label='Delete'
						iconFamily='FontAwesome'
						iconName='times'
					/>
				);
			case 'defer':
				return (
					<StyledButton
						key={index}
						onPress={() => {
							if (task.status == 2) {
								updateCheckboxState(0);
								setTaskProperty(task, 'status', 0);
							} else {
								updateCheckboxState(2);
								setTaskProperty(task, 'status', 2);
							}
						}}
						label={task.status == 2 ? 'Undefer' : 'Defer'}
						iconFamily='AntDesign'
						iconName='arrowright'
					/>
				);
			case 'schedule':
				return <StyledButton key={index} label='Schedule' iconFamily='Feather' iconName='calendar' />;
			case 'reschedule':
				return <StyledButton key={index} label='Reschedule' iconFamily='Feather' iconName='calendar' />;
			case 'extend':
				return <StyledButton key={index} label='Extend' iconFamily='Ionicons' iconName='play-skip-forward' />;
			case 'mark complete':
				return (
					<StyledButton
						key={index}
						onPress={() => {
							updateCheckboxState(1);
							setTaskProperty(task, 'status', 1);
						}}
						label={'Mark Complete'}
						iconFamily='MaterialCommunityIcons'
						iconName='check-bold'
					/>
				);
			case 'expand':
				return (
					<StyledButton
						key={index}
						onPress={() => {
							navigation.navigate('Editor', {
								action: 'expand',
								uniqid: task.uniqid,
							});
						}}
						label='Expand'
						iconFamily='MaterialCommunityIcons'
						iconName='arrow-expand-all'
					/>
				);
			case 'cancel':
				return (
					<StyledButton
						key={index}
						onPress={() => {
							setButtonMode('normal');
						}}
						label='Cancel'
						iconFamily='Ionicons'
						iconName='arrow-back'
					/>
				);
			case 'delete-confirm':
				return (
					<StyledButton
						key={index}
						onPress={() => {
							deleteTask(task);
						}}
						label='Delete'
						iconFamily='FontAwesome'
						iconName='times'
						styling={'critical'}
					/>
				);
		}
	};

	if (expanded) {
		expandedContent = (
			<View>
				{task.description && (
					<View style={[styles.marginBottom4]}>
						<View
							style={[
								styles.marginRight4,
								styles.marginTop2,
								styles.alignedRow,
								{ alignSelf: 'flex-start', width: 60 },
							]}>
							{getIcon('MaterialCommunityIcons', 'card-text-outline', 12, styles.colors.teal)}
							<StyledText style={[styles.taskTypeText, styles.teal2Text]}>DETAILS</StyledText>
						</View>
						<StyledText
							style={[
								styles.fontSize1,
								styles.tealText,
								styles.flex1,
								styles.marginRight3,
								{
									borderLeftWidth: 1,
									borderLeftColor: styles.colors.teal2,
									paddingLeft: 8,
								},
							]}
							numberOfLines={expanded ? 4 : 1}>
							{task.description}
						</StyledText>
					</View>
				)}
				{task.checklist && (
					<View style={[styles.marginBottom4]}>
						<View
							style={[
								styles.marginRight4,
								styles.marginBottom2,
								styles.alignedRow,
								{ alignSelf: 'flex-start', width: 60 },
							]}>
							{getIcon('FontAwesome', 'list-ul', 12, styles.colors.teal)}
							<StyledText style={[styles.taskTypeText, styles.teal2Text]}>CHECKLIST</StyledText>
						</View>
						<View
							style={{
								borderLeftWidth: 1,
								borderLeftColor: styles.colors.teal2,
								paddingLeft: 8,
							}}>
							{getChecklistContent()}
						</View>
					</View>
				)}
				<View style={[styles.alignedRow, styles.marginVertical3]}>{getTaskButtons()}</View>
			</View>
		);
	}

	const taskTypeContent = (() => {
		switch (task.type) {
			case 'FLEXIBLE':
				return expanded ? (
					<View style={[styles.taskTypeElement]}>
						{getIcon('FontAwesome', 'arrows', 12, styles.colors.teal)}
						<StyledText style={[styles.taskTypeText, styles.teal2Text]}>FLEXIBLE TASK</StyledText>
					</View>
				) : undefined;
			case 'DEADLINE':
				const today = isToday(task.dateDue);
				return (
					<View style={[styles.taskTypeElement, today && styles.yellowAlert]}>
						{getIcon('FontAwesome', 'dot-circle-o', 12, today ? styles.colors.yellow : styles.colors.teal)}
						<StyledText style={[styles.taskTypeText, today ? styles.yellow2Text : styles.teal2Text]}>
							{expanded ? 'DEADLINE: ' : ''}DUE BY {formatRelative(task.dateDue, false).toUpperCase()}
						</StyledText>
					</View>
				);
			case 'SCHEDULED':
				const scheduledTime = getTime(task.dateDue);
				const hoursAway = differenceInHours(task.dateDue, new Date());
				return (
					<View
						style={[styles.taskTypeElement, hoursAway < 3 ? styles.redHighlight : styles.yellowHighlight]}>
						{getIcon('Octicons', 'clock', 12, styles.colors.gray2)}
						<StyledText style={styles.taskTypeText}>
							SCHEDULED {formatRelative(task.dateDue, new Date()).toUpperCase()}
						</StyledText>
					</View>
				);
			case 'REPEATING':
				if (expanded) {
					return (
						<View style={[styles.taskTypeElement]}>
							{getIcon('FontAwesome', 'refresh', 12, styles.colors.gray2)}
							<StyledText style={styles.taskTypeText}>REPEATING TASK</StyledText>
						</View>
					);
				} else return undefined;
		}
	})();

	const hideBottomContent = !task.description && !task.tasklist && !taskTypeContent && !expanded;

	return (
		<View style={[styles.row, styles.whiteBackground, styles.taskBorder]}>
			{!props.tasklist ? (
				<MultistateCheckbox
					state={checkboxState}
					onStateChange={handleCheckboxStateChange}
					style={[styles.padding2, styles.marginTop3, styles.paddingHorizontal4]}
					checkboxStyle={styles.checkboxBox}
					size={20}></MultistateCheckbox>
			) : (
				<View style={styles.compactTaskElement}></View>
			)}
			<View style={[styles.flex100, styles.leftBorder]}>
				<View>
					<Pressable
						style={[styles.alignedRow, styles.paddingLeft2, !props.tasklist && styles.marginVertical2]}
						onPress={() => setExpanded(!expanded)}>
						<View style={props.tasklist ? styles.taskIconCompact : styles.taskIcon}>
							<StyledText style={props.tasklist ? styles.taskEmojiSmall : styles.taskEmoji}>
								{task.emoji}
							</StyledText>
						</View>
						{getPriorityElement()}
						<StyledText
							style={[
								styles.listItem,
								styles.fontSize2,
								styles.headerFont,
								styles.marginLeft3,
								styles.paddingLeft1,
							]}>
							{task.title}
						</StyledText>
					</Pressable>
					{!hideBottomContent && (!props.tasklist || expanded) && (
						<View
							style={[
								styles.paddingHorizontal4,
								{
									borderColor: styles.colors.teal3,
									borderTopWidth: styles.space.size0,
								},
							]}>
							{(!props.tasklist || expanded) && (
								<View style={[styles.alignedRow, styles.marginTop3]}>
									{task.prority === 2 && (
										<View style={[styles.marginRight4, styles.alignedRow, styles.orangeBackground]}>
											<FontAwesome5
												name='exclamation-circle'
												size={12}
												color='#999'
												style={styles.paddingRight2}
											/>
											<StyledText style={styles.alertText}>HIGH PRIORITY</StyledText>
										</View>
									)}
									{taskTypeContent}
									{task.description && !expanded && (
										<View style={[styles.taskTypeElement]}>
											{getIcon(
												'MaterialCommunityIcons',
												'card-text-outline',
												12,
												styles.colors.teal
											)}
											<StyledText style={[styles.taskTypeText, styles.teal2Text]}>
												DETAILS
											</StyledText>
										</View>
									)}
									{task.checklist && !expanded && (
										<View style={[styles.marginRight4, styles.alignedRow]}>
											{getIcon('FontAwesome', 'list-ul', 12, styles.colors.teal)}
											<StyledText style={[styles.taskTypeText, styles.teal2Text]}>
												CHECKLIST
											</StyledText>
										</View>
									)}
								</View>
							)}
							{expanded && expandedContent}
						</View>
					)}
				</View>
			</View>
		</View>
	);
}
