import React, {useState, useRef} from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function TaskEditorScreen(props) {

    const captureTextInput = useRef(null);
    const [captureInput,setCaptureInput] = useState('');

    const capturePress = () => {
        captureTextInput.current.clear();
        props.handleCapture(captureInput);
    }


    return (
        <View style = {styles.container}>
            <TextInput
                ref={captureTextInput}
                style={styles.input}
                placeholder="Capture a thought"
                onChangeText={text => setCaptureInput(text)}
            />
            <Button title='Capture' onPress={capturePress}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        paddingRight: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        height: 40,
        flex: 1,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})