import { useRef, useState } from 'react';
import { View, TextInput, Pressable, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import StyledText from "./StyledText";
import getIcon from "./Icons";

export function EditField(props) {
    const styles = props.styles;

    const inputField = useRef(null);
    const [input,setInput] = useState('');

    const [showHelp,setShowHelp] = useState(false);

    let helpContent;

    if (props.helpTips) {
        helpContent = <View style={styles.helpElement}>
            {props.helpTips.map( (tip) => { return <View style={styles.alignedRow}>
                    <View style={styles.helpIcon}>{getIcon('FontAwesome5','arrow-circle-right',16,styles.darkColor2)}</View>
                    <StyledText styles={styles} style={styles.helpText}>{tip}</StyledText>
                </View> })}
        </View>
    }

    return (
    <View style={styles.formSectionBorder}>
        <View style={[styles.editField]}>
            <View style={[styles.alignedRow]}>
                <StyledText styles={styles} style={styles.formFieldLabel}>{props.label.toUpperCase()}</StyledText>
                <View style={styles.horizontalLine}></View>
                <Pressable style={styles.helpButton} onPress={() => (setShowHelp(!showHelp))}>
                    {getIcon('MaterialCommunityIcons',showHelp ? 'help-circle' :'help-circle-outline',24,styles.darkColor2)}
                </Pressable>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput style={styles.textInput} maxLength={props.maxLength} ref={inputField} multiline={props.multiline} onChangeText={text => props.onChange(props.data, text)}/>
            </View>
            {showHelp && helpContent}
        </View>
    </View> )
}

export function SelectionList(props) {
    const styles = props.styles;

    const inputField = useRef(null);
    const [selected,setSelected] = useState(props.defaultSelection)

    const handlePress = (index) => {
        setSelected(index);
        props.onChange(props.data, index);
    }

    const optionContent = props.selections.map( (selection) => {
        return (
            <Pressable style={[styles.selectionItem,styles.flex1,selection.index == selected && styles.selected]} onPress={() => handlePress(selection.index)}>
                {props.iconStyle > 0 &&
                <View style={[styles.selectionIcon, props.iconStyle == 2 && styles.selectionIconSmall]}>
                    {getIcon(selection.iconFamily,selection.iconName,selection.iconSize,styles.darkColor)}
                </View>}
                <View style={[styles.marginHorizontal4,styles.flex1,props.orientation == 'row' && styles.alignItems]}>
                    <StyledText styles={styles} style={[styles.selectionText]}>{selection.text}</StyledText>
                    {props.useSubtext && <StyledText styles={styles} style={[styles.selectionSubtext]}>{selection.subtext}</StyledText>}
                </View>
            </Pressable>
        )
    })

    return (
    <View style={styles.formSectionBorder}>
        <View style={[styles.editField]}>
            <View style={[styles.alignedRow]}>
                <StyledText styles={styles} style={styles.formFieldLabel}>{props.label.toUpperCase()}</StyledText>
                <View style={styles.horizontalLine}></View>
                <Pressable style={styles.helpButton}>
                    {getIcon('MaterialCommunityIcons','help-circle-outline',24,styles.darkColor2)}
                </Pressable>
            </View>            
            <View style={[props.orientation=='row' && styles.row]}>{optionContent}</View>
        </View> 
    </View> )
}


export function DateTimeComponent (props) {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);

    const styles = props.styles;

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        setShow(false);
        props.onChange(props.dataKey+'Date',selectedDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime;
        setDate(currentTime);
        setShow(false);
        props.onChange(props.dataKey+'Time',selectedTime);
    };




    return <View style={styles.editField}>
        <View style={[styles.alignedRow]}>
            <StyledText styles={styles} style={styles.formFieldLabel}>{props.label.toUpperCase()}</StyledText>
            <View style={styles.horizontalLine}></View>
            <Pressable style={styles.helpButton}>
                {getIcon('MaterialCommunityIcons','help-circle-outline',24,styles.darkColor2)}
            </Pressable>
        </View>
        <View style={[styles.alignedRow, styles.padding4]}>    
            <StyledText styles={styles} style={[styles.selectionText, styles.marginRight4]}>{'Date: ' + format(date,'E, MMM do')}</StyledText><Button onPress={() => setShow(true)} title={'Edit'}/>
            {show && <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={false}
            onChange={onChangeDate}
                />}
        </View>
        <View style={[styles.alignedRow, styles.padding4]}>    
            <StyledText styles={styles} style={[styles.selectionText, styles.marginRight4]}>{'Time: ' + format(date,'K:mm aaa')}</StyledText><Button onPress={() => setShow(true)} title={'Edit'}/>
            {show && <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode={'time'}
            is24Hour={false}
            onChange={onChangeTime}
                />}
        </View>
  </View>
}