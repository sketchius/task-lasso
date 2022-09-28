const initialState = {
    tasks: [],
    app: {},
    ram: {}
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'app/localStorageLoaded':
            console.log(`Setting localStorageLoaded to True`)
            return {...state,
                localStorageLoaded: true};
        case 'storage/loadedData':
            return {...state,
                tasks: action.payload};
        case 'storage/loadedStatus':
            console.log(`Reducer running loadedStatus. Payload = ${action.payload}`)
            return {...state,
                status: action.payload};
        case 'storage/loadedStatus':
            console.log(`Reducer running loaded. Payload = ${action.payload}`)
            return {...state,
                status: action.payload};
        case 'tasks/UnassignedAll':
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    return {
                    ...task,
                    assigned: false
                    }
                })
            }
        case 'task/taskCreated':
            return {
                ...state,
                tasks:[
                    ...state.tasks,
                    action.payload
                ]
            }
        case 'task/taskUpdated':
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
        case 'app/statusUpdated':
            return {
                ...state,
                status: action.payload
            }
        case 'day/dayPropertyChanged':
            console.log(`day/dayPropertyChanged: setting state.${action.property} to ${action.payload}`)
            return {
                ...state,
                [action.property]: action.payload
            }
        case 'day/lastUpdateDateChanged':
            return {
                ...state,
                lastUpdateDate: action.payload
            }
            
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
