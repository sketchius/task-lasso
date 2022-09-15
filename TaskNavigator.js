import TaskListScreen from './TaskListScreen';
import TaskDetails from './TaskDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function TaskNavigator(props) {
    const styles = props.styles;
    const tasks = props.tasks;


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
                    name="Task List"
                    component={TaskListScreen}
                    options={{
                            
                    headerShown: false,
                    title: 'Task List',
                    }}
                />
                <Stack.Screen
                    name="Task View"
                    component={TaskDetails}
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
    
}