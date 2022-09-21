import { useState, useEffect } from 'react'
import { Pressable, View, Text, LayoutAnimation } from 'react-native';
import { useSelector } from 'react-redux';

import { Logs } from 'expo'

import TasklistItem from "./tasklist-item";
import TodoItem from "./../home-screen/todo-item";
import getIcon from '../../tools/Icons';


Logs.enableExpoCliLogging()

export default function TasklistSection(props) {
    const filteredTaskList = useSelector(state => state.tasks.filter(task => task.type === props.type));


    const styles = props.styles;

    const [expanded,setExpanded] = useState(true);
    
    const [didMount, setDidMount] = useState(false)

    useEffect(() => { setDidMount(true) }, [])

    const [h,setH] = useState('auto');
    
    const getTaskListItems = () => {
        return filteredTaskList.map( (task, i) => <TodoItem key={i} styles={styles} task={task} navigation={props} compact={true}/>)
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


    return ( <Pressable 
    style={[styles.notesContainer, styles.paddingVertical4, {height : 'auto'}]}
    onPress={ () => expand()}>
    <View style={[styles.alignedRow, styles.topBorder]}>
        <Text style={[styles.defaultText, styles.taskListSectionHeader, styles.fontSize3, styles.marginLeft4, styles.bold, props.color,filteredTaskList.length == 0 && styles.gray3Text]}>{props.label}</Text>
        {!expanded && getSectionTaskCountElement(filteredTaskList)}
        <View style={styles.flex1}></View>
        {filteredTaskList.length > 0 && <View style={styles.caret}>{getIcon('AntDesign',expanded ? 'caretdown' : 'caretleft',16,styles.colors.gray3)}</View>}
    </View>
    <View style={[styles.topBorder, expanded && styles.bottomBorder]}>{expanded && getTaskListItems(filteredTaskList)}</View>
    </Pressable> );

}