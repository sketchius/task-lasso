import { useDispatch } from 'react-redux';
import { getTaskByUniqid } from '../tools/tools';
import {saveTaskToLocal, saveAppProperty, loadAppData, loadTasks} from './local-storage';
import store from './store';




export function newTask(task) {
    store.dispatch({ type: `task/taskCreated`, payload: task });
    saveTaskToLocal(task);
}

export function updateTask(task) {
    store.dispatch({ type: `task/taskUpdated`, uniqid:task.uniqid, payload: task });
    task = getTaskByUniqid(task.uniqid);
    saveTaskToLocal(task);
}

export function setTaskProperty(task, property, value) {
    store.dispatch({ type: `task/taskPropertyChanged`, uniqid: task.uniqid, property, payload: value });
    task = getTaskByUniqid(task.uniqid);
    //saveTaskToLocal(task);
}

export function setTaskPropertyAll(property, value) {
    store.dispatch({ type: `task/taskPropertyChangedAll`, property, payload: value });
    //saveTasksToLocal(tasks);
}

export function setAppProperty(property, value) {
    store.dispatch({ type: `app/appPropertyChanged`, property, payload: value });
    saveAppProperty(property,value);
}

export function setRamProperty(property, value) {
    store.dispatch({ type: `ram/ramPropertyChanged`, property, payload: value });
    //saveAppProperties(status);
}

export async function loadTaskDataFromLocal() {
    const tasks = await loadTasks();
    store.dispatch({ type: `task/tasksLoadedFromStorage`, payload: tasks });
}

export async function loadAppDataFromLocal() {
    const appData = await loadAppData();
    store.dispatch({ type: `app/appDataLoadedFromStorage`, payload: appData });
}

