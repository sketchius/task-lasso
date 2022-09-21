import { useRef, useState, useEffect } from 'react';
import { View, TextInput, Pressable, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import StyledText from "./StyledText";
import getIcon from "./../tools/Icons";

export function EditField(props) {
    const styles = props.styles;

    const inputField = useRef(null);
    const [input,setInput] = useState('');

    const [showHelp,setShowHelp] = useState(false);

    let helpContent;

    if (props.helpTips) {
        helpContent = <View style={styles.helpElement}>
            {props.helpTips.map( (tip,index) => { return <View key={index} style={styles.alignedRow}>
                    <View style={styles.helpIcon}>{getIcon('FontAwesome5','arrow-circle-right',16,styles.colors.gray2)}</View>
                    <StyledText style={styles.helpText}>{tip}</StyledText>
                </View> })}
        </View>
    }

    return (
    <View style={styles.formSectionBorder}>
        <View style={[styles.editField]}>
            <View style={[styles.alignedRow]}>
                <StyledText style={styles.formFieldLabel}>{props.label.toUpperCase()}</StyledText>
                <View style={styles.horizontalLine}></View>
                <Pressable style={styles.helpButton} onPress={() => (setShowHelp(!showHelp))}>
                    {getIcon('MaterialCommunityIcons',showHelp ? 'help-circle' :'help-circle-outline',24,styles.colors.gray2)}
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

    let itemWidth;

    if (props.orientation == 'row') {
        switch (props.columns) {
            case 1:
                itemWidth = styles.oneColumn;
                break;
            case 2:
                itemWidth = styles.twoColumns;
                break;
            case 3:
                itemWidth = styles.threeColumns;
                break;
        }
    } else
        itemWidth = styles.oneColumn;




    const optionContent = props.selections.map( (selection,i) => {
        const selected = selection.stateValue == props.selection;
        return (
            <Pressable key={i} style={[props.orientation == 'column' ? styles.selectionItemColumn : styles.selectionItemRow,props.invert && styles.whiteBackground, itemWidth]} onPress={() => props.onPress(selection.stateValue)}>
                {props.iconStyle > 0 &&
                <View style={[,styles.selectionIcon, props.iconStyle == 2 && styles.selectionIconSmall,selection.hideIconBorder && styles.noBorder]}>
                    {getIcon(selection.iconFamily,selection.iconName,selection.iconSize,selected ? styles.colors.gray : styles.colors.gray3)}
                </View>}
                <View style={[styles.marginHorizontal4,props.orientation == 'column' ? {alignItems: 'flex-start'} : styles.alignItems]}>
                    <StyledText style={[styles.selectionText, props.orientation == 'row' && 
                    props.iconStyle == 2 && 
                    styles.selectionTextSmall, selected ? selection.selectedStyle : [selection.deselectedStyle, styles.gray3Text]]}>
                        {selection.text}
                    </StyledText>
                    {props.useSubtext && <StyledText style={[styles.selectionSubtext, !selected && styles.gray3Text]}>{selection.subtext}</StyledText>}
                </View>
            </Pressable>
        )
    })

    return (
        <View style={[styles.editField]}>
            <View style={[styles.alignedRow, styles.marginBottom3]}>
                <StyledText style={props.invert ? styles.formFieldLabelWhite : styles.formFieldLabel}>{props.label.toUpperCase()}</StyledText>
                <View style={props.invert ? styles.horizontalLineWhite : styles.horizontalLine}></View>
                <Pressable style={styles.helpButton}>
                    {getIcon('MaterialCommunityIcons','help-circle-outline',24,props.invert ? styles.whiteColor : styles.colors.gray2)}
                </Pressable>
            </View>            
            <View style={[props.orientation=='row' && styles.row, props.wrap && styles.wrap, styles.spaceBetween, optionContent.length == 2 && styles.twoOptions]}>{optionContent}</View>
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
            <StyledText style={styles.formFieldLabel}>{props.label.toUpperCase()}</StyledText>
            <View style={styles.horizontalLine}></View>
            <Pressable style={styles.helpButton}>
                {getIcon('MaterialCommunityIcons','help-circle-outline',24,styles.colors.gray2)}
            </Pressable>
        </View>
        <View style={[styles.alignedRow, styles.padding4]}>    
            <StyledText style={[styles.selectionText, styles.marginRight4]}>{'Date: ' + format(date,'E, MMM do')}</StyledText><Button onPress={() => setShow(true)} title={'Edit'}/>
            {show && <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={false}
            onChange={onChangeDate}
                />}
        </View>
        <View style={[styles.alignedRow, styles.padding4]}>    
            <StyledText style={[styles.selectionText, styles.marginRight4]}>{'Time: ' + format(date,'K:mm aaa')}</StyledText><Button onPress={() => setShow(true)} title={'Edit'}/>
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