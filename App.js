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
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        readTasksFromStorage();
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
