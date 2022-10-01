import { useRef, useState, useEffect } from 'react';
import { View, TextInput, Pressable, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import StyledText from "./StyledText";
import getIcon from "./../tools/Icons";

export function EditField(props) {
    const styles = props.styles;

    const inputField = useRef(null);

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
            <View style={styles.formHeader}>
                <View style={[styles.marginRight3, styles.formLabelIcon]}>
                    {getIcon(props.labelIconFamily,props.labelIconName,24,styles.colors.blue2)}
                </View>
                <StyledText style={styles.formFieldLabel}>{props.label.toUpperCase()}</StyledText>
                {props.required ?
                    <StyledText style={styles.requiredText}>(required)</StyledText> :
                    <StyledText style={styles.optionalText}>(optional)</StyledText>
                }
                <View style={styles.formUpperBorder}></View>
                <Pressable style={styles.helpButton} onPress={() => (setShowHelp(!showHelp))}>
                    {getIcon('MaterialCommunityIcons',showHelp ? 'help-circle' :'help-circle-outline',24,styles.colors.gray2)}
                </Pressable>
            </View>
            <View style={styles.formBody}>
                
                {props.subtext && <StyledText style={[styles.selectionSubtext, styles.marginBottom3]}>{props.subtext}</StyledText>}
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} value={props.text} maxLength={props.maxLength} ref={inputField} multiline={props.multiline} onChangeText={text => props.onChange(text)}/>
                </View>
                {showHelp && helpContent}
            </View>
        </View>
    </View> )
}

