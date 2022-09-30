import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    View,
    DeviceEventEmitter,
    NativeModules,
    AppState,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, shallowEqual } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { saveTasksToLocal, saveStatusToLocal, saveLastUpdateDate, loadTasks, printKeys } from './redux/local-storage';
import { Logs } from 'expo';

import isToday from 'date-fns/isToday';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

import TaskEditor from './screens/edit-screen/edit';
import store from './redux/store';

import { styles } from './styles/styles';
import Main from './Main';
import { useFonts } from 'expo-font/build';
import { createStackNavigator } from '@react-navigation/stack';
import { newTask, setAppProperty, setTaskProperty, setTaskPropertyAll, setRamProperty, loadAppDataFromLocal, loadTaskDataFromLocal } from './redux/data';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

Logs.enableExpoCliLogging();

async function getData() {
    let data = await loadTasks();
    alert(data);
    return data;
}

export default function App() {

    const [fontsLoaded] = useFonts({
        RobotoLight: require('./assets/fonts/RobotoLight.ttf'),
        RobotoRegular: require('./assets/fonts/RobotoRegular.ttf'),
        RobotoMedium: require('./assets/fonts/RobotoMedium.ttf'),
        RobotoBold: require('./assets/fonts/RobotoBold.ttf'),
        TitilliumWebRegular: require('./assets/fonts/TitilliumWebRegular.ttf'),
        TitilliumWebSemibold: require('./assets/fonts/TitilliumWebSemiBold.ttf'),
        TitilliumWebBold: require('./assets/fonts/TitilliumWebBold.ttf'),
    });

    const tasks = useSelector((state) => state.tasks);
    const status = useSelector((state) => state.app.status);
    const dataLoaded = useSelector((state) => state.ram.localStorageLoaded);
    const lastUpdateDate = useSelector((state) => state.app.lastUpdateDate);

    useEffect(() => {
        if (!dataLoaded) loadDataFromStorage();
    }, []);


    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (newAppState) => {
                if ( appState.current.match(/inactive|background/) && newAppState === 'active' && store.getState().ram.localStorageLoaded ) {
                    checkForEndOfDay()
                }

                appState.current = newAppState;
                setAppStateVisible(appState.current);
            }
        );

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            checkForEndOfDay();
        }, 60000);
        return () => clearInterval(interval);
      }, []);

    const checkForEndOfDay = () => {
        if (store.getState().app.status == 'ASSIGNED') {//} && !isToday(lastUpdateDate)) {
            endDay()
        }
        let newDate = new Date();
        setAppProperty('lastUpdateDate', newDate);
        //saveLastUpdateDate(newDate);
    }



    const endDay = () => {
        let completedTasks = 0;
        let deferredTasks = 0;
        let missedTasks = 0;
        console.log(`End day: task count = ${store.getState().tasks.filter( task => task.assigned ).length}`)
        store.getState().tasks.filter( task => task.assigned )
        .forEach( task => {
            switch (task.status) {
                case 1: // Complete
                    if (task.status == 1) {
                        completedTasks++;
                    }
                    break;
                case 0:
                case 0.5:
                case 2: // Deferred
                    if (task.type == 'FLEXIBLE' || (task.type == 'DEADLINE' && task.dateDue && differenceInCalendarDays(task.dateDue,lastUpdateDate) > 0)){
                        deferredTasks++;
                        setTaskProperty(task,'deferments',(task.deferments || 0) + 1);
                        if (status == 2) {
                            setTaskProperty(task,'status',0);
                        }
                    } else {
                        missedTasks++;
                        setTaskProperty(task,'status',4);
                    }
                    break;
            }
        })

        console.log(`completedTasks = ${completedTasks}`)
        console.log(`deferredTasks = ${deferredTasks}`)
        console.log(`missedTasks = ${missedTasks}`)
        
        
        setAppProperty('summaryCompletedTasks',completedTasks);
        setAppProperty('summaryDeferredTasks',deferredTasks);
        setAppProperty('summaryMissedTasks',missedTasks);


        let lastUpdate = store.getState().lastUpdateDate  
        setAppProperty('summaryDate',lastUpdate);

        console.log('ending day')
        setAppProperty('assignedValue',0)

        setTaskPropertyAll('assigned',false);
        setAppProperty('status','CHECK-IN');
    };

    const loadDataFromStorage = () => {
        console.log(`App.js -> loadAppDataFromLocal()`)
        loadAppDataFromLocal()
        loadTaskDataFromLocal()
        setRamProperty('localStorageLoaded',true)
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

    useEffect(() => {
        const taskEventListener = DeviceEventEmitter.addListener(
            'event.taskEvent',
            (eventData) => handleTaskEvent(eventData)
        );
        const dayEventListener = DeviceEventEmitter.addListener(
            'event.dayEvent',
            (eventData) => handleDayEvent(eventData)
        );
        return () => {
            taskEventListener.remove();
            dayEventListener.remove();
        };
    }, []);

    const handleTaskEvent = (eventData) => {
        switch (eventData.event) {
            case 'setStatus':
                // dispatch({
                //     type: 'task/taskPropertyChanged',
                //     property: 'status',
                //     uniqid: eventData.uniqid,
                //     payload: eventData.newState,
                // });
                // setTaskProperty(task,'status',eventData.newState);
                break;
            case 'newTask':
                //dispatch({ type: 'task/taskCreated', payload: eventData.task });
                newTask(eventData.task);
                break;
            case 'updateTask':
                // dispatch({
                //     type: 'task/taskUpdated',
                //     uniqid: eventData.uniqid,
                //     payload: eventData.task,
                // });
                updatedTask(eventData.task);
                break;
        }
    };

    // const handleDayEvent = (eventData) => {
    //     switch (eventData.event) {
    //         case 'assignTasks':
    //             console.log(`recieved assignTasks:`);
    //             assignTasks(eventData.designation, eventData.ambition);
    //             // dispatch({ type: 'day/dayStatusChanged', payload: 'ASSIGNED' });
    //             setAppProperty('status','ASSIGNED');
    //             break;
    //     }
    // };

    return dataLoaded && fontsLoaded ? (
        <SafeAreaView style={[styles.safe]}>
            <NavigationContainer screenOptions={{ headerShown: false }}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Main"
                        component={Main}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Editor"
                        component={TaskEditor}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    ) : (
        <View></View>
    );
}
