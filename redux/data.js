import { useDispatch } from 'react-redux';
import { getTaskByUniqid } from '../tools/tools';
import {
	saveTaskToLocal,
	saveTasksToLocal,
	saveAppProperty,
	loadAppData,
	loadTasks,
	completeTaskAtLocal,
	recycleTaskAtLocal,
} from './local-storage';
import * as Server from './../network/network';
import store from './store';

export function newTask(task) {
	store.dispatch({ type: `task/taskCreated`, payload: task });
	saveTaskToLocal(task);
}

export function updateTask(task) {
	store.dispatch({
		type: `task/taskUpdated`,
		uniqid: task.uniqid,
		payload: task,
	});
	task = getTaskByUniqid(task.uniqid);
	saveTaskToLocal(task);
}

export function setTaskProperty(task, property, value) {
	store.dispatch({
		type: `task/taskPropertyChanged`,
		uniqid: task.uniqid,
		property,
		payload: value,
	});
	task = getTaskByUniqid(task.uniqid);
	saveTaskToLocal(task);
}

export function setTaskPropertyAll(tasks, property, value) {
	store.dispatch({
		type: `task/taskPropertyChangedAll`,
		property,
		payload: value,
	});
	saveTasksToLocal(tasks);
}

export function deleteTask(task) {
	if (task.type != 'DRAFT') recycleTaskAtLocal(task);
	store.dispatch({
		type: `task/taskDeleted`,
		uniqid: task.uniqid,
		payload: task,
	});
}

export function completeTask(task) {
	completeTaskAtLocal(task);
	store.dispatch({
		type: `task/taskDeleted`,
		uniqid: task.uniqid,
		payload: task,
	});
}

export function setAppProperty(property, value) {
	if (typeof value != 'string' && typeof value != 'number')
		throw `setAppProperty(property: ${property}, value ${value}): value must be a string or number.`;
	store.dispatch({
		type: `app/appPropertyChanged`,
		property,
		payload: value,
	});
	saveAppProperty(property, value + '');
}

export function setRamProperty(property, value) {
	store.dispatch({
		type: `ram/ramPropertyChanged`,
		property,
		payload: value,
	});
	//saveAppProperties(status);
}

export async function loadTaskDataFromLocal() {
	const tasks = await loadTasks();
	store.dispatch({ type: `task/tasksLoadedFromStorage`, payload: tasks });
}

export async function loadAppDataFromLocal() {
	const appData = await loadAppData();
	// console.log(`Loading app data!`);
	// console.log(`This is the object representing data from local storage:`);
	// console.log(JSON.stringify(appData, null, 4));
	store.dispatch({ type: `app/appDataLoadedFromStorage`, payload: appData });
}

export async function saveTasksToServer(tasks) {
	tasks.forEach(task => {
		Server.saveTask(task);
	});
}
