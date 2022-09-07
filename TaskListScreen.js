import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

export default function TaskListScreen(props) {
    const taskList = props.tasks.map(task => {
        return <Text style={styles.listItem}>{task.uniqid}: {task.title}</Text>
      });

    return (
        <ScrollView style={styles.container}>
            {taskList}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    }
});