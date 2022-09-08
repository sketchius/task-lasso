import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {getDateInContext,getTime} from './DateContext';

export default function TaskListScreen(props) {
    const capturedTaskList = props.tasks.filter(task => task.type === 'CAPTURED').map(task => {
        return (
            <View style={styles.taskContainer}>
                <View style={styles.iconPlaceholder}></View>
                <Text style={styles.listItem}>{task.title}</Text>
                <View style={styles.padder}></View>
            </View>
        )
    });
    const openTaskList = props.tasks.filter(task => task.type === 'OPEN').map(task => {
        return (
            <View style={styles.taskContainer}>
                <View style={styles.iconPlaceholder}></View>
                <Text style={styles.listItem}>{task.title}</Text>
                <View style={styles.padder}></View>
            </View>
        )
    });
    const assignedTaskList = props.tasks.filter(task => task.type === 'DEADLINE').map(task => {
        return (
            <View style={styles.taskContainer}>
                <View style={styles.iconPlaceholder}></View>
                <Text style={styles.listItem}>{task.title}</Text>
                <View style={styles.padder}></View>
                <View style={styles.dueElement}><Text style={styles.listItem}>by {getDateInContext(task.due,task.useTime)}</Text></View>
            </View>
        )
    });
    const scheduledTaskList = props.tasks.filter(task => task.type === 'SCHEDULED').map(task => {
        return (
            <View style={styles.taskContainer}>
                <View style={styles.iconPlaceholder}></View>
                <Text style={styles.listItem}>{task.title}</Text>
                <View style={styles.padder}></View>
                <View style={styles.dueElement}><Text style={styles.listItem}>on {getDateInContext(task.due,task.useTime)}</Text></View>
            </View>
        )
    });

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