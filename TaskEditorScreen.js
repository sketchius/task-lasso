import React, {useState, useRef} from 'react';
import { View, TextInput, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { DateTimeComponent, EditField, SelectionList } from './Form';
import getIcon from "./Icons";
import StyledText from './StyledText';


export default function TaskEditorScreen(props) {

    const styles = props.styles;

    const [form,setForm] = useState({});

    const handleInput = ( parameter, value ) => {
        alert(parameter + ' ' + value);
        setForm({ ...form, [parameter]: value});
    }

    
    const [answer,setAnswer] = useState('');


    const reportData = () => {
        alert(JSON.stringify(form))
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
            <SelectionList styles={styles} data={'priority'} label={'PRIORITY'} defaultSelection={1} orientation={'row'} onChange={handleInput} iconStyle={0}
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