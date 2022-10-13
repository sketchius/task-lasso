import { saveTaskToLocal } from './local-storage.js';

export function newTask(task) {
	dispatch({ type: 'task/taskCreated', payload: task });
}

export function updateTask(task) {}
