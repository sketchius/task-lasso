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
import * as Server from './server-communication';
import store from './store';

export function newTask(task) {
	store.dispatch({ type: `task/taskCreated`, payload: task });
	saveTaskToLocal(task);
	Server.enqueueAction({
		type: 'createTask',
		data: task,
	});
}

export function updateTask(task) {
	store.dispatch({
		type: `task/taskUpdated`,
		uniqid: task.uniqid,
		payload: task,
	});
	task = getTaskByUniqid(task.uniqid);
	saveTaskToLocal(task);
	Server.enqueueAction({
		type: 'writeTask',
		data: task,
	});
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
	Server.enqueueAction({
		type: 'patchTask',
		data: { uniqid: task.uniqid, [property]: value },
	});
}

export function setTaskPropertyAll(tasks, property, value) {
	store.dispatch({
		type: `task/taskPropertyChangedAll`,
		property,
		payload: value,
	});
	saveTasksToLocal(tasks);
	tasks.forEach(task => {
		Server.enqueueAction({
			type: 'patchTask',
			data: { uniqid: task.uniqid, [property]: value },
		});
	});
}

export function deleteTask(task) {
	recycleTaskAtLocal(task);
	store.dispatch({
		type: `task/taskDeleted`,
		uniqid: task.uniqid,
		payload: task,
	});
	Server.enqueueAction({
		type: 'recycleTask',
		data: { uniqid: task.uniqid },
	});
}

export function completeTask(task) {
	completeTaskAtLocal(task);
	store.dispatch({
		type: `task/taskDeleted`,
		uniqid: task.uniqid,
		payload: task,
	});

	Server.enqueueAction({
		type: 'completeTask',
		data: { uniqid: task.uniqid },
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
	Server.enqueueAction({
		type: 'setAppDataProperty',
		data: { property, value },
	});
	saveAppProperty(property, value + '');
}

export function setRamProperty(property, value) {
	store.dispatch({
		type: `ram/ramPropertyChanged`,
		property,
		payload: value,
	});
}

export async function loadTaskDataFromLocal() {
	const tasks = await loadTasks();
	store.dispatch({ type: `task/tasksLoadedFromStorage`, payload: tasks });
}

export async function loadAppDataFromLocal() {
	const appData = await loadAppData();
	store.dispatch({ type: `app/appDataLoadedFromStorage`, payload: appData });
}

export async function saveTasksToServer(tasks) {
	tasks.forEach(task => {
		Server.enqueueAction({ type: 'writeTask', data: task });
	});
}
