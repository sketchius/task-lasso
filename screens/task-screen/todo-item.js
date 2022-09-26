import React, {useState, useEffect} from 'react';
import { View, Pressable, DeviceEventEmitter, LayoutAnimation} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { isToday } from 'date-fns';
import differenceInHours from 'date-fns/differenceInHours'

import { AntDesign, FontAwesome5, FontAwesome, MaterialIcons, Octicons, Entypo, Feather, Ionicons  } from '@expo/vector-icons';

import { getDateInContext, getTime } from '../../tools/DateContext';
import getIcon from '../../tools/Icons';
import MultistateCheckbox from '../../components/MultistateCheckbox';
import StyledText from '../../components/StyledText';
import StyledButton from '../../components/StyledButton';

export default function TodoItem(props) {

    const [expanded, setExpanded] = useState(false);

    const [didMount, setDidMount] = useState(false)

    useEffect(() => { setDidMount(true) }, [])

    useEffect( () => {
        if (didMount)
            LayoutAnimation.easeInEaseOut()
    },[expanded])

    const task = props.task;

    const styles = props.styles;

    const navigation = useNavigation();


    const [checkboxState, updateCheckboxState] = useState(task.status || 0);

    const [checklistCheckboxState, updateChecklistCheckboxState] = useState(task.checklist ? task.checklist.map( (item) => item.state) : []);

    const handleCheckboxStateChange = () => {
        let newState;
        switch (task.checkboxStyle) {
            default:
            case 0:
                if (checkboxState == 0)
                    newState = 1;
                else if (checkboxState == 1)
                    newState = 0;
                break;
            case 1:
                newState = checkboxState==1 ? 0 : checkboxState+.5;
                break;
        }

        updateCheckboxState(newState);
        DeviceEventEmitter.emit("event.taskEvent", {event:'setStatus', newState, uniqid: task.uniqid});
    }

    const handleChecklistCheckboxStateChange = (index) => {        
        if (checklistCheckboxState.length > index) {
            const newState = [...checklistCheckboxState];
            newState[index] = 1-newState[index];
            updateChecklistCheckboxState(newState)
        }

        // updateCheckboxState(newState);
        // DeviceEventEmitter.emit("event.taskEvent", {event:'setStatus', newState, uniqid: task.uniqid});
    }

    let expandedContent;

    const getChecklistContent = () => {
        return task.checklist.map( (checklistItem, index) => {
            return <View key={index} style={styles.alignedRow}>
                <MultistateCheckbox
                    state={checklistCheckboxState[checklistItem.index]}
                    onStateChange={handleChecklistCheckboxStateChange}
                    index={checklistItem.index}
                    style={[]}
                    size={16}
                    iconColor={styles.colors.teal}
                    label={checklistItem.text}
                    labelStyle={styles.checklistLabel}
                />
            </View>
            });
    }

    const getPriorityElement = () => {
        switch (task.priority) {
            case 0:
                return <View style={styles.lowPriority}></View>
            case 1:
                return <View style={styles.medPriority}></View>
            case 2:
                return <View style={styles.hiPriority}></View>
        }
    }

    const getTaskButtons = () => {
        const buttonConfigType = `${props.tasklist ? 'tasklist/' : 'todo/'}${task.type}`;
        const buttons = [];
        switch (buttonConfigType) {
            case 'todo/DRAFT':
                break;
            case 'tasklist/DRAFT':
                buttons.push(getButtonOfType('delete'))
                buttons.push(getButtonOfType('expand'))
                break;
            case 'todo/FLEXIBLE':
                buttons.push(getButtonOfType('edit'))
                buttons.push(getButtonOfType('schedule'))
                buttons.push(getButtonOfType('defer'))
                break;
            case 'tasklist/FLEXIBLE':
                buttons.push(getButtonOfType('delete'))
                buttons.push(getButtonOfType('edit'))
                buttons.push(getButtonOfType('schedule'))
                break;
            case 'todo/DEADLINE':
                buttons.push(getButtonOfType('edit'))
                buttons.push(getButtonOfType('extend'))
                break;
            case 'tasklist/DEADLINE':
                buttons.push(getButtonOfType('delete'))
                buttons.push(getButtonOfType('edit'))
                buttons.push(getButtonOfType('extend'))
                break;
            case 'todo/SCHEDULED':
                buttons.push(getButtonOfType('edit'))
                buttons.push(getButtonOfType('reschedule'))
                break;
            case 'tasklist/SCHEDULED':
                buttons.push(getButtonOfType('delete'))
                buttons.push(getButtonOfType('edit'))
                buttons.push(getButtonOfType('reschedule'))
                break;
            case 'todo/REPEATING':
                buttons.push(getButtonOfType('edit'))
                buttons.push(getButtonOfType('defer'))
                break;
            case 'tasklist/REPEATING':
                buttons.push(getButtonOfType('delete'))
                buttons.push(getButtonOfType('edit'))
                break;
        }
        return buttons;
    }

    const getButtonOfType = (buttonType) => {
        switch (buttonType) {
            case 'edit':
                return <StyledButton onPress={ () => { navigation.navigate('Editor',{action: 'edit', mode: 'task', uniqid: task.uniqid}) }} data='edit' label='Edit' iconFamily='Feather' iconName='edit'/>;
            case 'delete':
                return <StyledButton label='Delete' iconFamily='FontAwesome' iconName='times'/>;
            case 'defer':
                return <StyledButton label='Defer' iconFamily='AntDesign' iconName='arrowright'/>;
            case 'schedule':
                return <StyledButton label='Schedule' iconFamily='Feather' iconName='calendar'/>;
            case 'reschedule':
                return <StyledButton label='Reschedule' iconFamily='Feather' iconName='calendar'/>;
            case 'extend':
                return <StyledButton label='Extend' iconFamily='Ionicons' iconName='play-skip-forward'/>;
            case 'expand':
                return <StyledButton label='Expand' iconFamily='MaterialCommunityIcons' iconName='arrow-expand-all'/>;
        }
    }


    if (expanded) {
        expandedContent = (
            <View>
                {task.description && <View style={[styles.marginBottom4]}>
                    <View style={[styles.marginRight4, styles.marginTop2, styles.alignedRow, {alignSelf: 'flex-start', width: 60}]}>
                        {getIcon('MaterialCommunityIcons','card-text-outline',12,styles.colors.teal)}
                        <StyledText style={[styles.taskTypeText, styles.teal2Text]}>DETAILS</StyledText>
                    </View>
                    <StyledText style={[styles.fontSize1, styles.tealText, styles.flex1, styles.marginRight3, {borderLeftWidth: 1, borderLeftColor: styles.colors.teal2, paddingLeft: 8}]} numberOfLines={expanded ? 4 : 1}>
                        {task.description}
                    </StyledText>
                </View>}
                {task.checklist &&<View style={[styles.marginBottom4]}>
                    <View style={[styles.marginRight4, styles.marginBottom2, styles.alignedRow, {alignSelf: 'flex-start', width: 60}]}>
                        {getIcon('FontAwesome','list-ul',12,styles.colors.teal)}
                        <StyledText style={[styles.taskTypeText, styles.teal2Text]}>CHECKLIST</StyledText>
                    </View>
                    <View style={{borderLeftWidth: 1, borderLeftColor: styles.colors.teal2, paddingLeft: 8}}>{getChecklistContent()}</View>
                </View>}
                <View style={[styles.alignedRow, styles.marginVertical3]}>
                    {getTaskButtons()}
                </View>
            </View>
        )
    }

    const taskTypeContent = (
        ( () => {
            switch (task.type) {
                case 'FLEXIBLE':
                    return (
                        expanded ? <View style={[styles.taskTypeElement]}>{getIcon('FontAwesome','arrows',12,styles.colors.teal)}
                            <StyledText style={[styles.taskTypeText, styles.teal2Text]}>FLEXIBLE TASK</StyledText>
                        </View> : undefined
                    )
                case 'DEADLINE':
                    const today = isToday(task.dateDue);
                    return (
                        <View style={[styles.taskTypeElement, today && styles.yellowAlert]}>{getIcon('FontAwesome','dot-circle-o',12,today ? styles.colors.yellow : styles.colors.teal)}
                            <StyledText style={[styles.taskTypeText, today ? styles.yellow2Text : styles.teal2Text]}>{expanded ? 'DEADLINE: ' : ''}DUE BY {getDateInContext(task.dateDue,false).toUpperCase()}</StyledText>
                        </View>
                    ) 
                case 'SCHEDULED':
                    const scheduledTime = getTime(task.dateDue);
                    const hoursAway = differenceInHours(task.dateDue,new Date());
                    return (
                        <View style={[styles.taskTypeElement, hoursAway < 3 ? styles.redHighlight : styles.yellowHighlight]}>{getIcon('Octicons','clock',12,styles.colors.gray2)}
                            <StyledText style={styles.taskTypeText}>SCHEDULED TODAY{scheduledTime ? ` AT ${scheduledTime.toUpperCase()}` : ``}</StyledText>
                        </View>
                    )
                case 'REPEATING':
                    if (expanded){
                    return (
                        <View style={[styles.taskTypeElement]}>{getIcon('FontAwesome','refresh',12,styles.colors.gray2)}
                            <StyledText style={styles.taskTypeText}>REPEATING TASK</StyledText>
                        </View>
                    ) }
                    else return undefined;
            }
        })()
    )

    const hideBottomContent = 
        !task.description &&
        !task.tasklist &&
        !taskTypeContent &&
        !expanded


    

    return (
    <View style={[styles.row, styles.whiteBackground, styles.taskBorder]}>
        {!props.tasklist ? <MultistateCheckbox state={checkboxState} onStateChange={handleCheckboxStateChange} style={[styles.padding2, styles.marginTop3, styles.paddingHorizontal4]}  size={24} ></MultistateCheckbox> : <View style={styles.compactTaskElement}></View>}
        <View style={[ styles.flex100, styles.leftBorder]} >
            <View>
                <Pressable style={[styles.alignedRow, styles.paddingLeft2, !props.tasklist && styles.marginVertical2]} onPress={() => setExpanded(!expanded) }>    
                    <View style={props.tasklist ? styles.taskIconCompact : styles.taskIcon}>
                        {getIcon(task.iconLibrary,task.iconName,props.tasklist ? 16 : 24,styles.colors.gray)}
                    </View>            
                    {getPriorityElement()}
                    <StyledText style={[styles.listItem, styles.fontSize2, styles.headerFont, styles.marginLeft3, styles.paddingLeft1]}>{task.title}</StyledText>
                </Pressable>
                {(!hideBottomContent && (!props.tasklist || expanded)) && <View style={[styles.paddingHorizontal4, {borderColor: styles.colors.teal3, borderTopWidth: styles.space.size0}]}>
                    {(!props.tasklist || expanded) && <View style={[styles.alignedRow, styles.marginTop3]}>
                        {task.prority === 2 && <View style={[styles.marginRight4, styles.alignedRow, styles.orangeBackground]}>
                            <FontAwesome5 name="exclamation-circle" size={12} color="#999" style={styles.paddingRight2}/>
                            <StyledText style={styles.alertText}>HIGH PRIORITY</StyledText>
                        </View>}
                        {taskTypeContent}
                        {task.description && !expanded && <View style={[styles.taskTypeElement]}>
                            {getIcon('MaterialCommunityIcons','card-text-outline',12,styles.colors.teal)}
                            <StyledText style={[styles.taskTypeText, styles.teal2Text]}>DETAILS</StyledText>
                        </View>}
                        {task.checklist && !expanded && <View style={[styles.marginRight4, styles.alignedRow]}>
                            {getIcon('FontAwesome','list-ul',12,styles.colors.teal)}
                            <StyledText style={[styles.taskTypeText, styles.teal2Text]}>CHECKLIST</StyledText>
                        </View>}
                    </View>}
                    {expanded && expandedContent}
                </View>}
            </View>
        </View>
    </View> )


}