export function EditFieldArray(props) {
    const styles = props.styles;

    const inputField = useRef(null);

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

    const fields = props.content.map( (fieldText,index) => {
        return <View style={[styles.alignedRow, styles.marginVertical2]} key={index}>
            <View style={styles.padding3}>{getIcon('FontAwesome','circle',16,styles.colors.gray2)}</View>
            <View style={styles.textInputContainer}>
                <TextInput style={styles.textInputSmall} value={fieldText} maxLength={props.maxLength} ref={inputField} onChangeText={text => props.onChange(text,index)}/>
            </View>
            <Pressable style={styles.paddingHorizontal4} onPress={() => props.onDelete(index)}>{getIcon('FontAwesome5','times',20,styles.colors.red2)}</Pressable>
        </View>
    })

    const addItem = () => {

    }

    return (
    <View style={styles.formSectionBorder}>
        <View style={[styles.editField]}>
            <View style={styles.formHeader}>
                <View style={[styles.marginRight3, styles.formLabelIcon]}>
                    {getIcon(props.labelIconFamily,props.labelIconName,24,styles.colors.blue2)}
                </View>
                <StyledText style={styles.formFieldLabel}>{props.label.toUpperCase()}</StyledText>
                {props.required ?
                    <StyledText style={styles.requiredText}>(required)</StyledText> :
                    <StyledText style={styles.optionalText}>(optional)</StyledText>
                }
                <View style={styles.formUpperBorder}></View>
                <Pressable style={styles.helpButton} onPress={() => (setShowHelp(!showHelp))}>
                    {getIcon('MaterialCommunityIcons',showHelp ? 'help-circle' :'help-circle-outline',24,styles.colors.gray2)}
                </Pressable>
            </View>
            <View style={styles.formBody}>
                {props.subtext && <StyledText style={[styles.selectionSubtext, styles.marginBottom3]}>{props.subtext}</StyledText>}
                {fields}
                <Pressable style={styles.styledButton} onPress={() => props.onAdd()}>
                    {getIcon('MaterialIcons','add',20,'white')}
                    <StyledText style={styles.styledButtonText}>ADD ITEM</StyledText>
                </Pressable>
                
                {showHelp && helpContent}
            </View>
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
            case 6:
                itemWidth = styles.sixColumns;
                break;
        }
    } else
        itemWidth = styles.oneColumn;


    const optionContent = props.selections
        .filter( selection => !selection.hide )
        .map( (selection,i) => {
        const selected = selection.stateValue == props.selection;
        let itemBorderStyle;
        let labelBorderStyle;
        if (true) {
            itemBorderStyle = selected ? [selection.selectedStyle, styles.selectionBorder1] : [selection.deselectedStyle, styles.hiddenBorder1];
        } else {
            labelBorderStyle = selected ? selection.selectedStyle : selection.deselectedStyle;
            itemBorderStyle = selected ? styles.selectionListSelected : styles.selectionListDeselected
        }
        let activeIconColor;
        let activeTextStyle;
        let activeSubtextstyle;
        let activeViewStyle;

        //switch (selection.activeColor) {
        switch ('blue') {
            case 'red':
                activeIconColor = styles.colors.red
                activeTextStyle = styles.redText
                activeSubtextstyle = styles.red2Text
                activeViewStyle = styles.redHighlight
                break;
            case 'orange':
                activeIconColor = styles.colors.orange
                activeTextStyle = styles.orangeText
                activeSubtextstyle = styles.orange2Text
                activeViewStyle = styles.orangeHighlight
                break;
            case 'yellow':
                activeIconColor = styles.colors.yellow
                activeTextStyle = styles.yellowText
                activeSubtextstyle = styles.yellow2Text
                activeViewStyle = styles.yellowHighlight
                break;
            case 'green':
                activeIconColor = styles.colors.green
                activeTextStyle = styles.greenText
                activeSubtextstyle = styles.green2Text
                activeViewStyle = styles.greenHighlight
                break;
            case 'teal':
                activeIconColor = styles.colors.teal
                activeTextStyle = styles.tealText
                activeSubtextstyle = styles.teal2Text
                activeViewStyle = styles.tealHighlight
                break;
            case 'blue':
                activeIconColor = styles.colors.blue
                activeTextStyle = styles.blueText
                activeSubtextstyle = styles.blue2Text
                activeViewStyle = styles.blueHighlight
                break;
            case 'pink':
                activeIconColor = styles.colors.pink
                activeTextStyle = styles.pinkText
                activeSubtextstyle = styles.pink2Text
                activeViewStyle = styles.pinkHighlight
                break;
            case 'gray':
                activeIconColor = styles.colors.gray
                activeTextStyle = styles.grayText
                activeSubtextstyle = styles.gray2Text
                activeViewStyle = styles.grayHighlight
                break;
        }

        return (
            <Pressable
                key={i}
                style={[props.orientation == 'column' ? styles.selectionItemColumn : styles.selectionItemRow, itemWidth, selected ? [activeViewStyle, styles.selectionBorder1] : [styles.hiddenHighlight, styles.hiddenBorder1], styles.margin2]}
                onPress={() => props.onPress(selection.stateValue)
            }>
                {props.iconStyle > 0 &&
                <View style={[,styles.selectionIcon, props.iconStyle == 2 && styles.selectionIconSmall,selection.hideIconBorder && styles.noBorder]}>
                    {getIcon(selection.iconFamily,selection.iconName,selection.iconSize,selected ? activeIconColor : styles.colors.gray3)}
                </View>}
                <View style={[styles.marginHorizontal4,props.orientation == 'column' ? styles.flexStart : styles.alignItems, {alignSelf: 'center',width: '100%'}]}>
                    <StyledText style={[styles.selectionText, props.orientation == 'row' &&
                    props.iconStyle == 2 && 
                    styles.selectionTextSmall, selected && activeTextStyle]}>
                        {selection.text}
                    </StyledText>
                    {props.useSubtext && <StyledText style={[styles.selectionSubtext, selected ? activeSubtextstyle : styles.gray3Text]}>{selection.subtext}</StyledText>}
                </View>
            </Pressable>
        )
    })

    return (
        <View style={[styles.editField]}>
            <View style={styles.formHeader}>
                <View style={[styles.marginRight3, styles.formLabelIcon]}>
                    {getIcon(props.labelIconFamily,props.labelIconName,24,styles.colors.blue2)}
                </View>
                <StyledText style={styles.formFieldLabel}>{props.label.toUpperCase()}</StyledText>
                <View style={styles.formUpperBorder}></View>
                <Pressable style={styles.helpButton}>
                    {getIcon('MaterialCommunityIcons','help-circle-outline',24,props.invert ? styles.whiteColor : styles.colors.gray2)}
                </Pressable>
            </View>            
            <View style={styles.formBody}>
                <View style={[props.orientation=='row' && styles.row, props.wrap && styles.wrap, styles.spaceBetween, optionContent.length == 2 && styles.twoOptions]}>{optionContent}</View>
                
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
            <StyledText style={styles.formFieldLabel}>{props.label.toUpperCase()}</StyledText>
            <View style={styles.formUpperBorder}></View>
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