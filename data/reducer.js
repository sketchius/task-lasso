const initialState = {
	tasks: [],
	app: {
		actionQueue: [],
	},
	ram: {},
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'task/tasksLoadedFromStorage':
			return { ...state, tasks: action.payload };
		case 'task/taskCreated':
			return {
				...state,
				tasks: [...state.tasks, action.payload],
			};
		case 'task/taskUpdated':
			console.log(`Running reducer: task/taskUpdated uniqid:${action.uniqid}, payload:${action.payload}`);
			return {
				...state,
				tasks: state.tasks.map(task => {
					if (task.uniqid !== action.uniqid) {
						return task;
					}
					return {
						...task,
						...action.payload,
					};
				}),
			};
		case 'task/taskDeleted':
			console.log(`Running reducer: task/taskUpdated uniqid:${action.uniqid}, payload:${action.payload}`);
			return {
				...state,
				tasks: state.tasks.filter(task => task.uniqid !== action.uniqid),
			};
		case 'task/taskPropertyChanged':
			return {
				...state,
				tasks: state.tasks.map(task => {
					if (task.uniqid !== action.uniqid) {
						return task;
					}
					return {
						...task,
						[action.property]: action.payload,
					};
				}),
			};
		case 'task/taskPropertyChangedAll':
			return {
				...state,
				tasks: state.tasks.map(task => {
					return {
						...task,
						[action.property]: action.payload,
					};
				}),
			};

		case 'app/appDataLoadedFromStorage':
			return { ...state, app: action.payload };

		case 'app/appPropertyChanged':
			console.log('reducer running app/appPropertyChanged');
			console.log(`action = `, JSON.stringify(action, null, 4));
			return {
				...state,
				app: {
					...state.app,
					[action.property]: action.payload,
				},
			};

		case 'app/actionAdded':
			console.log('reducer running app/actionAdded');
			console.log(`action = `, JSON.stringify(action.payload, null, 4));
			let newActionQueue = [action.payload];
			if (state.app.actionQueue) newActionQueue = [...state.app.actionQueue, action.payload];
			console.log(`newActionQueue = `, JSON.stringify(newActionQueue, null, 4));
			return {
				...state,
				app: {
					...state.app,
					actionQueue: newActionQueue,
				},
			};

		case 'app/actionShifted':
			console.log('actionShifted');
			return {
				...state,
				app: {
					...state.app,
					actionQueue: state.app.actionQueue.slice(1),
				},
			};

		case 'ram/ramPropertyChanged':
			return {
				...state,
				ram: {
					...state.ram,
					[action.property]: action.payload,
				},
			};
		default:
			return state;
	}
}
