import React, { useState } from 'react';
import { StyleSheet, Button, Text, SafeAreaView, View, ScrollView, StatusBar } from 'react-native';
import NavBar from './NavBar';

export default function App() {
  const [tasks, setTasks] = useState([
      {
        title: 'Go to the store',
        uniqid: 1
      },
      {
        title: 'Feed the cat',
        uniqid: 2
      },
      {
        title: "Call mom",
        uniqid: 3
      }
    ]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  }

  const editTask = (uniqid, updatedTask) => {
    let index;

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.uniqid === uniqid) {
        index = i;
      }
    }

    if (index) {
      const newTasks = [...tasks];
      newTasks[index] = updatedTask;
      setTasks(newTasks);
    }
  }

  const deleteTask = (uniqid) => {
    const newTasks = tasks.filter((task) => task.uniqid !== uniqid);
    setTasks(newTasks);
  }



  const handleAddTaskButton = () => {
    const newTask = { title: "Do the dishes", uniqid: 4}
    addTask(newTask);
  }

  const handleEditTaskButton = () => {
    const updatedTask = { title: "Feed the dog", uniqid: 2}
    editTask(updatedTask.uniqid, updatedTask);
  }

  const handleDeleteTaskButton = () => {
    deleteTask(1);
  }

  const taskList = tasks.map(task => {
    return <Text style={styles.listItem}>{task.title}</Text>
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.container}>
          {taskList}
        </ScrollView>
      </View>

 

      <NavBar></NavBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: 'pink'
  },
  safe: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1
  },
  listItem: {
    padding: 30
  },
  button: {
    width: "20%",
    margin: 10
  }

});
