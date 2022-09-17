const initialState = {
    tasks: [
        {
            title: 'Go to the store',
            type: 'SCHEDULED',
            priority: 2,
            uniqid: 1,
            duration: 60,
            dateDue: new Date(2022, 8, 16),
            iconLibrary: 'AntDesign',
            iconName: 'car',
        },
        {
            title: 'Find the drill',
            description:
                'Been looking everywhere for the drill, but I have no idea where it is...',
            type: 'DEADLINE',
            priority: 1,
            uniqid: 2,
            duration: 15,
            dateDue: new Date(2022, 8, 16, 10, 0, 0),
            iconLibrary: 'FontAwesome',
            iconName: 'search',
        },
        {
            title: 'Call mom',
            description: `She's probably wondering how I'm doing.`,
            type: 'FLEXIBLE',
            dateCreated: new Date(2022, 8, 2, 10, 0, 0),
            uniqid: 3,
            duration: 45,
            priority: 1,
            iconLibrary: 'Ionicons',
            iconName: 'call',
        },
        {
            title: 'Drive to Columbus',
            description:
                'Need to:\n1) Go to the doctor\n2)Visit bob\n3)Drop off borrowed books',
            type: 'SCHEDULED',
            priority: 2,
            uniqid: 4,
            duration: 60,
            dateDue: new Date(2022, 9, 15),
            iconLibrary: 'AntDesign',
            iconName: 'car',
        },
        {
            title: 'Lookup that Mexican place',
            type: 'CAPTURED',
            uniqid: 5,
            iconLibrary: 'MaterialCommunityIcons',
            iconName: 'circle-small',
        },
        {
            title: 'Text Ralph back',
            type: 'CAPTURED',
            uniqid: 6,
            iconLibrary: 'MaterialCommunityIcons',
            iconName: 'circle-small',
        },
        {
            title: 'Do laundry',
            type: 'DEADLINE',
            uniqid: 17,
            priority: 1,
            duration: 30,
            dateDue: new Date(2022, 8, 17, 10, 0, 0),
            iconLibrary: 'FontAwesome5',
            iconName: 'tshirt',
        },
        {
            title: 'Pump up bike tires',
            type: 'FLEXIBLE',
            dateCreated: new Date(2022, 8, 9, 10, 0, 0),
            uniqid: 18,
            duration: 10,
            priority: 0,
            iconLibrary: 'MaterialIcons',
            iconName: 'pedal-bike',
        },
        {
            title: 'Make grocery list',
            type: 'DEADLINE',
            uniqid: 19,
            duration: 15,
            priority: 1,
            dateDue: new Date(2022, 8, 15, 10, 0, 0),
            iconLibrary: 'FontAwesome5',
            iconName: 'clipboard-list',
        },
        {
            title: 'Fix the table',
            description: 'One of the legs is loose',
            type: 'FLEXIBLE',
            dateCreated: new Date(2022, 8, 8, 10, 0, 0),
            uniqid: 20,
            duration: 30,
            priority: 0,
            iconLibrary: 'MaterialCommunityIcons',
            iconName: 'screwdriver',
        },
        {
            title: 'Interview at Data Corp',
            type: 'SCHEDULED',
            uniqid: 21,
            duration: 60,
            priority: 2,
            dateDue: new Date(2022, 8, 14, 15, 0, 0),
            useTime: true,
            iconLibrary: 'Ionicons',
            iconName: 'people',
        },
        {
            title: 'Finish first draft of proposal',
            type: 'DEADLINE',
            uniqid: 22,
            duration: 45,
            priority: 2,
            dateDue: new Date(2022, 8, 29, 10, 0, 0),
            iconLibrary: 'Ionicons',
            iconName: 'document',
        },
        {
            title: 'Find the remote',
            type: 'FLEXIBLE',
            dateCreated: new Date(2022, 8, 13, 10, 0, 0),
            uniqid: 23,
            duration: 10,
            priority: 2,
            iconLibrary: 'FontAwesome',
            iconName: 'search',
        },
        {
            title: 'Call the gas company',
            description: 'Ask about charges',
            type: 'FLEXIBLE',
            dateCreated: new Date(2022, 8, 10, 10, 0, 0),
            uniqid: 24,
            duration: 10,
            priority: 2,
            iconLibrary: 'Ionicons',
            iconName: 'people',
        },
    ],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'storage/loadedData':
            return {tasks: action.payload};
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
        default:
            return state;
    }
}
