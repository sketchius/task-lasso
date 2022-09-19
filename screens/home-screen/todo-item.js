import React, {useState, useEffect} from 'react';
import { View, Pressable, DeviceEventEmitter, LayoutAnimation} from 'react-native';
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

    const [didMount, setDidMount] = useState(false)

    useEffect(() => { setDidMount(true) }, [])

    useEffect( () => {
        if (didMount)
            LayoutAnimation.easeInEaseOut()
    },[expanded])

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
            <View>
                {task.description && <StyledText style={[styles.fontSize00, styles.lightText, styles.marginRight3]} numberOfLines={expanded ? 4 : 1}>{task.description}</StyledText>}
                <View style={[styles.alignedRow, styles.spaceBetween, styles.marginVertical3, styles.width300]}>
                    <Pressable style={[styles.size80, styles.alignItems, styles.thinBorder, styles.margina, styles.paddingVertical4]}
                    onPress={ () => {
                        navigation.navigate('Tasks', { expandedId : task.uniqid })
                    }}>
                        <FontAwesome5 name="expand" size={16} color={styles.colors.gray3} />
                        <StyledText style={[styles.paddingTop2, styles.colors.gray3Text]}>Details</StyledText>
                    </Pressable>
                
                    <Pressable style={[styles.size80, styles.alignItems, styles.thinBorder, styles.margina, styles.paddingVertical4]}>
                        <Feather name="edit" size={16} color={styles.colors.gray3}  />
                        <StyledText style={[styles.paddingTop2, styles.colors.gray3Text]}>Edit</StyledText>
                    </Pressable>
                
                    <Pressable style={[styles.size80, styles.alignItems, styles.thinBorder, styles.margina, styles.paddingVertical4]}>
                        <AntDesign name="arrowright" size={16} color={styles.colors.gray3}  />
                        <StyledText style={[styles.paddingTop2, styles.colors.gray3Text]}>Defer</StyledText>
                    </Pressable>
                </View>
            </View>
        )
    }

    const taskTypeContent = (
        ( () => {
            switch (task.type) {
                case 'FLEXIBLE':
                    if (expanded){
                    return (
                        <View style={[styles.taskTypeElement]}>{getIcon('FontAwesome','arrows',12,styles.colors.gray2)}
                            <StyledText style={styles.taskTypeText}>FLEXIBLE TASK</StyledText>
                        </View>
                    ) }
                    else return undefined;
                case 'DEADLINE':
                    return (
                        <View style={[styles.taskTypeElement, isToday(task.dateDue) && styles.yellowHighlight]}>{getIcon('Feather','calendar',12,styles.colors.gray2)}
                            <StyledText style={styles.taskTypeText}>DUE BY {getDateInContext(task.dateDue,false).toUpperCase()}</StyledText>
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

    return (
    <View style={[styles.row, styles.whiteBackground, styles.taskBorder]}>
        {!props.compact ? <MultistateCheckbox states={3} styles={styles} initialState={task.status ? task.status : 0} onStateChange={handleCheckboxStateChange}></MultistateCheckbox> : <View style={styles.compactTaskElement}></View>}
        <Pressable style={[ styles.paddingRight3, styles.paddingLeft4, styles.flex100, styles.leftBorder]} onPress={() => setExpanded(!expanded) }>
            <View style={props.compact ? styles.marginVertical0 : styles.marginVertical3}>
                <View style={styles.alignedRow}>
                    <View style={props.compact ? styles.taskIconCompact : styles.taskIcon}>
                        {getIcon(task.iconLibrary,task.iconName,props.compact ? 16 : 24,styles.colors.gray2)}
                    </View>
                    <StyledText style={[styles.listItem, styles.fontSize2, styles.headerFont]}>{task.title}</StyledText>
                </View>
                {(!props.compact || expanded) && <View style={[styles.alignedRow, styles.marginTop3]}>
                    {task.prority === 2 && <View style={[styles.marginRight4, styles.alignedRow, styles.orangeBackground]}>
                        <FontAwesome5 name="exclamation-circle" size={12} color="#999" style={styles.paddingRight2}/>
                        <StyledText style={styles.alertText}>HIGH PRIORITY</StyledText>
                    </View>}
                    {taskTypeContent}
                    {task.description && <View style={[styles.marginRight4, styles.alignedRow]}>
                        {getIcon('MaterialCommunityIcons','card-text-outline',12,styles.colors.gray2)}
                        <StyledText style={styles.taskTypeText}>INFO</StyledText>
                    </View>}
                    {task.description && <View style={[styles.marginRight4, styles.alignedRow]}>
                        {getIcon('FontAwesome','list-ul',12,styles.colors.gray2)}
                        <StyledText style={styles.taskTypeText}>LIST</StyledText>
                    </View>}
                    {task.comments && <View style={[styles.marginRight4, styles.alignedRow]}>
                        <Octicons name="note" size={12} color="#999"/>
                        <StyledText style={styles.fontSize00}> 3</StyledText>
                    </View>}
                    {task.showScore && <View style={[styles.marginRight4, styles.alignedRow]}>
                        <Entypo name="controller-record" size={12} color="#999"/>
                        <StyledText style={styles.fontSize00}>{task.score}</StyledText>
                    </View>}
                </View>}
                {expanded && expandedContent}
            </View>
        </Pressable>
    </View> )


}