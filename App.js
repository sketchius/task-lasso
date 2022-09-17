import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, DeviceEventEmitter } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons'; 
import { useFonts } from 'expo-font';
import { saveTasks, loadTasks } from './Data'
import { Logs } from 'expo';

import isToday from 'date-fns/isToday'
import differenceInDays from 'date-fns/differenceInDays'

import Tasklist from './screens/task-screen/tasklist';
import Home from './screens/home-screen/home';
import TaskEditor from './screens/edit-screen/edit';
import DataInspector from './DataInspector';
import store from './redux/store';

import { definedStyles } from './Styles';




Logs.enableExpoCliLogging()

async function getData() {
    let data = await loadTasks();
    alert(data);
    return data;
}

export default function App() {

    const dispatch = useDispatch()

    
    const [tasksLoaded,setTasksLoaded] = useState(false);

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

    const state = useSelector(state => state);

    const tasks = state.tasks;

    useEffect(() => {
        readTasksFromStorage();
    }, []);

    //useEffect(() => {
    //    saveTasks(tasks);
    //}, [tasks]);

    /*useEffect(() => {
        assignTasks();
    }, []);*/

    const [status,setStatus] = useState('CHECK-IN');

    const assignedValue = useRef(0);

    const assignTasks = (designation,ambition) => {
        console.log(`assignTasks() designation = ${designation}, ambition = ${ambition}`)

        dispatch({type:'tasks/UnassignedAll'})

        let assignmentBudget = 0;

        switch (designation) {
            case 0:
                assignmentBudget = 60;
                break;
            case 1:
                assignmentBudget = 150;
                break;
            case 2:
                assignmentBudget = 240;
                break;
        }

        switch (ambition) {
            case 0:
                assignmentBudget = assignmentBudget * 0.75;
                break;
            case 1:
                assignmentBudget = assignmentBudget * 1;
                break;
            case 2:
                assignmentBudget = assignmentBudget * 1.25;
                break;
        }

        const assignTask = (task) => {  
            assignedValue.current += task.duration;
            console.log(`[${assignedValue.current}/${assignmentBudget}] assigning task "${task.title}" Assigned state is '${task.assigned}'`)
            dispatch({type:'task/taskAssigned', payload: task.uniqid})
        }

        const scoreTask = (task) => {
            let baseScore = 1;

            if (task.type == 'SCHEDULED')
            baseScore = 20;

            let priorityWeight = 1;
            if (task.priority)
                priorityWeight = (task.priority + 1) / 2;

            let deadlineWeight = 1;
            if (task.type == 'DEADLINE')
                deadlineWeight = 1 + 7 / Math.pow(differenceInDays(task.dateDue,new Date().setHours(0,0,0,0)),2);

            let flexibleWeight = 1;
            if (task.type == 'FLEXIBLE' && task.dateCreated)
                flexibleWeight = 1 + differenceInDays(new Date().setHours(0,0,0,0),task.dateCreated) / 30;

            let durationWeight = 1;
            if (task.duration)
                durationWeight = 1 - (task.duration / 100);

            const score = ( baseScore * priorityWeight * deadlineWeight * flexibleWeight * durationWeight);
            dispatch({type:'task/taskScored', uniqid: task.uniqid, payload: score})
            return score;
        }

        tasks
        .filter( (task => (task.type == 'SCHEDULED' || task.type == 'DEADLINE') && isToday(task.dateDue)))
        .forEach( (task => {
            scoreTask(task);
            assignTask(task);
        }))



        

        while (assignedValue.current < assignmentBudget) {
            let highestScoreTask;
            let highestScore = 0;

            const updatedTaskes = store.getState().tasks;

            updatedTaskes
            .filter( (task => task.type != 'SCHEDULED' && task.type != 'CAPTURED'))
            .forEach( (task) => {
                if (!task.assigned) {
                    let taskScore = scoreTask(task);
                    if (taskScore > highestScore) {
                        highestScore = taskScore;
                        highestScoreTask = task;
                    }
                }
            })

            if (highestScoreTask)
                assignTask(highestScoreTask)
            else
                break;
                
        }
        
        setStatus('ASSIGNED');

    }


    const endDay = () => {    
        const tasksCopy = tasks.filter( (task => task.status != 2 ))
        
        tasksCopy.forEach( (task) => {
            task.assigned = false;
        })

        assignedValue.current = 0;
        
        setTasks(tasksCopy);
        setStatus('CHECK-IN');
    }

    const readTasksFromStorage = async () => {
        try {
            let rawData = await AsyncStorage.getItem('@taskArray');
            let parsedData = JSON.parse(rawData);
            parsedData.forEach((task) => {
                if (task.dateDue)
                    task.dateDue = new Date(task.dateDue);
                if (task.dateCreated)
                    task.dateCreated = new Date(task.dateCreated);
                else task.dateCreated = new Date();
                if (task.dateModified)
                    task.dateModified = new Date(task.dateModified);
                if (!task.type) task.type = 'CAPTURED';
            });
            dispatch({ type: 'storage/loadedData', payload: parsedData })
            setTasksLoaded(true);
            console.log(`parsed data\n\n${parsedData}`)
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


    const NavBar = createBottomTabNavigator();

    useEffect( () => {
        DeviceEventEmitter.addListener("event.taskEvent", eventData => handleTaskEvent(eventData));
        DeviceEventEmitter.addListener("event.dayEvent", eventData => handleDayEvent(eventData));
    },[])
    const handleTaskEvent = (eventData) => {
        switch (eventData.event) {
            case 'setStatus':
                editTaskProperty(eventData.uniqid,'status',eventData.value);
                break;
        }
    }

    const handleDayEvent = (eventData) => {
        console.log(`handeTastEvent`);
        switch (eventData.event) {
            case 'assignTasks':
                assignTasks(eventData.designation,eventData.ambition)
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
            tasksLoaded ?
            <SafeAreaView style={styles.safe}>
                <NavigationContainer>
                    <NavBar.Navigator screenOptions={options}>
                        <NavBar.Screen name="Home"
                            component={Home}
                            options={{
                                title: (new Date()).toDateString(),
                                tabBarLabel: 'Home',
                                tabBarIcon: ({focused,color,size}) => {
                                    return <Ionicons name="md-home-outline" size={size} color={color} />
                                }
                            }}/>
                        <NavBar.Screen name="Tasks" 
                            component= {Tasklist}
                            options={{
                                title: 'Tasks',
                                tabBarLabel: 'Tasks',
                                tabBarIcon: ({focused,color,size}) => {
                                    return <FontAwesome name="list-ul" size={size} color={color} />
                                }
                            }}/>
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
                                <TaskEditor
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
            </SafeAreaView> : <View></View>
    );
}


