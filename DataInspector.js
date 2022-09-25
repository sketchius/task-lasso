import { ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';

export default function DataInspector(props) {
    const tasks = useSelector(state => state);
    return <ScrollView><Text>{JSON.stringify(tasks,null,4)}</Text></ScrollView>;
}