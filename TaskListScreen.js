import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable, Button} from 'react-native';
import {getDateInContext,getTime} from './DateContext';

export default function TaskListScreen(props) {

    const styles = props.styles;

    const filterTaskList = (type, showDate, dateSemantics) => {
        return props.tasks.filter(task => task.type === type).map(task => {
            let dueElement;
    
            if (showDate) {
                dueElement = <View style={[styles.dueElement]}><Text style={[styles.defaultText, styles.fontSize0]}>{dateSemantics} {getDateInContext(task.dueDate,task.useTime)}</Text></View>
            }

            let expandedContent;

            if (task.uniqid === expandedTaskID) {
                expandedContent = 
                <View>
                    <Text style={styles.defaultText}>{task.description}</Text>
                    <Button title='Edit'/>
                </View>
            }
    
            return (
                <Pressable
                    onPress={() => {
                        task.uniqid !== expandedTaskID ? setExpandedTaskID(task.uniqid) : setExpandedTaskID(-1);
                    }}
                >
                    <View style={[styles.margin2, styles.row, styles.alignItems]}>
                        <View style={styles.iconPlaceholder}></View>
                        <Text style={[styles.defaultText,styles.fontSize2]}>{task.title}</Text>
                        <View style={styles.flex1}></View>
                        {dueElement}
                    </View>
                    {expandedContent}
                    
                </Pressable>
            )
        });
    }

    const getTaskListElement = (taskList) => {
        return <View style={styles.marginTop4}>{taskList}</View>
    }

    const getSectionTaskCountElement = (taskList) => {
        return <Text style={[styles.defaultText, styles.circleBorder, styles.taskCountElement]}>{taskList.length}</Text>
    }

    const [expandedTaskID,setExpandedTaskID] = useState(-1);
    const [sectionExpansion,setSectionExpansion] = useState([false,true,false,true]);

    const capturedTaskList = filterTaskList('CAPTURED',false);
    const openTaskList = filterTaskList('OPEN',false);
    const assignedTaskList = filterTaskList('DEADLINE',true,'by');
    const scheduledTaskList = filterTaskList('SCHEDULED',true,'');

    const capturedTaskElement = 
        <Pressable 
            style={[styles.capturedTasksContainer, styles.padding5]}
            onPress={() => {
                const newArray = [...sectionExpansion];
                newArray[0] = !newArray[0];
                setSectionExpansion(newArray);
        }}>
            <View style={[styles.row, styles.alignItems]}><Text style={[styles.defaultText, styles.fontSize3, styles.bold]}>CAPTURED TASKS</Text>{!sectionExpansion[0] && getSectionTaskCountElement(capturedTaskList)}</View>
            {sectionExpansion[0] && getTaskListElement(capturedTaskList)}
        </Pressable>;

    const openTaskElement =
        <Pressable 
            style={[styles.openTasksContainer, styles.padding5]}
            onPress={() => {
                const newArray = [...sectionExpansion];
                newArray[1] = !newArray[1];
                setSectionExpansion(newArray);
        }}>
            <View style={[styles.row, styles.alignItems]}><Text style={[styles.defaultText, styles.fontSize3, styles.bold]}>FLOATING TASKS</Text>{!sectionExpansion[1] && getSectionTaskCountElement(openTaskList)}</View>
            {sectionExpansion[1] && getTaskListElement(openTaskList)}
        </Pressable>;

    const deadlineTaskElement =
        <Pressable 
            style={[styles.assignedTasksContainer, styles.padding5]}
            onPress={() => {
                const newArray = [...sectionExpansion];
                newArray[2] = !newArray[2];
                setSectionExpansion(newArray);
        }}>
            <View style={[styles.row, styles.alignItems]}><Text style={[styles.defaultText, styles.fontSize3, styles.bold]}>DEADLINE TASKS</Text>{!sectionExpansion[2] && getSectionTaskCountElement(assignedTaskList)}</View>
            {sectionExpansion[2] && getTaskListElement(assignedTaskList)}
        </Pressable>;

    const scheduledTaskElement =
         <Pressable 
            style={[styles.scheduledTasksContainer, styles.padding5]}
            onPress={() => {
                const newArray = [...sectionExpansion];
                newArray[3] = !newArray[3];
                setSectionExpansion(newArray);
        }}>
            <View style={[styles.row, styles.alignItems]}><Text style={[styles.defaultText, styles.fontSize3, styles.bold]}>SCHEDULED TASKS</Text>{!sectionExpansion[3] && getSectionTaskCountElement(scheduledTaskList)}</View>
            {sectionExpansion[3] && getTaskListElement(scheduledTaskList)}
        </Pressable>;
    

    return (
        <ScrollView style={styles.scrollContainer}>
            {capturedTaskElement} 
            {openTaskElement} 
            {deadlineTaskElement}
            {scheduledTaskElement}
        </ScrollView>
    )
}