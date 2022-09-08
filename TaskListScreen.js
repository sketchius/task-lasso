import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable, Button} from 'react-native';
import {getDateInContext,getTime} from './DateContext';

export default function TaskListScreen(props) {

    const filterTaskList = (type, showDate, dateSemantics) => {
        return props.tasks.filter(task => task.type === type).map(task => {
            let dueElement;
    
            if (showDate) {
                dueElement = <View style={styles.dueElement}><Text style={styles.listItem}>{dateSemantics} {getDateInContext(task.due,task.useTime)}</Text></View>
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
                        <Text style={styles.listItem}>{task.title}</Text>
                        <View style={styles.padder}></View>
                        {dueElement}
                    </View>
                    {expandedContent}
                    
                </Pressable>
            )
        });
    }

    const [expandedTaskID,setExpandedTaskID] = useState(-1);

    const capturedTaskList = filterTaskList('CAPTURED',false);
    const openTaskList = filterTaskList('OPEN',false);
    const assignedTaskList = filterTaskList('DEADLINE',true,'by');
    const scheduledTaskList = filterTaskList('SCHEDULED',true,'on');

    const capturedTaskElement = <View style={styles.capturedTasksContainer}><Text>CAPTURED TASKS</Text>{capturedTaskList}</View>;

    const openTaskElement = <View style={styles.openTasksContainer}><Text>FLOATING TASKS</Text>{openTaskList}</View>;

    const deadlineTaskElement = <View style={styles.assignedTasksContainer}><Text>DEADLINE TASKS</Text>{assignedTaskList}</View>;

    const scheduledTaskElement = <View style={styles.scheduledTasksContainer}><Text>SCHEDULED TASKS</Text>{scheduledTaskList}</View>;
    

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
    scrollContainer: {
        flex: 1,
        width: '100%',
        padding: 10
    },
    capturedTasksContainer: {
        backgroundColor: 'white',
        padding: 8
    },
    openTasksContainer: {
        backgroundColor: 'yellow',
        padding: 8
    },
    assignedTasksContainer: {
        backgroundColor: 'pink',
        padding: 8
    },
    scheduledTasksContainer: {
        backgroundColor: 'cyan',
        padding: 8
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
    dueElement: {
        backgroundColor: 'white',
        width: '30%',
        alignItems: 'center',
        borderRadius: 15

    },
    padder: {
        flex: 1
    }
});