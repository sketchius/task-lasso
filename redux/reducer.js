const initialState = {
    tasks: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'storage/loadedData':
            console.log(`REDUCER UPDATING STATE. NEW STATE =`)
            console.log(JSON.stringify({...state,
                tasks: action.payload},null,4))
            return {...state,
                tasks: action.payload};
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
