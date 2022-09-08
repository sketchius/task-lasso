import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {GrCheckmark} from 'react-icons/gr';
import TaskListScreen from './TaskListScreen';
import ToDoScreen from './ToDoScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
  const [tasks, setTasks] = useState([
      {
        title: 'Go to the store',
        type: 'DEADLINE',
        uniqid: 1,
        due: new Date(2022, 8, 8)
      },
      {
        title: 'Find the drill',
        type: 'OPEN',
        uniqid: 2,
        assigned: true
      },
      {
        title: "Call mom",
        type: 'OPEN',
        uniqid: 3,
        assigned: true
      },
      {
        title: "Drive to Columbus",
        type: 'SCHEDULED',
        uniqid: 4,
        due: new Date(2022, 9, 15)
      },
      {
        title: "Lookup that Mexican place",
        type: 'CAPTURED',
        uniqid: 5
      },
      {
        title: "Text Ralph back",
        type: 'CAPTURED',
        uniqid: 6
      },
      {
        title: "Meeting with publisher",
        type: 'SCHEDULED',
        uniqid: 6,
        due: new Date(2022, 8, 8, 10, 0, 0),
        useTime: true,
        assigned: true
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



  const handleAddTaskButton = (title) => {
    const newTask = { title, uniqid: 4}
    addTask(newTask);
  }

  const handleEditTaskButton = () => {
    const updatedTask = { title: "Feed the dog", uniqid: 2}
    editTask(updatedTask.uniqid, updatedTask);
  }

  const handleDeleteTaskButton = () => {
    deleteTask(1);
  }

  const NavBar = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.safe}>
      <NavigationContainer>
        <NavBar.Navigator>
            <NavBar.Screen name="To Do" options={{
              tabBarLabel: 'Home',
              tabBarIcon: () => (
                <Ionicons name='md-checkmark-circle' size={32} color='green' />
              )
            }}>
              {() => <ToDoScreen tasks={tasks} />}
            </NavBar.Screen>
            <NavBar.Screen name="Tasks">
              {() => <TaskListScreen tasks={tasks} />}
            </NavBar.Screen>


        </NavBar.Navigator>
      </NavigationContainer>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: { 
    flex: 1,
    width: "100%"
  },
  test: {
    height:'auto',
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
