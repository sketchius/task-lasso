import { saveAppProperty } from '../redux/local-storage';
import store from '../redux/store';

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

		console.log(`Ping result: ${res}`);
		if (res.resultCode == 200) {
			console.log('Connected to server.');
			setConnectionStatus(true);
			if (!processing) processQueue();
		} else {
			console.log('Server error.');
			setConnectionStatus(false);
		}
	} catch (error) {
		console.log('Timeout connecting to server.');
		setConnectionStatus(false);
	}
	requestActive = false;
};

const setConnectionStatus = status => {
	store.dispatch({
		type: `ram/ramPropertyChanged`,
		property: 'connectedToServer',
		payload: status,
	});
};

export const enqueueAction = action => {
	const actionQueue = store.getState().app.actionQueue || [];
	console.log(`actionQueue = `);
	console.log(actionQueue);
	actionQueuePush(action);
	if (!processing) processQueue();
};

const actionQueuePush = action => {
	store.dispatch({
		type: `app/actionAdded`,
		payload: action,
	});
	const actionQueue = store.getState().app.actionQueue;
	saveAppProperty('actionQueue', JSON.stringify(actionQueue));
};

const actionQueueShift = () => {
	store.dispatch({
		type: `app/actionShifted`,
	});
	const actionQueue = store.getState().app.actionQueue;
	saveAppProperty('actionQueue', JSON.stringify(actionQueue));
};

const processQueue = async () => {
	console.log(`Processing is ${processing}`);
	const actionQueue = store.getState().app.actionQueue || [];
	processing = true;
	if (actionQueue.length > 0 && store.getState().ram.connectedToServer) {
		const result = await executeAction(actionQueue[0]);
		if (result >= 200 && result < 300) {
			actionQueueShift();
		}
		setTimeout(() => {
			processQueue();
		}, 0);
	} else {
		processing = false;
	}
};

const executeAction = async action => {
	switch (action.type) {
		case 'createTask':
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
	const controller = new AbortController();
	const signal = controller.signal;
	let statusCode = 0;
	requestActive = true;
	setTimeout(() => controller.abort(), 5000);
	try {
		const response = await fetch(
			`http://192.168.0.191:3000/${route}`,
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
		setConnectionStatus(false);
	}
	requestActive = false;
	return statusCode;
};
