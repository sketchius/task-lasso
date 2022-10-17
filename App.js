import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, NativeModules, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { Logs } from 'expo';

import isToday from 'date-fns/isToday';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

import TaskEditor from './screens/edit';
import store from './data/store';

import { styles } from './styles/styles';
import Main from './Main';
import { useFonts } from 'expo-font/build';
import { createStackNavigator } from '@react-navigation/stack';
import {
	setAppProperty,
	setTaskProperty,
	setTaskPropertyAll,
	setRamProperty,
	loadAppDataFromLocal,
	loadTaskDataFromLocal,
	completeTask,
	saveTasksToServer,
} from './data/data-manager';
import { parseJSON } from 'date-fns';
import { establishServerConnection } from './data/server-communication';
import StyledButton from './components/StyledButton';
import { unassign } from './data/task-manager';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

Logs.enableExpoCliLogging();

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

	useEffect(() => {
		if (!dataLoaded) loadDataFromStorage();
	}, []);

	const appState = useRef(AppState.currentState);
	//const [appStateVisible, setAppStateVisible] = useState(appState.current);

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
			//setAppStateVisible(appState.current);
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
		if (store.getState().app.status == 'ASSIGNED' && !isToday(parseJSON(lastCheckIn))) {
			endDay();
		}
		let newDate = new Date();
	};

	const endDay = () => {
		let completedTasks = 0;
		let deferredTasks = 0;
		let missedTasks = 0;

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
								differenceInCalendarDays(task.dateDue, store.getState().app.lastCheckInDate) > 0)
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

		setAppProperty('summaryCompletedTasks', completedTasks);
		setAppProperty('summaryDeferredTasks', deferredTasks);
		setAppProperty('summaryMissedTasks', missedTasks);

		let lastUpdate = store.getState().app.lastCheckInDate;
		setAppProperty('summaryDate', lastUpdate);

		setAppProperty('assignedValue', 0);

		setTaskPropertyAll(tasks, 'assigned', false);
		setAppProperty('status', 'CHECK-IN');
	};

	const loadDataFromStorage = async () => {
		await loadAppDataFromLocal();
		await loadTaskDataFromLocal();
		setRamProperty('localStorageLoaded', true);
	};

	const Stack = createStackNavigator();

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
