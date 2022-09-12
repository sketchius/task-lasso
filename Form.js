import { useRef, useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import StyledText from "./StyledText";
import getIcon from "./Icons";

export function EditField(props) {
    const styles = props.styles;

    const inputField = useRef(null);
    const [input,setInput] = useState('');

    return (
    <View style={styles.editField}>
        <StyledText styles={styles} style={styles.formFieldLabel}>{props.label.toUpperCase()}</StyledText>
        <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput} maxLength={props.maxLength} ref={inputField} multiline={props.multiline} onChangeText={text => props.onChange(props.data, text)}/>
        </View>
    </View> )
}

export function VerticalSelectionList(props) {
    const styles = props.styles;

    const inputField = useRef(null);
    const [selected,setSelected] = useState(props.defaultSelection)

    const handlePress = (index) => {
        setSelected(index);
        props.onChange(props.data, index);
    }

    const optionContent = props.selections.map( (selection) => {
        return (
            <Pressable style={[styles.selectionItem,selection.index == selected && styles.selected]} onPress={() => setSelected(selection.index)}>
                <View style={styles.selectionIcon}>{getIcon(selection.iconFamily,selection.iconName,selection.iconSize,'black')}</View>
                <View style={styles.marginLeft4}>
                    <StyledText styles={styles} style={[styles.selectionText, selection.index == selected && styles.selectedText]}>{selection.text}</StyledText>
                    <StyledText styles={styles} style={[styles.selectionSubtext]}>{selection.subtext}</StyledText>
                </View>
            </Pressable>
        )
    })

    return (
    <View style={styles.editField}>
        <StyledText styles={styles} style={styles.formFieldLabel}>{props.label.toUpperCase()}</StyledText>
        {optionContent}
    </View> )
}