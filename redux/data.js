import { useDispatch } from 'react-redux';
import {saveTaskToLocal,saveStatusToLocal} from './local-storage';
import store from './store';




export function newTask(task) {
    store.dispatch({ type: `task/taskCreated`, payload: task });
    //saveTaskToLocal(task);
}

export function updateTask(task) {
    store.dispatch({ type: `task/taskUpdated`, payload: task });
    //saveTaskToLocal(task);
}

export function setTaskProperty(task, property, value) {
    console.log(`-Update test- TASK DATA BEFORE DISPATCH:`)
    console.log(JSON.stringify(task,null,4));
    store.dispatch({ type: `task/taskPropertyChanged`, uniqid: task.uniqid, property, payload: value });
    console.log(`-Update test- TASK DATA AFTER DISPATCH:`)
    console.log(JSON.stringify(task,null,4));
    //saveTaskToLocal(task);
}

export function setTaskPropertyAll(property, value) {
    store.dispatch({ type: `task/taskPropertyChangedAll`, property, payload: value });
    //saveTasksToLocal(tasks);
}

export function setAppProperty(property, value) {
    store.dispatch({ type: `app/appPropertyChanged`, property, payload: value });
    //saveAppProperties(status);
}

export function setRamProperty(property, value) {
    store.dispatch({ type: `ram/ramPropertyChanged`, property, payload: value });
    //saveAppProperties(status);
}