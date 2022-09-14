import React, {useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome, MaterialIcons, Octicons, Entypo, Feather, Ionicons  } from '@expo/vector-icons';
import { isToday } from 'date-fns';
import { getTime } from './DateContext';
import getIcon from './Icons';
import MultistateCheckbox from './MultistateCheckbox';
import StyledText from './StyledText';

export default function ToDoListItem(props) {
    const [expanded, setExpanded] = useState(false);

    const task = props.task;

    const styles = props.styles;


    const [checkBoxState, updateCheckBoxState] = useState(0);

    const handleCheckboxStateChange = (value) => {
        props.onTaskEvent({event:'setStatus', value, uniqid: task.uniqid});
    }

    let expandedContent;

    if (expanded) {
        expandedContent = (
            <View style={[styles.alignedRow, styles.spaceBetween, styles.marginVertical3, styles.width300]}>
                <Pressable style={[styles.size80, styles.alignItems, styles.thinBorder, styles.margina, styles.paddingVertical4]}>
                    <FontAwesome5 name="expand" size={16} color="black"/>
                    <StyledText styles={styles} style={styles.paddingTop2}>Details</StyledText>
                </Pressable>
                
                <Pressable style={[styles.size80, styles.alignItems, styles.thinBorder, styles.margina, styles.paddingVertical4]}>
                    <Feather name="edit" size={16} color="black" />
                    <StyledText styles={styles} style={styles.paddingTop2}>Edit</StyledText>
                </Pressable>
                
                <Pressable style={[styles.size80, styles.alignItems, styles.thinBorder, styles.margina, styles.paddingVertical4]}>
                    <AntDesign name="arrowright" size={16} color="black" />
                    <StyledText styles={styles} style={styles.paddingTop2}>Defer</StyledText>
                </Pressable>
            </View>
        )
    }

    return (
    <View style={[styles.row, styles.marginVertical3, styles.whiteBackground, styles.horizontalBorders]}>
        <MultistateCheckbox states={3} styles={styles} onStateChange={handleCheckboxStateChange}></MultistateCheckbox>
        <Pressable style={[styles.marginVertical3, styles.paddingRight3, styles.paddingLeft4, styles.flex100, styles.leftBorder]} onPress={() => setExpanded(!expanded) }>
            <View style={styles.alignedRow}>
                <View style={styles.taskIcon}>
                    {getIcon(task.iconLibrary,task.iconName,20,'black')}
                </View>
                <StyledText styles={styles} style={[styles.listItem, styles.fontSize2, styles.headerFont]}>{task.title}</StyledText>
            </View>
            {task.description && <StyledText styles={styles} style={[styles.fontSize00, styles.lightText]} numberOfLines={expanded ? 4 : 1}>{task.description}</StyledText>}
            <View style={[styles.alignedRow, styles.marginTop3]}>
                <View style={[styles.marginRight4, styles.alignedRow]}>
                    <Octicons name="note" size={12} color="#999"/>
                    <StyledText styles={styles} style={styles.fontSize00}> 3</StyledText>
                </View>
                {task.prority === 2 && <View style={[styles.marginRight4, styles.alignedRow, styles.orangeBackground]}>
                    <FontAwesome5 name="exclamation-circle" size={12} color="#999" style={styles.paddingRight2}/>
                    <StyledText styles={styles} style={styles.alertText}>HIGH PRIORITY</StyledText>
                </View>}
                {isToday(task.dueDate) && task.type === 'SCHEDULED' && <View style={[styles.marginRight4, styles.alignedRow, styles.yellowBackground]}>
                    <Octicons name="clock" size={12} color="#999"  style={styles.paddingRight2} />
                    <StyledText styles={styles} style={styles.alertText}>{getTime(task.dueDate)}</StyledText>
                </View>}
                {isToday(task.dueDate) && task.type === 'DEADLINE' && <View style={[styles.marginRight4, styles.alignedRow, styles.yellowBackground]}>
                    <Feather name="calendar" size={12} color="#999"  style={styles.paddingRight2} />
                    <StyledText styles={styles} style={styles.alertText}>DUE TODAY</StyledText>
                </View>}
            </View>
            {expanded && expandedContent}
        </Pressable>
    </View> )
}