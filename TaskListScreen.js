import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable, Button} from 'react-native';
import {getDateInContext,getTime} from './DateContext';

export default function TaskListScreen(props) {

    const filterTaskList = (type, showDate, dateSemantics) => {
        return props.tasks.filter(task => task.type === type).map(task => {
            let dueElement;
    
            if (showDate) {
                dueElement = <View style={styles.dueElement}><Text style={styles.listItem}>{dateSemantics} {getDateInContext(task.dueDate,task.useTime)}</Text></View>
            }

            let expandedContent;

            if (task.uniqid === expandedTaskID) {
                expandedContent = 
                <View>
                    <Text>{task.description}</Text>
                    <Button title='Edit'/>
                </View>
            }
    
            return (
                <Pressable
                    style={styles.taskContainer}
                    onPress={() => {
                        task.uniqid !== expandedTaskID ? setExpandedTaskID(task.uniqid) : setExpandedTaskID(-1);
                    }}
                >
                    <View style={styles.taskContainerHeader}>
                        <View style={styles.iconPlaceholder}></View>
                        <Text style={styles.taskTitle}>{task.title}</Text>
                        <View style={styles.padder}></View>
                        {dueElement}
                    </View>
                    {expandedContent}
                    
                </Pressable>
            )
        });
    }

    const getTaskListElement = (taskList) => {
        return <View style={styles.sectionContent}>{taskList}</View>
    }

    const getSectionTaskCountElement = (taskList) => {
        return <Text style={styles.taskCountElement}>{taskList.length}</Text>
    }

    const [expandedTaskID,setExpandedTaskID] = useState(-1);
    const [sectionExpansion,setSectionExpansion] = useState([false,true,false,true]);

    const capturedTaskList = filterTaskList('CAPTURED',false);
    const openTaskList = filterTaskList('OPEN',false);
    const assignedTaskList = filterTaskList('DEADLINE',true,'by');
    const scheduledTaskList = filterTaskList('SCHEDULED',true,'');

    const capturedTaskElement = 
        <Pressable 
            style={styles.capturedTasksContainer}
            onPress={() => {
                const newArray = [...sectionExpansion];
                newArray[0] = !newArray[0];
                setSectionExpansion(newArray);
        }}>
            <View style={[styles.row, styles.taskTitleBar]}><Text style={styles.sectionHeading}>CAPTURED TASKS</Text>{!sectionExpansion[0] && getSectionTaskCountElement(capturedTaskList)}</View>
            {sectionExpansion[0] && getTaskListElement(capturedTaskList)}
        </Pressable>;

    const openTaskElement =
        <Pressable 
            style={styles.openTasksContainer}
            onPress={() => {
                const newArray = [...sectionExpansion];
                newArray[1] = !newArray[1];
                setSectionExpansion(newArray);
        }}>
            <View style={[styles.row, styles.taskTitleBar]}><Text style={styles.sectionHeading}>FLOATING TASKS</Text>{!sectionExpansion[1] && getSectionTaskCountElement(openTaskList)}</View>
            {sectionExpansion[1] && getTaskListElement(openTaskList)}
        </Pressable>;

    const deadlineTaskElement =
        <Pressable 
            style={styles.assignedTasksContainer}
            onPress={() => {
                const newArray = [...sectionExpansion];
                newArray[2] = !newArray[2];
                setSectionExpansion(newArray);
        }}>
            <View style={[styles.row, styles.taskTitleBar]}><Text style={styles.sectionHeading}>DEADLINE TASKS</Text>{!sectionExpansion[2] && getSectionTaskCountElement(assignedTaskList)}</View>
            {sectionExpansion[2] && getTaskListElement(assignedTaskList)}
        </Pressable>;

    const scheduledTaskElement =
         <Pressable 
            style={styles.scheduledTasksContainer}
            onPress={() => {
                const newArray = [...sectionExpansion];
                newArray[3] = !newArray[3];
                setSectionExpansion(newArray);
        }}>
            <View style={[styles.row, styles.taskTitleBar]}><Text style={styles.sectionHeading}>SCHEDULED TASKS</Text>{!sectionExpansion[3] && getSectionTaskCountElement(scheduledTaskList)}</View>
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




const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    taskTitleBar: {
        alignItems: 'center'
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
        padding: 0
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: '500'
    },
    sectionContent: {
        marginTop: 8
    },
    capturedTasksContainer: {
        backgroundColor: 'white',
        padding: 16
    },
    openTasksContainer: {
        backgroundColor: 'yellow',
        padding: 16
    },
    assignedTasksContainer: {
        backgroundColor: 'pink',
        padding: 16
    },
    scheduledTasksContainer: {
        backgroundColor: 'cyan',
        padding: 16
    },
    taskContainer: {
        flexDirection: 'column'
    },
    taskContainerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 2
    },
    iconPlaceholder: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        width: 15,
        height: 15,
        marginRight: 10
    },
    taskTitle: {
        fontSize: 15
    },
    dueElement: {
        backgroundColor: 'white',
        width: '30%',
        alignItems: 'center',
        borderRadius: 15

    },
    padder: {
        flex: 1
    },
    taskCountElement: {
        marginLeft: 8,
        backgroundColor: '#dfefef',
        color: 'black',
        width: 20,
        height: 20,
        textAlign: 'center',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1
    }
});