import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, Text, ScrollView} from 'react-native';
import { NavigationContainer, TransitionScreenOptions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskListScreen from './TaskListScreen';
import ToDoScreen from './ToDoScreen';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons'; 
import isToday from 'date-fns/isToday'
import differenceInDays from 'date-fns/differenceInDays'

import { definedStyles } from './Styles';

import { saveData, loadData, saveTasks, loadTasks } from './Data.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskEditorScreen from './TaskEditorScreen';
import DataInspector from './DataInspector';

import { useFonts } from 'expo-font';
import { Logs } from 'expo'

Logs.enableExpoCliLogging()

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
        type: 'SCHEDULED',
        prority: 2,
        uniqid: 1,
        dueDate: new Date(2022, 8, 16),
        iconLibrary: 'AntDesign',
        iconName: 'car'
      },
      {
        title: 'Find the drill',
        description: 'Been looking everywhere for the drill, but I have no idea where it is...',
        type: 'DEADLINE',
        prority: 1,
        uniqid: 2,
        dueDate: new Date(2022, 8, 16, 10, 0, 0),
        iconLibrary: 'FontAwesome',
        iconName: 'search'
      },
      {
        title: 'Call mom',
        description: `She's probably wondering how I'm doing.`,
        type: 'FLEXIBLE',
        dateCreated: new Date(2022, 8, 2, 10, 0, 0),
        uniqid: 3,
        prority: 1,
        iconLibrary: 'Ionicons',
        iconName: 'call'
      },
      {
        title: "Drive to Columbus",
        description: 'Need to:\n1) Go to the doctor\n2)Visit bob\n3)Drop off borrowed books',
        type: 'SCHEDULED',
        prority: 2,
        uniqid: 4,
        dueDate: new Date(2022, 9, 15),
        iconLibrary: 'AntDesign',
        iconName: 'car'
      },
      {
        title: "Lookup that Mexican place",
        type: 'CAPTURED',
        uniqid: 5,
        iconLibrary: 'MaterialCommunityIcons',
        iconName: 'circle-small'
      },
      {
        title: "Text Ralph back",
        type: 'CAPTURED',
        uniqid: 6,
        iconLibrary: 'MaterialCommunityIcons',
        iconName: 'circle-small'
      },
      {
        title: "Do laundry",
        type: 'DEADLINE',
        uniqid: 17,
        prority: 1,
        dueDate: new Date(2022, 8, 17, 10, 0, 0),
        iconLibrary: 'FontAwesome5',
        iconName: 'tshirt'
      },
      {
        title: "Pump up bike tires",
        type: 'FLEXIBLE',
        dateCreated: new Date(2022, 8, 9, 10, 0, 0),
        uniqid: 18,
        prority: 0,
        iconLibrary: 'MaterialIcons',
        iconName: 'pedal-bike'
      },
      {
        title: "Make grocery list",
        type: 'DEADLINE',
        uniqid: 19,
        prority: 1,
        dueDate: new Date(2022, 8, 15, 10, 0, 0),
        iconLibrary: 'FontAwesome5',
        iconName: 'clipboard-list'
      },
      {
        title: "Fix the table",
        description: 'One of the legs is loose',
        type: 'FLEXIBLE',
        dateCreated: new Date(2022, 8, 8, 10, 0, 0),
        uniqid: 20,
        prority: 0,
        iconLibrary: 'MaterialCommunityIcons',
        iconName: 'screwdriver'
      },
      {
        title: "Interview at Data Corp",
        type: 'SCHEDULED',
        uniqid: 21,
        prority: 2,
        dueDate: new Date(2022, 8, 14, 15, 0, 0),
        useTime: true,
        iconLibrary: 'Ionicons',
        iconName: 'people'
      },
      {
        title: "Finish first draft of proposal",
        type: 'DEADLINE',
        uniqid: 22,
        prority: 2,
        dueDate: new Date(2022, 8, 29, 10, 0, 0),
        iconLibrary: 'Ionicons',
        iconName: 'document'
      },
      {
        title: "Find the remote",
        type: 'FLEXIBLE',
        dateCreated: new Date(2022, 8, 13, 10, 0, 0),
        uniqid: 23,
        prority: 2,
        iconLibrary: 'FontAwesome',
        iconName: 'search'
      },
      {
        title: "Call the gas company",
        description: 'Ask about charges',
        type: 'FLEXIBLE',
        dateCreated: new Date(2022, 8, 10, 10, 0, 0),
        uniqid: 24,
        prority: 2,
        iconLibrary: 'Ionicons',
        iconName: 'people'
      }
    ]
);

    useEffect(() => {
        //readTasksFromStorage();
    }, []);


    useEffect(() => {
        assignTasks();
    }, []);

    const assignedValue = useRef(0);

    const assignTasks = () => {
        let assignmentBudget = 90;

        const tasksCopy = [...tasks];

        const assignTask = (task) => {
            task.assigned = true;
            assignedValue.current += 15;
        }

        tasksCopy.forEach( (task => {
            if (!task.assigned && (task.type == 'SCHEDULED' || task.type == 'DEADLINE') && isToday(task.dueDate)) {
                console.log('assigning scheduled task')
                assignTask(task);
            }
        }))

        const remainingTasks = tasksCopy.filter( (task => task.type != 'SCHEDULED'));
        
        console.log(remainingTasks.length + ' tasks');

        const scoreTask = (task) => {
            console.log('scoring task...')
            let baseScore = 1;
            let priorityWeight = 1;
            if (task.priority) (task.prority + 1) / 2;
            console.log(`priorityWeight = ${priorityWeight}`)
            let deadlineWeight = 1;
            if (task.type == 'DEADLINE')
                deadlineWeight = 1 + 7 / Math.pow(differenceInDays(task.dueDate,new Date()),2);
            console.log(`deadlineWeight = ${deadlineWeight}`)
            let flexibleWeight = 1;
            if (task.type == 'FLEXIBLE' && task.dueDate)
                flexibleWeight = 1 + differenceInDays(task.dueDate,new Date()) / 30;
            console.log(`flexibleWeight = ${flexibleWeight}`)

            return baseScore * priorityWeight * deadlineWeight * flexibleWeight;
        }

        while (assignedValue.current < assignmentBudget) {
            let highestScoreTask;
            let highestScore = 0;
            remainingTasks.forEach( (task) => {
                if (!task.assigned) {
                    let taskScore = scoreTask(task);
                    console.log(taskScore)
                    if (taskScore > highestScore) {
                        highestScore = taskScore;
                        highestScoreTask = task;
                    }
                }
            })

            if (highestScoreTask)
                {
                    console.log('assigning task')
                    assignTask(highestScoreTask)
                }
            else
                {
                    console.log('no more tasks')
                    break;
                }
        }

        setTasks(tasksCopy);
    }

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

    const recieveNewTask = (task) => {
        addTask(task);
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

    const options = {    
        headerShown: false,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: styles.darkColor,
        },
        headerTintColor: "#fff",
        tabBarActiveTintColor: styles.darkColor,
        tabBarInactiveTintColor: 'grey',
        tabBarActiveBackgroundColor: '#f7ffca',
        tabBarInactiveBackgroundColor: 'white'
      };

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
                                onSave={addTask}
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


