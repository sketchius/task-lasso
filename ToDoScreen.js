import React, {useState} from 'react'
import {StyleSheet, Text, View, ScrollView} from 'react-native'

export default function ToDoScreen(props) {
    

    const taskList = props.tasks.filter(task => task.assigned).map(task => {
        return <View style={styles.toDoItem}>
            <View style={styles.checkBox}></View>
            <Text style={styles.listItem}>{task.title}</Text>
        </View>
      });


      return (
        <ScrollView style={styles.container}>
            {taskList}
        </ScrollView>
      )

}

const styles = StyleSheet.create({
    checkBox: {
        margin: 5,
        padding: 8,
        borderColor: "black",
        borderWidth: 1
    },
    toDoItem: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})