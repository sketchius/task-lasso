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
		const response = await fetch(`http://172.25.59.20:3000/connect`, {
			signal,
		});
		const res = await response.json();

		console.log(`Ping result: ${res}`);
		if (res.resultCode == 200) {
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
		const result = await executeAction(actionQueue[0]);
		console.log('result was', result);
		if (result >= 200 && result < 300) actionQueue.shift();
		setTimeout(() => {
			processQueue();
		}, 0);
	} else {
		processing = false;
	}
};

const executeAction = async action => {
	console.log(`doing action`, action);
	switch (action.type) {
		case 'createTask':
			console.log(`createTask...`);
			return await sendRequest('POST', 'task', action.data, 'create');
		case 'writeTask':
			return await sendRequest('PUT', 'task', action.data);
		case 'patchTask':
			return await sendRequest('PATCH', 'task', action.data);
		case 'recycleTask':
			return await sendRequest('POST', 'task', action.data, 'recycle');
		case 'completeTask':
			return await sendRequest('POST', 'task', action.data, 'complete');
		default:
			return 400;
	}
};

const sendRequest = async (method, route, body, action) => {
	console.log(`in send request`);
	const controller = new AbortController();
	const signal = controller.signal;
	let statusCode = 0;
	requestActive = true;
	setTimeout(() => controller.abort(), 5000);
	try {
		console.log(`running fetch`);
		const response = await fetch(
			`http://172.25.59.20:3000/${route}`,
			{
				method,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					action: action || 'none',
				},
				body: JSON.stringify(body),
			},
			{
				signal,
			}
		);
		statusCode = response.status;
	} catch (error) {
		console.log(`error: ${error}`);
		statusCode = 400;
		setRamProperty('connected', false);
	}
	requestActive = false;
	return statusCode;
};
