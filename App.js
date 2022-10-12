import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, DeviceEventEmitter, NativeModules, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, shallowEqual } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { saveTasksToLocal, saveLastUpdateDate, loadTasks, printKeys, saveTaskToLocal } from './redux/local-storage';
import { Logs } from 'expo';

import isToday from 'date-fns/isToday';
import parseISO from 'date-fns/parseISO';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

import TaskEditor from './screens/edit-screen/edit';
import store from './redux/store';

import { styles } from './styles/styles';
import Main from './Main';
import { useFonts } from 'expo-font/build';
import { createStackNavigator } from '@react-navigation/stack';
import {
	newTask,
	setAppProperty,
	setTaskProperty,
	setTaskPropertyAll,
	setRamProperty,
	loadAppDataFromLocal,
	loadTaskDataFromLocal,
	completeTask,
	saveTasksToServer,
} from './redux/data';
import { parseJSON } from 'date-fns';
import { unassign } from './task/task-manager';
import StyledText from './components/StyledText';
import { getTaskByUniqid } from './tools/tools';
import StyledButton from './components/StyledButton';
import { enqueueAction, establishServerConnection } from './network/network';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

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

	const tasks = useSelector(state => state.tasks);
	const status = useSelector(state => state.app.status);
	const dataLoaded = useSelector(state => state.ram.localStorageLoaded);
	const lastUpdateDate = useSelector(state => state.app.lastUpdateDate);

	useEffect(() => {
		if (!dataLoaded) loadDataFromStorage();
	}, []);

	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', newAppState => {
			if (
				appState.current.match(/inactive|background/) &&
				newAppState === 'active' &&
				store.getState().ram.localStorageLoaded
			) {
				checkForEndOfDay();
			}

			appState.current = newAppState;
			setAppStateVisible(appState.current);
		});

		return () => {
			subscription.remove();
		};
	}, []);

	useEffect(() => {
		const refreshInterval = setInterval(() => {
			checkForEndOfDay();
		}, 60000);

		const pingInterval = setInterval(() => {
			const connected = store.getState().ram.connectedToServer;
			if (!connected) establishServerConnection();
		}, 10000);
		return () => {
			clearInterval(refreshInterval);
			clearInterval(pingInterval);
		};
	}, []);

	const checkForEndOfDay = () => {
		// unassign();
		// saveTasksToServer(store.getState().tasks);
		let lastCheckIn = store.getState().app.lastCheckInDate;
		console.log(parseJSON(lastCheckIn));
		if (store.getState().app.status == 'ASSIGNED' && !isToday(parseJSON(lastCheckIn))) {
			endDay();
		}
		let newDate = new Date();
		setAppProperty('lastUpdateDate', newDate.toJSON());
		//saveLastUpdateDate(newDate);
	};

	const endDay = () => {
		let completedTasks = 0;
		let deferredTasks = 0;
		let missedTasks = 0;
		console.log(`End day: task count = ${store.getState().tasks.filter(task => task.assigned).length}`);
		store
			.getState()
			.tasks.filter(task => task.assigned)
			.forEach(task => {
				switch (task.status) {
					case 1: // Complete
						if (task.type != 'REPEATING') completeTask(task);
						else setTaskProperty(task, 'status', 0);
						completedTasks++;
						break;
					case 0.5: // Done Today
						setTaskProperty(task, 'status', 0);
						completedTasks++;
						break;
					case 0:
					case 2: // Deferred
						if (
							task.type == 'FLEXIBLE' ||
							(task.type == 'DEADLINE' &&
								task.dateDue &&
								differenceInCalendarDays(task.dateDue, lastUpdateDate) > 0)
						) {
							deferredTasks++;
							setTaskProperty(task, 'deferments', (task.deferments || 0) + 1);
							if (status == 2) {
								setTaskProperty(task, 'status', 0);
							}
						} else {
							missedTasks++;
							setTaskProperty(task, 'status', 4);
						}
						break;
				}
			});

		console.log(`completedTasks = ${completedTasks}`);
		console.log(`deferredTasks = ${deferredTasks}`);
		console.log(`missedTasks = ${missedTasks}`);

		setAppProperty('summaryCompletedTasks', completedTasks);
		setAppProperty('summaryDeferredTasks', deferredTasks);
		setAppProperty('summaryMissedTasks', missedTasks);

		let lastUpdate = store.getState().app.lastCheckInDate;
		setAppProperty('summaryDate', lastUpdate);

		console.log('ending day');
		setAppProperty('assignedValue', 0);

		setTaskPropertyAll(tasks, 'assigned', false);
		setAppProperty('status', 'CHECK-IN');
	};

	const loadDataFromStorage = async () => {
		console.log(`App.js -> loadAppDataFromLocal()`);
		await loadAppDataFromLocal();
		await loadTaskDataFromLocal();
		setRamProperty('localStorageLoaded', true);
		printKeys();
	};

	const handleEditTaskButton = title => {
		const updatedTask = { title, uniqid: 2 };
		editTask(updatedTask.uniqid, updatedTask);
	};

	const handleDeleteTaskButton = () => {
		deleteTask(1);
	};

	const NavBar = createBottomTabNavigator();
	const Stack = createStackNavigator();

	useEffect(() => {
		const taskEventListener = DeviceEventEmitter.addListener('event.taskEvent', eventData =>
			handleTaskEvent(eventData)
		);
		const dayEventListener = DeviceEventEmitter.addListener('event.dayEvent', eventData =>
			handleDayEvent(eventData)
		);
		return () => {
			taskEventListener.remove();
			dayEventListener.remove();
		};
	}, []);

	const handleTaskEvent = eventData => {
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

	const pushData = () => {
		// saveTasksToServer(tasks);
		saveTasksToLocal(tasks);
	};

	const testServer = () => {
		enqueueAction({
			type: 'newTask',
			data: {
				uniqid: '4',
				title: 'Test task',
			},
		});
		enqueueAction({
			type: 'updateTask',
			data: {
				uniqid: '4',
				title: 'Test test task',
			},
		});
		enqueueAction({
			type: 'recycleTask',
			uniqid: 4,
		});
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
					<Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
					<Stack.Screen name='Editor' component={TaskEditor} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	) : (
		<View></View>
	);
}
