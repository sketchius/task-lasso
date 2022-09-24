import React, {useState,useEffect} from 'react';
import { Button, StyleSheet, ScrollView, DeviceEventEmitter, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import uuid from 'react-native-uuid';

import { Logs } from 'expo'

import * as chrono from 'chrono-node';

import formatDistance from 'date-fns/formatDistance'
import formatRelative from 'date-fns/formatRelative'

import { DateTimeComponent, EditField, SelectionList } from './../../components/Form';
import { getTaskByUniqid } from './../../tools/tools';

import { styles } from './../../styles/styles';
import getIcon from '../../tools/Icons';

Logs.enableExpoCliLogging()

export default function TaskEditor({ route, navigation }) {
    
    const tasks = useSelector(state => state.tasks);

    const [action,setAction] = useState('new');
    const [mode,setMode] = useState('note');
    
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [taskId,setTaskId] = useState('');
    const [taskType,setTaskType] = useState('flexible');
    const [taskPriority,setTaskPriority] = useState(1);
    const [taskDuration,setTaskDuration] = useState(15);
    const [iconFamily,setIconFamily] = useState('');
    const [iconName,setIconName] = useState('');
    const [dateDue,setDateDue] = useState('');
    const [checkboxStyle,setCheckboxStyle] = useState(0);

    const isFocused = useIsFocused()

    useEffect(() => {
        setMode(route.params.mode);
        setAction(route.params.action);
        if (route.params.action == 'edit' && route.params.uniqid) {

            const task = getTaskByUniqid(tasks, route.params.uniqid);
            if (task) {
                setTitle(task.title);
                setDescription(task.description);
                setTaskId(task.uniqid);
                setTaskType(task.type.toLowerCase());
                setTaskPriority(task.priority)
                setTaskDuration(task.duration)
                setIconFamily(task.iconLibrary)
                setIconName(task.iconName)
                if (task.dateDue)
                    setDateDue(formatRelative(task.dateDue, new Date()))
            }
        }
    } , [isFocused])

    const form = {};

    const handleInput = ( parameter, value ) => {
        form[parameter] = value;
    }

    const reportData = () => {
        alert(JSON.stringify(form))
        sendNewTask();
    }

    const testNewDateThing = () => {
    }

    const onSave = () => {
        let newTask;
        
        if (mode == 'task') {
            newTask = {
                title,
                description,
                type: taskType.toUpperCase(),
                priority: taskPriority,
                duration: taskDuration,
                dateDue: chrono.parseDate(dateDue),
                useTime: false,
                iconLibrary: iconFamily,
                checkboxStyle,
                iconName,
                dateModified: new Date()
        }} else {
            newTask = {
                title,
                type: 'NOTE',
                useTime: false,
                iconLibrary: 'MaterialCommunityIcons',
                iconName: 'note-outline',
                dateModified: new Date()
            }    
        }

        let event = 'updateTask';
        if (action == 'new') {
            newTask.uniqid = uuid.v4();
            newTask.assigned = false;
            newTask.status = 0;
            newTask.dateCreated = new Date();
            event = 'newTask';
        } else {
            newTask.uniqid = taskId;
        }
        
        DeviceEventEmitter.emit("event.taskEvent", {event, uniqid: newTask.uniqid, task: newTask});
        navigation.goBack();
        if (action == 'new')
            DeviceEventEmitter.emit("event.navigationEvent", {event: 'navigate', index: 1});
    }



    return (
        <View style={{flexDirection: 'column', height: '100%'}}>
            {action == 'new' && <View style={{height: 'auto'}}>
                <SelectionList styles={styles} label={'NEW TASK'} selection={mode} onPress={setMode} orientation={'row'}  columns={2} iconStyle={1} useSubtext={true}
                    selections={[
                        {
                            index: 0,
                            stateValue: 'note',
                            iconFamily: 'MaterialCommunityIcons',
                            iconName: 'note-outline',
                            iconSize: 35,
                            hideIconBorder: true,
                            text: 'Note',
                            subtext: "Quickly capture a thought. You can expand it into a task later.",
                            selectedStyle: styles.orangeHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 1,
                            stateValue: 'task',
                            iconFamily: 'MaterialCommunityIcons',
                            iconName: 'card-text-outline',
                            iconSize: 35,
                            hideIconBorder: true,
                            text: 'Full Task',
                            subtext: "Create a new task. Customize it with a variety of options.",
                            selectedStyle: styles.yellowHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        }
                    ]}></SelectionList>
            </View>}
            <ScrollView style = {{flex: 1}}>
                <EditField styles={styles} text={title}  onChange={setTitle}  label={mode == 'note' ? 'NOTE' : 'TASK TITLE'}
                    required = {true}
                    helpTips = {[
                        `Required.`,
                        `Describe the primary action to be done for a task.`,
                        `Start with a verb, i.e. "Do the dishes".`,
                        `Keep it short and succinct.`
                    ]}
                ></EditField>
                {mode=='task' && <View>
                    <EditField styles={styles} text={description}  onChange={setDescription} label={'DETAILS'} multiline={true}
                        subtext = {`Additional information to help complete the task.`}
                        helpTips = {[
                            `Optional.`,
                            `Add additional information need to complete the task.\nI.e. an address, phone number, or set of instructions.`
                        ]}
                    ></EditField>
                    <SelectionList styles={styles} label={'TASK TYPE'} selection={taskType} onPress={setTaskType} orientation={'column'} iconStyle={1} useSubtext={true}
                    selections={[
                        {
                            index: 0,
                            stateValue: 'flexible',
                            iconFamily: 'FontAwesome',
                            iconName: 'arrows',
                            iconSize: 35,
                            text: 'Flexible',
                            subtext: "Needs to be done eventually",
                            selectedStyle: styles.yellowHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 1,
                            stateValue: 'deadline',
                            iconFamily: 'FontAwesome',
                            iconName: 'dot-circle-o',
                            iconSize: 35,
                            text: 'Deadline',
                            subtext: "Needs to be done by a certain date",
                            selectedStyle: styles.greenHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 2,
                            stateValue: 'scheduled',
                            iconFamily: 'AntDesign',
                            iconName: 'pushpin',
                            iconSize: 35,
                            text: 'Scheduled',
                            subtext: "Needs to be done on a certain date",
                            selectedStyle: styles.tealHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 3,
                            stateValue: 'refresh',
                            iconFamily: 'FontAwesome',
                            iconName: 'refresh',
                            iconSize: 35,
                            text: 'Repeating',
                            subtext: "Needs to be done regularly",
                            selectedStyle: styles.blueHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        }
                    ]}></SelectionList>
                    <SelectionList styles={styles} label={'PRIORITY'} selection={taskPriority} onPress={setTaskPriority} orientation={'row'} columns={3} iconStyle={0}
                    selections={[
                        {
                            index: 0,
                            stateValue: 0,
                            iconFamily: 'Entypo',
                            iconName: 'dot-single',
                            iconSize: 20,
                            text: 'Low',
                            selectedStyle: styles.blueHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 1,
                            stateValue: 1,
                            iconFamily: 'Entypo',
                            iconName: 'minus',
                            iconSize: 20,
                            text: 'Med',
                            selectedStyle: styles.yellowHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 2,
                            stateValue: 2,
                            iconFamily: 'Feather',
                            iconName: 'alert-circle',
                            iconSize: 20,
                            text: 'High',
                            selectedStyle: styles.redHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        }
                    ]}></SelectionList>
                    <SelectionList styles={styles} label={'TASK DURATION'}  selection={taskDuration} onPress={setTaskDuration}  orientation={'row'} columns={6} wrap={true} iconStyle={0}
                    selections={[
                        {
                            index: 0,
                            stateValue: 5,
                            text: '5m',
                            selectedStyle: styles.blueHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 1,
                            stateValue: 10,
                            text: '10m',
                            selectedStyle: styles.blueHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 2,
                            stateValue: 15,
                            text: '15m',
                            selectedStyle: styles.blueHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 3,
                            stateValue: 30,
                            text: '30m',
                            selectedStyle: styles.blueHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 4,
                            stateValue: 45,
                            text: '45m',
                            selectedStyle: styles.blueHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 5,
                            stateValue: 60,
                            text: '60m',
                            selectedStyle: styles.blueHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        }
                    ]}></SelectionList>
                    {getIcon(iconFamily,iconName,36,styles.colors.gray)}
                    <EditField styles={styles} text={iconFamily}  onChange={setIconFamily} label={'ICON FAMILY'} multiline={true}
                        helpTips = {[

                        ]}
                    ></EditField>
                    <EditField styles={styles} text={iconName}  onChange={setIconName} label={'ICON NAME'} multiline={true}
                        helpTips = {[

                        ]}
                    ></EditField>                    
                    {(taskType == 'scheduled' || taskType == 'deadline') && <EditField styles={styles} text={dateDue}  onChange={setDateDue} label={'DATE DUE'} multiline={true}
                        helpTips = {[

                        ]}
                    ></EditField>}
                    
                    <SelectionList styles={styles} label={'CHECKBOX STYLE'} selection={checkboxStyle} onPress={setCheckboxStyle} orientation={'column'} columns={2}  iconStyle={1} useSubtext={true}
                    selections={[
                        {
                            index: 0,
                            stateValue: 0,
                            iconFamily: 'MaterialCommunityIcons',
                            iconName: 'numeric-2-box-outline',
                            iconSize: 35,
                            text: '2-State',
                            subtext: "Can marked undone or done.",
                            selectedStyle: styles.blueHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 1,
                            stateValue: 1,
                            iconFamily: 'MaterialCommunityIcons',
                            iconName: 'numeric-3-box-outline',
                            iconSize: 35,
                            text: '3-State',
                            subtext: "Can be undone, started, or done.",
                            selectedStyle: styles.blueHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        }
                    ]}></SelectionList>
                </View>}
            
                <Button title='Save' onPress={onSave}/>
            </ScrollView>
        </View>
    )

}

// <DateTimeComponent styles={styles} dataKey={'due'} label={'DUE DATE / TIME'} onChange={handleInput}/>

const myStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
})