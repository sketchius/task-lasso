import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text} from 'react-native';
import { NavigationContainer, TransitionScreenOptions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskListScreen from './TaskListScreen';
import ToDoScreen from './ToDoScreen';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons'; 

import { definedStyles } from './Styles';

import { saveData, loadData, saveTasks, loadTasks } from './Data.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskEditorScreen from './TaskEditorScreen';
import DataInspector from './DataInspector';

import { useFonts } from 'expo-font';


async function getData() {
    let data = await loadTasks();
    alert(data);
    return data;
}

export default function App() {

    const [fontsLoaded] = useFonts({
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'TitilliumWeb-Regular': require('./assets/fonts/TitilliumWeb-Regular.ttf'),
        'TitilliumWeb-Semibold': require('./assets/fonts/TitilliumWeb-SemiBold.ttf'),
        'TitilliumWeb-Bold': require('./assets/fonts/TitilliumWeb-Bold.ttf'),
      });

    const styles = definedStyles;


    const [tasks, setTasks] = useState([
      {
        title: 'Go to the store',
        description: 'We definitely need eggs, bread, and toothpaste',
        type: 'DEADLINE',
        uniqid: 1,
        dueDate: new Date(2022, 8, 8),
        iconLibrary: 'AntDesign',
        iconName: 'car'
      },
      {
        title: 'Find the drill',
        description: 'Been looking everywhere for the drill, but I have no idea where it is...',
        type: 'DEADLINE',
        uniqid: 2,
        dueDate: new Date(2022, 8, 11, 10, 0, 0),
        assigned: true,
        iconLibrary: 'FontAwesome',
        iconName: 'search'
      },
      {
        title: 'Call mom',
        description: `She's probably wondering how I'm doing.`,
        type: 'OPEN',
        uniqid: 3,
        prority: 2,
        assigned: true,
        iconLibrary: 'Ionicons',
        iconName: 'call'
      },
      {
        title: "Drive to Columbus",
        description: 'Need to:\n1) Go to the doctor\n2)Visit bob\n3)Drop off borrowed books',
        type: 'SCHEDULED',
        uniqid: 4,
        dueDate: new Date(2022, 9, 15),
        iconLibrary: 'AntDesign',
        iconName: 'car'
      },
      {
        title: "Lookup that Mexican place",
        type: 'CAPTURED',
        uniqid: 5,
        iconLibrary: 'AntDesign',
        iconName: 'car'
      },
      {
        title: "Text Ralph back",
        type: 'CAPTURED',
        uniqid: 6,
        iconLibrary: 'AntDesign',
        iconName: 'car'
      },
      {
        title: "Meeting with publisher",
        description: 'Address is:\n4123 21st Ave\nYallville, OH 44221',
        type: 'SCHEDULED',
        uniqid: 7,
        prority: 2,
        dueDate: new Date(2022, 8, 11, 10, 0, 0),
        useTime: true,
        assigned: true,
        iconLibrary: 'Ionicons',
        iconName: 'people'
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

    const editTaskProperty = (uniqid, property, value) => {
        let index;

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            if (task.uniqid === uniqid) {
                index = i;
            }
        }

        if (index) {
            const newTasks = [...tasks];
            newTasks[index][property] = value;
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

    const handleTaskEvent = (eventData) => {
        switch (eventData.event) {
            case 'setStatus':
                editTaskProperty(eventData.uniqid,'status',eventData.value);
                break;
        }
    }

    return (
        <SafeAreaView style={styles.safe}>
            <NavigationContainer>
                <NavBar.Navigator screenOptions={options}>
                    <NavBar.Screen name="Home" 
                        options={{
                            title: (new Date()).toDateString(),
                            tabBarLabel: 'Home',
                            tabBarIcon: ({focused,color,size}) => {
                                return <Ionicons name="md-home-outline" size={size} color={color} />
                            }
                        }}>
                        {() => <ToDoScreen styles={styles} tasks={tasks} onTaskEvent={handleTaskEvent}/>}
                    </NavBar.Screen>
                    <NavBar.Screen name="Tasks" 
                        options={{
                            title: 'Tasks',
                            tabBarLabel: 'Tasks',
                            tabBarIcon: ({focused,color,size}) => {
                                return <FontAwesome name="list-ul" size={size} color={color} />
                            }
                        }}>
                        {() => <TaskListScreen styles={styles} tasks={tasks} />}
                    </NavBar.Screen>
                    <NavBar.Screen name="Capture" 
                        options={{
                            tabBarLabel: ({ focused, tintColor }) => { return null},
                            tabBarActiveBackgroundColor: 'white',
                            tabBarInactiveBackgroundColor: 'white',
                            tabBarIcon: ({focused,color,size}) => {
                                return <View><AntDesign name="pluscircle" size={50} color={color}/><View style={styles.height5}></View></View>
                            }
                        }}>
                        {() => (
                            <TaskEditorScreen
                                tasks={tasks}
                                styles={styles}
                                handleCapture={handleAddTaskButton}
                            />
                        )}
                    </NavBar.Screen>
                    <NavBar.Screen name="Planner">
                        {() => <DataInspector styles={styles} tasks={tasks} />}
                    </NavBar.Screen>
                    <NavBar.Screen name="Data">
                        {() => <DataInspector styles={styles} tasks={tasks} />}
                    </NavBar.Screen>
                </NavBar.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}


const options = {
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: "#000",
    },
    headerTintColor: "#fff",
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'grey',
    tabBarActiveBackgroundColor: '#f7ffca',
    tabBarInactiveBackgroundColor: 'white'
  };