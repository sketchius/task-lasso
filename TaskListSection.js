import { useSelector } from 'react-redux';
import TaskListItem from "./TaskListItem";
import { Pressable, View, Text } from 'react-native';
import { useState } from 'react'


import { Logs } from 'expo'

Logs.enableExpoCliLogging()

export default function TaskListSection(props) {
    const filteredTaskList = useSelector(state => state.tasks.filter(task => task.type === props.type));

    const styles = props.styles;

    const [expanded,setExpanded] = useState(true);
    

    const getTaskListItems = () => {
        return filteredTaskList.map(task => <TaskListItem styles={styles} task={task} showDate={props.showDate} expanded={task.uniqid == props.expandedId}/>)
    }

    const getSectionTaskCountElement = () => {
        return <Text style={[styles.defaultText, styles.circleBorder, styles.taskCountElement]}>{filteredTaskList.length}</Text>
    }

    return ( <Pressable 
    style={[styles.capturedTasksContainer, styles.paddingVertical4]}
    onPress={ () => setExpanded(!expanded)}>
    <View style={[styles.row, styles.alignItems]}><Text style={[styles.defaultText, styles.taskListSectionHeader, styles.fontSize3, styles.marginRight4, styles.paddingLeft5, styles.bold]}>{props.type} TASKS</Text>{!expanded && getSectionTaskCountElement(filteredTaskList)}
        <View style={styles.horizontalLine}/>
    </View>
    {expanded && getTaskListItems(filteredTaskList)}
    </Pressable> );

}