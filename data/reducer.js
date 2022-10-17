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
			return {
				...state,
				app: {
					...state.app,
					[action.property]: action.payload,
				},
			};

		case 'app/actionAdded':
			let newActionQueue = [action.payload];
			if (state.app.actionQueue) newActionQueue = [...state.app.actionQueue, action.payload];
			return {
				...state,
				app: {
					...state.app,
					actionQueue: newActionQueue,
				},
			};

		case 'app/actionShifted':
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
