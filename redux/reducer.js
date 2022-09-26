const initialState = {
    tasks: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'app/localStorageLoaded':
            return {...state,
                localStorageLoaded: true};
        case 'storage/loadedData':
            return {...state,
                tasks: action.payload};
        case 'storage/loadedStatus':
            console.log(`Reducer running loadedStatus. Payload = ${action.payload}`)
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
        case 'task/taskAssigned':
            console.log(`Reducer running taskAssigned. Payload = ${action.payload}`)
            return {
                ...state,
                tasks: state.tasks.map(task => {
                  if (task.uniqid !== action.payload) {
                    return task
                  }
                  return {
                    ...task,
                    assigned: true
                  }
                })
            }
        case 'task/taskStatusChanged':
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.uniqid !== action.uniqid) {
                    return task
                    }
                    return {
                    ...task,
                    status: action.payload
                    }
                })
            }
        case 'task/taskScored':
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.uniqid !== action.uniqid) {
                    return task
                    }
                    return {
                    ...task,
                    score: action.payload
                    }
                })
            }
        case 'day/dayStateChanged':
            return {
                ...state,
                status: action.payload
            }

        default:
            return state;
    }
}
