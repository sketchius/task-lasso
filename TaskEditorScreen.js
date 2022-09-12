import React, {useState, useRef} from 'react';
import { View, TextInput, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { EditField, VerticalSelectionList } from './Form';

export default function TaskEditorScreen(props) {

    const styles = props.styles;

    const [form,setForm] = useState({});

    const handleInput = ( parameter, value ) => {
        setForm({ [parameter]: value});
    }

    
    const [answer,setAnswer] = useState('');


    return (
        <ScrollView style = {styles.fill}>
            <EditField styles={styles} data={'title'} label={'TITLE'} onChange={handleInput}></EditField>
            <EditField styles={styles} data={'desc'} label={'DESCRIPTION'} multiline={true} onChange={handleInput}></EditField>
            <VerticalSelectionList styles={styles} data={'type'} label={'TASK TYPE'} defaultSelection={0} onChange={handleInput}
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
            ]}></VerticalSelectionList>
            <Button title='Save'/>
        </ScrollView>
    )

}

const myStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
})