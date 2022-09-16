import React, {useState} from 'react';
import { Button, StyleSheet, ScrollView } from 'react-native';
import uuid from 'react-native-uuid';

import { Logs } from 'expo'

import { DateTimeComponent, EditField, SelectionList } from './../../components/Form';

Logs.enableExpoCliLogging()

export default function TaskEditor(props) {

    const styles = props.styles;

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
        <ScrollView style = {styles.fill}>
            <EditField styles={styles} data={'title'} label={'TITLE'} onChange={handleInput}
                helpTips = {[
                    `Required.`,
                    `Describe the primary action to be done for a task.`,
                    `Start with a verb, i.e. "Do the dishes".`,
                    `Keep it short and succinct.`
                ]}
            ></EditField>
            <EditField styles={styles} data={'desc'} label={'DESCRIPTION'} multiline={true} onChange={handleInput}
                helpTips = {[
                    `Optional.`,
                    `Add additional information need to complete the task.\nI.e. an address, phone number, or set of instructions.`
                ]}
            ></EditField>
            <SelectionList styles={styles} data={'type'} label={'TASK TYPE'} defaultSelection={0} orientation={'column'} onChange={handleInput} iconStyle={1} useSubtext={true}
            selections={[
                {
                    index: 0,
                    iconFamily: 'FontAwesome',
                    iconName: 'arrows',
                    iconSize: 35,
                    text: 'Flexible',
                    subtext: "Needs to be done eventually"
                },
                {
                    index: 1,
                    iconFamily: 'AntDesign',
                    iconName: 'pushpin',
                    iconSize: 35,
                    text: 'Scheduled',
                    subtext: "Needs to be done on a certain date"
                },
                {
                    index: 2,
                    iconFamily: 'FontAwesome',
                    iconName: 'dot-circle-o',
                    iconSize: 35,
                    text: 'Deadline',
                    subtext: "Needs to be done by a certain date"
                },
                {
                    index: 3,
                    iconFamily: 'FontAwesome',
                    iconName: 'refresh',
                    iconSize: 35,
                    text: 'Repeating',
                    subtext: "Needs to be done regularly"
                }
            ]}></SelectionList>
            <SelectionList styles={styles} data={'priority'} label={'PRIORITY'} defaultSelection={0} orientation={'row'} onChange={handleInput} iconStyle={0}
            selections={[
                {
                    index: 0,
                    iconFamily: 'Entypo',
                    iconName: 'dot-single',
                    iconSize: 20,
                    text: 'Low'
                },
                {
                    index: 1,
                    iconFamily: 'Entypo',
                    iconName: 'minus',
                    iconSize: 20,
                    text: 'Med'
                },
                {
                    index: 2,
                    iconFamily: 'Feather',
                    iconName: 'alert-circle',
                    iconSize: 20,
                    text: 'High'
                }
            ]}></SelectionList>
            <SelectionList styles={styles} data={'duration'} label={'TASK DURATION'} defaultSelection={0} orientation={'row'} wrap={true} onChange={handleInput} iconStyle={0}
            selections={[
                {
                    index: 0,
                    text: '5m'
                },
                {
                    index: 1,
                    text: '10m'
                },
                {
                    index: 2,
                    text: '15m'
                },
                {
                    index: 3,
                    text: '30m'
                },
                {
                    index: 4,
                    text: '45m'
                },
                {
                    index: 5,
                    text: '60m'
                }
            ]}></SelectionList>
            <DateTimeComponent styles={styles} dataKey={'due'} label={'DUE DATE / TIME'} onChange={handleInput}/>
            
            <Button title='Save' onPress={reportData}/>
        </ScrollView>
    )

}

const myStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
})