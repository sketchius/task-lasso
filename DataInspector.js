import { ScrollView, Text } from 'react-native';

export default function DataInspector(props) {
    return <ScrollView><Text>{JSON.stringify(props.tasks,null,4)}</Text></ScrollView>;
}
