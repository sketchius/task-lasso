import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StatusBar, Button } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import uuid from 'react-native-uuid';
import TaskListScreen from './TaskListScreen';
import ToDoScreen from './ToDoScreen';
import isBefore from 'date-fns/isBefore'

import { styles } from './Styles';

import { saveData, loadData, saveTasks, loadTasks } from './Data.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskEditorScreen from './TaskEditorScreen';
import DataInspector from './DataInspector';

async function getData() {
    let data = await loadTasks();
    alert(data);
    return data;
}

export default function App() {
    const [tasks, setTasks] = useState([
      {
        title: 'Go to the store',
        description: 'We definitely need eggs, bread, and toothpaste',
        type: 'DEADLINE',
        uniqid: 1,
        due: new Date(2022, 8, 8)
      },
      {
        title: 'Find the drill',
        description: 'Been looking everywhere for the drill, but I have no idea where it is...',
        type: 'OPEN',
        uniqid: 2,
        assigned: true
      },
      {
        title: 'Call mom',
        description: `She's probably wondering who I'm doing.`,
        type: 'OPEN',
        uniqid: 3,
        assigned: true
      },
      {
        title: "Drive to Columbus",
        description: 'Need to:\n1) Go to the doctor\n2)Visit bob\n3)Drop off borrowed books',
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
        description: 'Address is:\n4123 21st Ave\nYallville, OH 44221',
        type: 'SCHEDULED',
        uniqid: 7,
        due: new Date(2022, 8, 8, 10, 0, 0),
        useTime: true,
        assigned: true
      }
    ]
);

    useEffect(() => {
        //readTasksFromStorage();
    }, []);

    const readTasksFromStorage = async () => {
        try {
            let d = await AsyncStorage.getItem('@taskArray');
            let e = JSON.parse(d);
            e.forEach((task) => {
                if (task.dueDate)
                    task.dueDate = new Date(task.dueDate);
                if (task.dateCreated)
                    task.dateCreated = new Date(task.dateCreated);
                else task.dateCreated = new Date();
                if (task.dateModified)
                    task.dateModified = new Date(task.dateModified);
                if (!task.type) task.type = 'CAPTURED';
            });
            setTasks(e);
        } catch (error) {
            alert(error);
        }
    };

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

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
    };

    const deleteTask = (uniqid) => {
        const newTasks = tasks.filter((task) => task.uniqid !== uniqid);
        setTasks(newTasks);
    };

    const handleAddTaskButton = (title) => {
        const newTask = {
            title,
            uniqid: uuid.v4(),
            type: 'CAPTURED',
            dateCreated: new Date(),
        };
        addTask(newTask);
    };

    const handleEditTaskButton = (title) => {
        const updatedTask = { title, uniqid: 2 };
        editTask(updatedTask.uniqid, updatedTask);
    };

    const handleDeleteTaskButton = () => {
        deleteTask(1);
    };

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const NavBar = createBottomTabNavigator();

    return (
        <SafeAreaView style={styles.safe}>
            <NavigationContainer>
                <NavBar.Navigator>
                    <NavBar.Screen name="To Do">
                        {() => <ToDoScreen styles={styles} tasks={tasks} />}
                    </NavBar.Screen>
                    <NavBar.Screen name="New">
                        {() => (
                            <TaskEditorScreen
                                tasks={tasks}
                                handleCapture={handleAddTaskButton}
                            />
                        )}
                    </NavBar.Screen>
                    <NavBar.Screen name="Tasks">
                        {() => <TaskListScreen styles={styles} tasks={tasks} />}
                    </NavBar.Screen>
                    <NavBar.Screen name="Data">
                        {() => <DataInspector styles={styles} tasks={tasks} />}
                    </NavBar.Screen>
                </NavBar.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}
