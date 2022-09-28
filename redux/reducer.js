const initialState = {
    tasks: [],
    app: {},
    ram: {}
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'task/tasksLoadedFromStorage':
            return {...state,
                tasks: action.payload};
        case 'task/taskCreated':
            return {
                ...state,
                tasks:[
                    ...state.tasks,
                    action.payload
                ]
            }
        case 'task/taskUpdated':
            console.log(`Running reducer: task/taskUpdated uniqid:${action.uniqid}, payload:${action.payload}`)
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.uniqid !== action.uniqid) {
                    return task
                    }
                    return {
                    ...task,
                    ...action.payload
                    }
                })
            }

        case 'task/taskPropertyChanged':
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.uniqid !== action.uniqid) {
                    return task
                    }
                    return {
                    ...task,
                    [action.property]: action.payload
                    }
                })
            }
        case 'task/taskPropertyChangedAll':
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    return {
                    ...task,
                    [action.property]: action.payload
                    }
                })
            }
            


        case 'app/appDataLoadedFromStorage':
            return {...state,
                app: action.payload}; 
        case 'app/appPropertyChanged':
            return {
                ...state,
                app: {
                    ...state.app,
                    [action.property]: action.payload 
                }
            }


        case 'ram/ramPropertyChanged':
            return {
                ...state,
                ram: {
                    ...state.ram,
                    [action.property]: action.payload 
                }
            }
        default:
            return state;
    }
}
