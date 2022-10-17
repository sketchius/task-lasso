import AsyncStorage from '@react-native-async-storage/async-storage';
import { processAppData, processTaskData } from './data-preprocessor';

export async function saveTasksToLocal(tasks) {
	if (tasks) {
		try {
			tasks.forEach(task => {
				saveTaskToLocal(task);
			});
		} catch (e) {
			console.log(`   Error while saving tasks: ${e}`);
			// Handle Error
		}
	}
}

export async function saveTaskToLocal(task) {
	const json = JSON.stringify(task);
	await AsyncStorage.setItem(`@tasks/${task.uniqid}`, json);
	//console.log(`AsyncStorage: setting key '@tasks/${task.uniqid}' to ${json}`);
}

export async function recycleTaskAtLocal(task) {
	const json = JSON.stringify(task);
	await AsyncStorage.setItem(`@recycledTasks/${task.uniqid}`, json);
	await AsyncStorage.removeItem(`@tasks/${task.uniqid}`);
}

export async function completeTaskAtLocal(task) {
	const json = JSON.stringify(task);
	await AsyncStorage.setItem(`@completedTasks/${task.uniqid}`, json);
	await AsyncStorage.removeItem(`@tasks/${task.uniqid}`);
}

export async function printKeys() {
	let keys = await AsyncStorage.getAllKeys();
	console.log(`keys = ${JSON.stringify(keys)}`);
}

export async function loadTasks() {
	try {
		const keys = await AsyncStorage.getAllKeys();
		const taskKeys = keys.filter(key => key.includes('tasks/'));
		const taskData = await AsyncStorage.multiGet(taskKeys);
		const tasks = taskData.map(entry => {
			return processTaskData(JSON.parse(entry[1]));
		});

		let i = 1 / 0;
		return tasks;
	} catch (e) {
		console.log(`   Error while loading tasks: ${e}`);
	}
}

export async function removeAllTasks() {
	try {
		const keys = await AsyncStorage.getAllKeys();
		const taskKeys = keys.filter(key => key.includes('tasks/'));
		const taskData = await AsyncStorage.multiGet(taskKeys);
		taskData.forEach(async entry => {
			await AsyncStorage.removeItem(entry[0]);
		});
	} catch (e) {
		alert(`failed to read tasks: ${e}`);
	}
}

export async function loadAppData() {
	try {
		const keys = await AsyncStorage.getAllKeys();

		const appKeys = keys.filter(key => key.includes('app/'));

		const appDataArray = await AsyncStorage.multiGet(appKeys);
		const appDataObject = {};
		appDataArray.forEach(entry => {
			appDataObject[entry[0].replace('@app/', '')] = entry[1];
		});

		return processAppData(appDataObject);
	} catch (e) {
		alert(`failed to read tasks: ${e}`);
	}
}

export async function saveAppProperty(property, data) {
	await AsyncStorage.setItem(`@app/${property}`, data);
}

export async function loadAppPropertyFromLocal(property) {
	return await AsyncStorage.getItem(`@app/${property}`);
}
