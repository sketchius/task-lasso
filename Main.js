import { View } from 'react-native';
import format from 'date-fns/format';

import AppNavigation from './screens/navigation';

import StyledText from './components/StyledText';

import { styles } from './styles/styles';

export default function Main({ route, navigator }) {
	return (
		<View style={styles.container}>
			<View style={styles.screenHeader}>
				<View style={[styles.alignedRow, styles.justifyContent]}>
					<StyledText style={styles.screenHeaderText}>{format(new Date(), 'EEEE').toUpperCase()}</StyledText>
					<View style={styles.screenHeaderDateView}>
						<StyledText style={styles.screenHeaderDateText}>{format(new Date(), 'MMM do')}</StyledText>
						<StyledText style={styles.screenHeaderYearText}>{format(new Date(), 'y')}</StyledText>
					</View>
				</View>
			</View>
			<AppNavigation></AppNavigation>
		</View>
	);
}
