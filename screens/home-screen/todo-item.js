import React, {useState} from 'react';
import { View, Pressable, DeviceEventEmitter} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { isToday } from 'date-fns';
import differenceInHours from 'date-fns/differenceInHours'

import { AntDesign, FontAwesome5, FontAwesome, MaterialIcons, Octicons, Entypo, Feather, Ionicons  } from '@expo/vector-icons';

import { getDateInContext, getTime } from './../../tools/DateContext';
import getIcon from './../../tools/Icons';
import MultistateCheckbox from './../../components/MultistateCheckbox';
import StyledText from './../../components/StyledText';

export default function TodoItem(props) {
    const [expanded, setExpanded] = useState(false);

    const task = props.task;

    const styles = props.styles;

    const navigation = useNavigation();


    const [checkBoxState, updateCheckBoxState] = useState(0);

    const handleCheckboxStateChange = (value) => {
        DeviceEventEmitter.emit("event.taskEvent", {event:'setStatus', value, uniqid: task.uniqid});
    }

    let expandedContent;

    if (expanded) {
        expandedContent = (
            <View style={[styles.alignedRow, styles.spaceBetween, styles.marginVertical3, styles.width300]}>
                <Pressable style={[styles.size80, styles.alignItems, styles.thinBorder, styles.margina, styles.paddingVertical4]}
                onPress={ () => {
                    navigation.navigate('Tasks', { expandedId : task.uniqid })

                }}>
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

    const taskTypeContent = (
        ( () => {
            switch (task.type) {
                case 'FLEXIBLE':
                    if (expanded){
                    return (
                        <View style={[styles.taskTypeElement]}>{getIcon('FontAwesome','arrows',12,styles.darkColor2)}
                            <StyledText styles={styles} style={styles.taskTypeText}>FLEXIBLE TASK</StyledText>
                        </View>
                    ) }
                    else return undefined;
                case 'DEADLINE':
                    return (
                        <View style={[styles.taskTypeElement]}>{getIcon('Feather','calendar',12,styles.darkColor2)}
                            <StyledText styles={styles} style={styles.taskTypeText}>DUE BY {getDateInContext(task.dateDue,false).toUpperCase()}</StyledText>
                        </View>
                    ) 
                case 'SCHEDULED':
                    const scheduledTime = getTime(task.dateDue);
                    const hoursAway = differenceInHours(task.dateDue,new Date());
                    return (
                        <View style={[styles.taskTypeElement, hoursAway < 3 ? styles.redHighlight : styles.yellowHighlight]}>{getIcon('Octicons','clock',12,styles.darkColor2)}
                            <StyledText styles={styles} style={styles.taskTypeText}>SCHEDULED TODAY{scheduledTime ? ` AT ${scheduledTime.toUpperCase()}` : ``}</StyledText>
                        </View>
                    )
                case 'REPEATING':
                    if (expanded){
                    return (
                        <View style={[styles.taskTypeElement]}>{getIcon('FontAwesome','refresh',12,styles.darkColor2)}
                            <StyledText styles={styles} style={styles.taskTypeText}>REPEATING TASK</StyledText>
                        </View>
                    ) }
                    else return undefined;
            }
        })()
    )

    return (
    <View style={[styles.row, styles.marginVertical3, styles.whiteBackground, styles.horizontalBorders]}>
        <MultistateCheckbox states={3} styles={styles} initialState={task.status ? task.status : 0} onStateChange={handleCheckboxStateChange}></MultistateCheckbox>
        <Pressable style={[styles.marginVertical3, styles.paddingRight3, styles.paddingLeft4, styles.flex100, styles.leftBorder]} onPress={() => setExpanded(!expanded) }>
            <View style={styles.alignedRow}>
                <View style={styles.taskIcon}>
                    {getIcon(task.iconLibrary,task.iconName,20,'black')}
                </View>
                <StyledText styles={styles} style={[styles.listItem, styles.fontSize2, styles.headerFont]}>{task.title}</StyledText>
            </View>
            {task.description && <StyledText styles={styles} style={[styles.fontSize00, styles.lightText]} numberOfLines={expanded ? 4 : 1}>{task.description}</StyledText>}
            <View style={[styles.alignedRow, styles.marginTop3]}>

                {task.prority === 2 && <View style={[styles.marginRight4, styles.alignedRow, styles.orangeBackground]}>
                    <FontAwesome5 name="exclamation-circle" size={12} color="#999" style={styles.paddingRight2}/>
                    <StyledText styles={styles} style={styles.alertText}>HIGH PRIORITY</StyledText>
                </View>}
                {taskTypeContent}
                {isToday(task.dateDue) && task.type === 'DEADLINE' && <View style={[styles.marginRight4, styles.alignedRow, styles.yellowBackground]}>
                    <Feather name="calendar" size={12} color="#999"  style={styles.paddingRight2} />
                    <StyledText styles={styles} style={styles.alertText}>DUE TODAY</StyledText>
                </View>}
                {task.comments && <View style={[styles.marginRight4, styles.alignedRow]}>
                    <Octicons name="note" size={12} color="#999"/>
                    <StyledText styles={styles} style={styles.fontSize00}> 3</StyledText>
                </View>}
                {task.showScore && <View style={[styles.marginRight4, styles.alignedRow]}>
                    <Entypo name="controller-record" size={12} color="#999"/>
                    <StyledText styles={styles} style={styles.fontSize00}>{task.score}</StyledText>
                </View>}
            </View>
            {expanded && expandedContent}
        </Pressable>
    </View> )


}