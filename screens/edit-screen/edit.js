import React, {useState,useEffect} from 'react';
import { Button, StyleSheet, ScrollView, DeviceEventEmitter, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import uuid from 'react-native-uuid';

import { Logs } from 'expo'

import * as chrono from 'chrono-node';

import formatDistance from 'date-fns/formatDistance'
import formatRelative from 'date-fns/formatRelative'

import { DateTimeComponent, EditField, EditFieldArray, SelectionList } from './../../components/Form';
import { getTaskByUniqid } from './../../tools/tools';

import { styles } from './../../styles/styles';
import getIcon from '../../tools/Icons';

Logs.enableExpoCliLogging()

export default function TaskEditor({ route, navigation }) {
    
    const tasks = useSelector(state => state.tasks);

    const [action,setAction] = useState('new');
    
    const [taskType,setTaskType] = useState('flexible');
    const [title,setTitle] = useState('');
    const [checklistMode,setChecklistMode] = useState(0);
    const [checklistContent,setChecklistContent] = useState(['Take out the trash','Do the dishes']);
    const [description,setDescription] = useState('');
    const [taskId,setTaskId] = useState('');
    const [taskPriority,setTaskPriority] = useState(1);
    const [taskDuration,setTaskDuration] = useState(15);
    const [iconFamily,setIconFamily] = useState('');
    const [iconName,setIconName] = useState('');
    const [dateDue,setDateDue] = useState('');
    const [checkboxStyle,setCheckboxStyle] = useState(0);

    const isFocused = useIsFocused()

    useEffect(() => {
        setAction(route.params.action);
        if (action == 'edit' || action == 'expand' && route.params.uniqid) {

            const task = getTaskByUniqid(tasks, route.params.uniqid);
            if (task) {
                setTitle(task.title);
                setDescription(task.description);
                setTaskId(task.uniqid);
                if (action == 'expand')
                    setTaskType('FLEXIBLE')
                else
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
        let newTask = {
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
        }

        if (checklistMode == 1)
            newTask.checklist = checklistContent.map( (item, index) => {
                return {
                    text: item,
                    state: 0,
                    index
                }
            });

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

    const handleChecklistOnChange = (text,index) => {
        if (index < checklistContent.length) {
            const newList = [...checklistContent]
            newList[index] = text;
            setChecklistContent(newList);
        }
    }

    const handleChecklistOnAdd = () => {
        const newList = [...checklistContent]
        newList.push('');
        setChecklistContent(newList);
    }

    const handleChecklistOnDelete = (index) => {
        if (index < checklistContent.length) {
            const newList = [...checklistContent]
            newList.splice(index,1);
            setChecklistContent(newList);
        }
    }




    return (
        <View style={{flexDirection: 'column', height: '100%'}}>
            <ScrollView style = {{flex: 1}}>
            <SelectionList styles={styles} label={'TASK TYPE'} selection={taskType} onPress={setTaskType} orientation={'column'} iconStyle={1} useSubtext={true}
                    selections={[
                        {
                            index: 0,
                            stateValue: 'draft',
                            iconFamily: 'Entypo',
                            iconName: 'pencil',
                            iconSize: 32,
                            text: 'Draft',
                            subtext: "A quick note of a task, to be expanded on later",
                            activeColor: 'teal',
                            hide: action == 'expand'
                        },
                        {
                            index: 1,
                            stateValue: 'flexible',
                            iconFamily: 'FontAwesome',
                            iconName: 'arrows',
                            iconSize: 32,
                            text: 'Flexible',
                            subtext: "A task that needs to be done eventually",
                            activeColor:  'teal'
                        },
                        {
                            index: 2,
                            stateValue: 'deadline',
                            iconFamily: 'FontAwesome',
                            iconName: 'dot-circle-o',
                            iconSize: 32,
                            text: 'Deadline',
                            subtext: "A task that needs to be done by a certain date",
                            activeColor: 'teal'
                        },
                        {
                            index: 3,
                            stateValue: 'scheduled',
                            iconFamily: 'AntDesign',
                            iconName: 'pushpin',
                            iconSize: 32,
                            text: 'Scheduled',
                            subtext: "A task that needs to be done on a certain date",
                            activeColor: 'teal'
                        },
                        {
                            index: 4,
                            stateValue: 'refresh',
                            iconFamily: 'FontAwesome',
                            iconName: 'refresh',
                            iconSize: 32,
                            text: 'Repeating',
                            subtext: "A task that needs to be done regularly",
                            activeColor: 'teal'
                        }
                    ]}></SelectionList>
                <EditField styles={styles} text={title}  onChange={setTitle}  label={'TASK TITLE'}
                    required = {true}
                    helpTips = {[
                        `Required.`,
                        `Describe the primary action to be done for a task.`,
                        `Start with a verb, i.e. "Do the dishes".`,
                        `Keep it short and succinct.`
                    ]}
                ></EditField>
                {taskType != 'draft' && <View>
                    <EditField styles={styles} text={description}  onChange={setDescription} label={'DETAILS'} multiline={true}
                        subtext = {`Additional information to help complete the task.`}
                        helpTips = {[
                            `Optional.`,
                            `Add additional information need to complete the task.\nI.e. an address, phone number, or set of instructions.`
                        ]}
                    ></EditField>
                    <SelectionList styles={styles} label={'CHECKLIST'} selection={checklistMode} onPress={setChecklistMode} orientation={'row'} columns={2} iconStyle={1}
                    selections={[
                        {
                            index: 0,
                            stateValue: 0,
                            iconFamily: 'MaterialIcons',
                            iconName: 'not-interested',
                            iconSize: 24,
                            text: 'No Checklist',
                            subtext: "",
                            activeColor: 'gray'
                        },
                        {
                            index: 1,
                            stateValue: 1,
                            iconFamily: 'FontAwesome',
                            iconName: 'list-ul',
                            iconSize: 24,
                            text: 'Attach Checklist ',
                            subtext: "A set of subtasks to be done in any order",
                            activeColor: 'teal'
                        }
                    ]}></SelectionList>
                    {checklistMode != 0 && <EditFieldArray styles={styles} label={'CHECKLIST ITEMS'} content={checklistContent}
                        onChange={handleChecklistOnChange}
                        onAdd={handleChecklistOnAdd}
                        onDelete={handleChecklistOnDelete}
                        helpTips = {[]}
                    ></EditFieldArray>}
                    <SelectionList styles={styles} label={'PRIORITY'} selection={taskPriority} onPress={setTaskPriority} orientation={'row'} columns={3} iconStyle={0}
                    selections={[
                        {
                            index: 0,
                            stateValue: 0,
                            iconFamily: 'Entypo',
                            iconName: 'dot-single',
                            iconSize: 20,
                            text: 'Low',
                            activeColor: 'teal'
                        },
                        {
                            index: 1,
                            stateValue: 1,
                            iconFamily: 'Entypo',
                            iconName: 'minus',
                            iconSize: 20,
                            text: 'Med',
                            activeColor: 'teal'
                        },
                        {
                            index: 2,
                            stateValue: 2,
                            iconFamily: 'Feather',
                            iconName: 'alert-circle',
                            iconSize: 20,
                            text: 'High',
                            activeColor: 'teal'
                        }
                    ]}></SelectionList>
                    <SelectionList styles={styles} label={'TASK DURATION'}  selection={taskDuration} onPress={setTaskDuration}  orientation={'row'} columns={6} wrap={true} iconStyle={0}
                    selections={[
                        {
                            index: 0,
                            stateValue: 5,
                            text: '5m',
                            activeColor: 'teal'
                        },
                        {
                            index: 1,
                            stateValue: 10,
                            text: '10m',
                            activeColor: 'teal'
                        },
                        {
                            index: 2,
                            stateValue: 15,
                            text: '15m',
                            activeColor: 'teal'
                        },
                        {
                            index: 3,
                            stateValue: 30,
                            text: '30m',
                            activeColor: 'teal'
                        },
                        {
                            index: 4,
                            stateValue: 45,
                            text: '45m',
                            activeColor: 'teal'
                        },
                        {
                            index: 5,
                            stateValue: 60,
                            text: '60m',
                            activeColor: 'teal'
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
                            deselectedStyle: styles.hiddenHighlight,
                            activeColor: 'teal'
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
                            deselectedStyle: styles.hiddenHighlight,
                            activeColor: 'teal'
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