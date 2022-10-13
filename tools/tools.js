import store from '../data/store';

export function getTaskByUniqid(uniqid) {
	let tasks = store.getState().tasks;
	for (let i = 0; i < tasks.length; i++) {
		const task = tasks[i];
		if (task.uniqid === uniqid) {
			return tasks[i];
		}
	}
	return undefined;
}
