import { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import StyledText from "./StyledText";

export function EditField(props) {
    const styles = props.styles;

    const inputField = useRef(null);
    const [input,setInput] = useState('');

    return (
    <View style={styles.editField}>
        <StyledText styles={styles} style={styles.editFieldLabel}>{props.label.toUpperCase()}</StyledText>
        <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput} maxLength={props.maxLength} ref={inputField} onChangeText={text => props.onChange(props.data, text)}/>
        </View>
    </View> )
}