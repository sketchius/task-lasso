import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, DeviceEventEmitter, NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons'; 
import * as Font from 'expo-font';
import { saveTasks, loadTasks } from './Data'
import { Logs } from 'expo';

import isToday from 'date-fns/isToday'
import differenceInDays from 'date-fns/differenceInDays'

import Home from './screens/home-screen/home';
import TaskEditor from './screens/edit-screen/edit';
import DataInspector from './DataInspector';
import store from './redux/store';

import { styles } from './styles/styles';
import Main from './Main'
import TaskScreen from './screens/task-screen/task-screen';
import { useFonts } from 'expo-font/build';
import { createStackNavigator } from '@react-navigation/stack';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);



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
        'RobotoLight': require('./assets/fonts/RobotoLight.ttf'),
        'RobotoRegular': require('./assets/fonts/RobotoRegular.ttf'),
        'RobotoMedium': require('./assets/fonts/RobotoMedium.ttf'),
        'RobotoBold': require('./assets/fonts/RobotoBold.ttf'),
        'TitilliumWebRegular': require('./assets/fonts/TitilliumWebRegular.ttf'),
        'TitilliumWebSemibold': require('./assets/fonts/TitilliumWebSemiBold.ttf'),
        'TitilliumWebBold': require('./assets/fonts/TitilliumWebBold.ttf'),
    });

    

    const state = useSelector(state => state);

    const tasks = state.tasks;

    useEffect(() => {
        console.log(`READING TASKS FROM STORAGE`)
        readTasksFromStorage();
        
        //setTasksLoaded(true);
    }, []);

    useEffect( () => {
        dispatch({type:'day/dayStateChanged',payload: 'CHECK-IN'} )
    },[])

    useEffect(() => {
       console.log(`TASK STATE UPDATE DETECTED... SAVING TASKS TO STORAGE`)
       saveTasks(tasks);
    }, [tasks]);

    /*useEffect(() => {
        assignTasks();
    }, []);*/


    const assignedValue = useRef(0);

    const assignTasks = (designation,ambition) => {
        console.log('Starting assignTasks()')
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
        console.log(`Budget = ${assignmentBudget} minutes`)
        console.log(`Assigned Time = ${assignedValue.current} minutes`)
        
        const assignTask = (task) => {  
            console.log(`assigning '${task.title}`)
            assignedValue.current += task.duration;
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

        console.log(`tasks variable contains ${tasks.length} items`)


        tasks
        .filter( (task => {return (task.type == 'SCHEDULED' || task.type == 'DEADLINE') && isToday(task.dateDue)}))
        .forEach( (task => {
            scoreTask(task);
            assignTask(task);
        }))



        

        while (assignedValue.current < assignmentBudget) {
            let highestScoreTask;
            let highestScore = 0;

            const updatedTasks = store.getState().tasks;

            console.log(`Getting store.tasks. updatedTasks = variable contains ${updatedTasks.length} items`)

            updatedTasks
            .filter( (task => task.type != 'SCHEDULED' && task.type != 'DRAFT'))
            .forEach( (task) => {            
                console.log(`Checking task ${task.title}`)
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
            
            console.log(`   ${parsedData.length} items read from storage`)
            parsedData.forEach((task) => {
                if (task.dateDue)
                    task.dateDue = new Date(task.dateDue);
                if (task.dateCreated)
                    task.dateCreated = new Date(task.dateCreated);
                else task.dateCreated = new Date();
                if (task.dateModified)
                    task.dateModified = new Date(task.dateModified);
                if (!task.type) task.type = 'DRAFT';
                if (task.type == 'CAPTURED') {
                    task.type = 'NOTE';
                    task.iconLibrary = 'MaterialCommunityIcons';
                    task.iconName = 'note-outline';
                }
                //if (task.checklist) task.checklist = undefined;
                task.checkboxStyle = 0;
            });
            
            console.log(`   dispatching storage/loadData`)
            dispatch({ type: 'storage/loadedData', payload: parsedData })
            setTasksLoaded(true);
            
            console.log(`   tasksLoaded = true`)
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
    const Stack = createStackNavigator();

    useEffect( () => {
        DeviceEventEmitter.addListener("event.taskEvent", eventData => handleTaskEvent(eventData));
        DeviceEventEmitter.addListener("event.dayEvent", eventData => handleDayEvent(eventData));
    },[])
    const handleTaskEvent = (eventData) => {
        switch (eventData.event) {
            case 'setStatus':
                dispatch({type:'task/taskStatusChanged',uniqid: eventData.uniqid, payload: eventData.newState} )
                break;
            case 'newTask':
                dispatch({type:'task/taskCreated',payload: eventData.task} )
                break;
            case 'updateTask':                
                dispatch({type:'task/taskUpdated',uniqid: eventData.uniqid, payload: eventData.task} )
                console.log(`UPDATE FINISHED`)
                break;
        }
    }

    const handleDayEvent = (eventData) => {
        console.log(`handleDayEvent() eventData = ${JSON.stringify(eventData)}`)
        switch (eventData.event) {
            case 'assignTasks':
                console.log(`case assignTasks:`)
                assignTasks(eventData.designation,eventData.ambition)
                dispatch({type:'day/dayStateChanged',payload: 'ASSIGNED'} )
                break;

        }
    }

    const options = {    
        headerShown: false,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: styles.colors.gray,
        },
        headerTintColor: "#fff",
        tabBarActiveTintColor: styles.colors.gray,
        tabBarInactiveTintColor: styles.colors.gray2,
        tabBarActiveBackgroundColor: styles.blue3,
        tabBarInactiveBackgroundColor: 'white'
    };

    return (
            tasksLoaded && fontsLoaded ?
            <SafeAreaView style={[styles.safe]}>
                <NavigationContainer screenOptions={{headerShown:false}}>
                    <Stack.Navigator>
                        <Stack.Screen name='Main' component={Main} options={{headerShown: false}}/>
                        <Stack.Screen name='Editor' component={TaskEditor} options={{headerShown: false}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView> : <View></View>
    );
}


