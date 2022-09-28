import { useState, useEffect } from 'react'
import { Pressable, View, Text, LayoutAnimation } from 'react-native';
import { useSelector } from 'react-redux';

import { Logs } from 'expo'

import TodoItem from "./todo-item";
import getIcon from '../../tools/Icons';
import StyledText from "../../components/StyledText";


Logs.enableExpoCliLogging()

export default function TasklistSection(props) {
    const filteredTaskList = useSelector(state => state.tasks.filter(task => props.type=='COMPLETED' ? task.status == 1 : (task.type === props.type && task.status != 1)));


    const styles = props.styles;

    const [expanded,setExpanded] = useState(true);
    
    const [didMount, setDidMount] = useState(false)

    useEffect(() => { setDidMount(true) }, [])

    const [h,setH] = useState('auto');
    
    const getTaskListItems = () => {
        return filteredTaskList.map( (task, i) => <TodoItem key={task.uniqid} styles={styles} task={task} navigation={props} tasklist={true}/>)
    }

    const getSectionTaskCountElement = () => {
        return <Text style={[styles.defaultText, styles.circleBorder, styles.taskCountElement]}>{filteredTaskList.length} ITEMS</Text>
    }

    useEffect( () => {
        if (filteredTaskList.length == 0) {
            setExpanded(false);
        }
    },[])

    useEffect( () => {
        if (didMount)
            LayoutAnimation.easeInEaseOut()
    },[expanded])

    const expand = () => {
        if (filteredTaskList.length > 0) {
            setExpanded(!expanded)
        }
    }

    const getIconElement = () => {
        switch (props.type) {
            case 'DRAFT':
                return getIcon('Entypo','pencil',20,styles.colors.gray);
            case 'FLEXIBLE':
                return getIcon('FontAwesome','arrows',20,styles.colors.gray);
            case 'DEADLINE':
                return getIcon('FontAwesome','dot-circle-o',20,styles.colors.gray);
            case 'SCHEDULED':
                return getIcon('AntDesign','pushpin',20,styles.colors.gray);
            case 'REPEATING':
                return getIcon('FontAwesome','refresh',20,styles.colors.gray);
        }
    }


    return ( <Pressable 
    style={[styles.notesContainer, styles.paddingVertical4, {height : 'auto'}]}
    onPress={ () => expand()}>
    <View style={[styles.alignedRow, styles.topBorders]}>
        <View style={[ styles.sectionHeaderStyle, styles.alignedRow]}>
            <View style={styles.sectionHeaderIcon}>{getIconElement()}</View>
            <StyledText style={[styles.fontSize3, styles.marginLeft3, styles.sectionHeaderTextStyle, filteredTaskList.length == 0 && styles.gray3Text]}>{props.label}</StyledText>
        </View>
        {!expanded && getSectionTaskCountElement(filteredTaskList)}
        <View style={styles.flex1}></View>
        {filteredTaskList.length > 0 && <View style={styles.caret}>{getIcon('AntDesign',expanded ? 'caretdown' : 'caretleft',16,styles.colors.gray3)}</View>}
    </View>
    <View style={[styles.topBorder, expanded && styles.bottomBorder]}>{expanded && getTaskListItems(filteredTaskList)}</View>
    </Pressable> );

}