import { setAppProperty, setRamProperty } from '../redux/data';
import store from '../redux/store';

const actionQueue = [];

let requestActive = false;
let processing = false;

export const establishServerConnection = async () => {
	const controller = new AbortController();
	const signal = controller.signal;
	requestActive = true;
	setTimeout(() => controller.abort(), 5000);
	console.log('Attempting to connect.');
	try {
		const response = await fetch(`http://192.168.0.191:3000/connect`, {
			signal,
		});
		const res = await response.json();
		if (res.resultCode == 10) {
			console.log('Connected to server.');
			setRamProperty('connected', true);
			if (actionQueue.length > 0 && !processing) processQueue();
		} else {
			console.log('Server error.');
			setRamProperty('connected', false);
		}
	} catch (error) {
		console.log('Timeout connecting to server.');
		setRamProperty('connected', false);
	}
	requestActive = false;
};

export const enqueueAction = action => {
	actionQueue.push(action);
	if (!processing) processQueue();
};

const processQueue = async () => {
	processing = true;
	console.log(`processQueue: Length ${actionQueue.length}`);
	if (actionQueue.length > 0 && store.getState().ram.connected) {
		const result = await saveTask(actionQueue[0].data);
		if (result == 10 || result == 21) actionQueue.shift();
		setTimeout(() => {
			processQueue();
		}, 0);
	} else {
		processing = false;
	}
};

export const fetchTaskByUniqid = async uniqid => {
	try {
		const response = await fetch(
			`http://192.168.0.191:3000/task/read/${taskId}`
		);
		const json = await response.json();
	} catch (error) {
		console.error(error);
	}
};

// export const saveTas2k = async task => {
// 	try {
// 		const response = await fetch(`http://192.168.0.191:3000/task/create`, {
// 			method: 'POST',
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(task),
// 		});
// 		const json = await response.json();
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

export const saveTask = async task => {
	const controller = new AbortController();
	const signal = controller.signal;
	let resultCode = 0;
	requestActive = true;
	setTimeout(() => controller.abort(), 5000);
	console.log('Attempting to POST a task.');
	try {
		const response = await fetch(
			`http://192.168.0.191:3000/task/create`,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(task),
			},
			{
				signal,
			}
		);
		const res = await response.json();
		resultCode = res.resultCode;
	} catch (error) {
		resultCode = 30;
		setRamProperty('connected', false);
	}
	console.log(`Task POST result: ${resultCode}`);
	requestActive = false;
	return resultCode;
};
