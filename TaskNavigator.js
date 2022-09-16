import TaskListScreen from './TaskListScreen';
import TaskDetails from './TaskDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { View } from 'react';



export default function TaskNavigator( {navigation, route}) {
    return <View></View>
}
/*
export default function TaskNavigator( {navigation, route}) {
    const styles = route.params.styles;
    const tasks = route.params.tasks;


    const Stack = createStackNavigator();

    const TaskNavStack = () => {
        return (
            <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'tomato' },
            }}
            >
                <Stack.Screen
                    name="Inventory"
                    component={TaskListScreen}
                    initialParams={{ styles }}
                    options={{
                            
                    headerShown: false,
                    title: 'Task List',
                    }}
                />
                <Stack.Screen
                    name="View"
                    component={TaskDetails}
                    initialParams={{ styles, tasks }}
                    options={{
                        headerShown: false,
                    title: 'Task View',
                    }}
                />
            </Stack.Navigator>
        );
    }

    return (
        
        <TaskNavStack />
        
    )
    
}*/