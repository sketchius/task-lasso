import { createStackNavigator } from '@react-navigation/stack';
import DummyComponent from './DummyComponent';
import DummyComponentB from './DummyComponentB';
import TaskDetails from './TaskDetails';
import TaskListScreen from './TaskListScreen';



export default function DummyNav( {navigation, route}) {



    const Stack = createStackNavigator();

          

    return <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
    }}
    >
        <Stack.Screen
            name="TL"
            component={TaskListScreen}
            options={{
            title: '1',
            }}
        />
        <Stack.Screen
            name="Details"
            component={TaskDetails}
            options={{
            title: '2',
            }}
        />
    </Stack.Navigator>
    
}