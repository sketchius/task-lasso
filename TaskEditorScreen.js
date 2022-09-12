import React, {useState, useRef} from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { EditField } from './Form';

export default function TaskEditorScreen(props) {

    const [form,setForm] = useState({});

    const handleInput = ( parameter, value ) => {
        setForm({ [parameter]: value});
    }

    
    const [answer,setAnswer] = useState('');


    return (
        <View style = {myStyle.container}>
            <EditField styles={props.styles} data={'title'} label={'TITLE'} onChange={handleInput}></EditField>
            <Button title='Save'/>
        </View>
    )

}

const myStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        paddingRight: 10,
        alignItems: "center"
    },
    input: {
        height: 40,
        flex: 1,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})