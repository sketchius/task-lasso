import { ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import StyledButton from './components/StyledButton';
import { removeAllTasks } from './data/local-storage';

export default function DataInspector(props) {
	const tasks = useSelector(state => state);

	return (
		<ScrollView>
			<Text>{JSON.stringify(tasks, null, 4)}</Text>
		</ScrollView>
	);
}
