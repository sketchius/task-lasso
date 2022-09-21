import React, {useState,useEffect} from 'react';
import { Button, StyleSheet, ScrollView, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { Logs } from 'expo'

import { DateTimeComponent, EditField, SelectionList } from './../../components/Form';

import { styles } from './../../styles/styles';

Logs.enableExpoCliLogging()

export default function TaskEditor({ route, navigation }) {

    const [action,setAction] = useState('new');
    const [mode,setMode] = useState('note');
    
    const [taskType,setTaskType] = useState('flexible');
    const [taskPriority,setTaskPriority] = useState('med');
    const [taskDuration,setTaskDuration] = useState(15);

    const isFocused = useIsFocused()

    useEffect(() => {
            setMode(route.params.mode);
    } , [isFocused])

    const form = {};

    const handleInput = ( parameter, value ) => {
        form[parameter] = value;
    }

    const reportData = () => {
        alert(JSON.stringify(form))
        sendNewTask();
    }

    const sendNewTask = () => {

        const newTask = {
            title: form.title,
            description: form.desc,
            uniqid: uuid.v4(),
            prority: form.priority,
            dateDue: form.due,
            useTime: false,
            assigned: false,
            iconLibrary: 'Ionicons',
            iconName: 'people'
        }

        switch (form.type) {
            case 0:
                newTask.type = 'FLEXIBLE'
                break;
            case 1:
                newTask.type = 'SCHEDULED'
                break;
            case 2:
                newTask.type = 'DEADLINE'
                break;
            case 3:
                newTask.type = 'REPEATING'
                break;
            
        }

        switch (form.duration) {
            case 0:
                newTask.duration = 5;
                break;
            case 1:
                newTask.duration = 10;
                break;
            case 2:
                newTask.duration = 15;
                break;
            case 3:
                newTask.duration = 30;
                break;
            case 4:
                newTask.duration = 45;
                break;
            case 5:
                newTask.duration = 60;
                break;
        }

        props.onSave(newTask)
    }


    return (
        <View>
            <SelectionList styles={styles} data={'mode'} label={'NEW TASK'} selection={mode} onPress={setMode} orientation={'row'}  columns={2} iconStyle={1} useSubtext={true}
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
            <ScrollView style = {styles.fill}>
                <EditField styles={styles} data={'title'} label={mode == 'NOTE' ? 'NOTE' : 'TASK BREIF'} onChange={handleInput}
                    helpTips = {[
                        `Required.`,
                        `Describe the primary action to be done for a task.`,
                        `Start with a verb, i.e. "Do the dishes".`,
                        `Keep it short and succinct.`
                    ]}
                ></EditField>
                {mode=='task' && <View>
                    <EditField styles={styles} data={'desc'} label={'DESCRIPTION'} multiline={true} onChange={handleInput}
                        helpTips = {[
                            `Optional.`,
                            `Add additional information need to complete the task.\nI.e. an address, phone number, or set of instructions.`
                        ]}
                    ></EditField>
                    <SelectionList styles={styles} data={'type'} label={'TASK TYPE'} selection={taskType} onPress={setTaskType} orientation={'column'} onChange={handleInput} iconStyle={1} useSubtext={true}
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
                    <SelectionList styles={styles} data={'priority'} label={'PRIORITY'} selection={taskPriority} onPress={setTaskPriority} orientation={'row'} columns={3} onChange={handleInput} iconStyle={0}
                    selections={[
                        {
                            index: 0,
                            stateValue: 'low',
                            iconFamily: 'Entypo',
                            iconName: 'dot-single',
                            iconSize: 20,
                            text: 'Low',
                            selectedStyle: styles.blueHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 1,
                            stateValue: 'med',
                            iconFamily: 'Entypo',
                            iconName: 'minus',
                            iconSize: 20,
                            text: 'Med',
                            selectedStyle: styles.yellowHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 2,
                            stateValue: 'high',
                            iconFamily: 'Feather',
                            iconName: 'alert-circle',
                            iconSize: 20,
                            text: 'High',
                            selectedStyle: styles.redHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        }
                    ]}></SelectionList>
                    <SelectionList styles={styles} data={'duration'} label={'TASK DURATION'}  selection={taskDuration} onPress={setTaskDuration}  orientation={'row'} columns={3} wrap={true} onChange={handleInput} iconStyle={0}
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
                    <DateTimeComponent styles={styles} dataKey={'due'} label={'DUE DATE / TIME'} onChange={handleInput}/>
                </View>}
            
                <Button title='Save' onPress={reportData}/>
            </ScrollView>
        </View>
    )

}

const myStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
})