import { saveAppProperty } from '../data/local-storage';
import store from '../data/store';

let requestActive = false;
let processing = false;

const SERVERADDRESS = '192.168.0.191';

export const establishServerConnection = async () => {
	const controller = new AbortController();
	const signal = controller.signal;
	requestActive = true;
	setTimeout(() => controller.abort(), 5000);
	console.log('Attempting to connect.');
	try {
		const response = await fetch(`http://${SERVERADDRESS}:3000/connect`, {
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

export const sendAuthentication = async () => {
	const controller = new AbortController();
	const signal = controller.signal;
	let statusCode = 0;
	requestActive = true;
	console.log(`Sending authentication information...`);
	setTimeout(() => controller.abort(), 5000);
	try {
		const response = await fetch(
			`http://${SERVERADDRESS}:3000/login`,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: 'bryce',
					password: 'mochi',
				}),
			},
			{
				signal,
			}
		);
		statusCode = response.status;
		switch (response.status) {
			case 200:
				console.log(`Login successful!`);
				setLoginStatus('LOGGED-IN');
				break;
			case 400:
				throw 'Critical Error: Invalid login format. Login request must include username and password!';
			case 401:
				console.log(`Login failed: Incorrect password.`);
				setLoginStatus('INVALID');
				setConnectionStatus(false);
				break;
			case 404:
				console.log(`Login failed: User not found.`);
				setLoginStatus('INVALID');
				setConnectionStatus(false);
				break;
		}
	} catch (error) {
		console.log(`error: ${error}`);
		statusCode = 400;
		setConnectionStatus(false);
	}
	requestActive = false;
	return statusCode;
};

const setConnectionStatus = status => {
	store.dispatch({
		type: `ram/ramPropertyChanged`,
		property: 'connectedToServer',
		payload: status,
	});
};

const setLoginStatus = status => {
	store.dispatch({
		type: `ram/ramPropertyChanged`,
		property: 'loggedInToServer',
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
	let setNewTimeout = false;
	const connected = store.getState().ram.connectedToServer;
	if (connected) {
		if (!requestActive) {
			const loginStatus = store.getState().ram.loggedInToServer || 'FALSE';
			if (loginStatus == 'FALSE') {
				const result = await sendAuthentication();
				if (result == 200) {
					console.log('LOGGED IN!');
					setNewTimeout = true;
				} else {
					console.log('NOT LOGGED IN!');
					setConnectionStatus(false);
				}
			} else {
				const actionQueue = store.getState().app.actionQueue || [];
				processing = true;
				if (actionQueue.length > 0) {
					const result = await executeAction(actionQueue[0]);
					if (result >= 200 && result < 300) {
						actionQueueShift();
					} else {
						if (result == 401) {
							setLoginStatus('FALSE');
						}
					}
					setNewTimeout = true;
				} else {
					processing = false;
				}
			}
		} else {
			setNewTimeout = true;
		}
		if (setNewTimeout) {
			console.log(`Set setNewTimeout is true!`);
			setTimeout(() => {
				processQueue();
			}, 0);
		}
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
		case 'setAppDataProperty':
			console.log(`executing setAppDataProperty action`);
			return await sendRequest('PATCH', 'appData', { [action.data.property]: action.data.value });
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
			`http://${SERVERADDRESS}:3000/${route}`,
			{
				method,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					action: action || 'none',
					username: 'bryce',
				},
				body: JSON.stringify(body),
			},
			{
				signal,
			}
		);
		console.log(`Response status code = ${response.status}`);
		statusCode = response.status;
	} catch (error) {
		console.log(`error: ${error}`);
		statusCode = 400;
		setConnectionStatus(false);
	}
	requestActive = false;
	return statusCode;
};
