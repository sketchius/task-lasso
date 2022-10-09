import { Pressable } from 'react-native';
import getIcon from '../tools/Icons';
import { styles } from '../styles/styles';
import StyledText from './StyledText';

export default function StyledButton(props) {
	const handlePress = () => {
		if (props.onPress) props.onPress(props.data);
	};

	return (
		<Pressable
			onPress={handlePress}
			style={[
				props.styling == 'small' ? styles.smallButton : styles.size80,
				styles.alignItems,
				styles.thinBorder,
				styles.paddingVertical4,
				styles.margin2,
				styles.itemButton,
				props.styling == 'critical' && styles.criticalButton,
				props.styling == 'subtle' && [
					styles.subtleButton,
					styles.smallButton,
				],
				props.styling == 'horizontal' && styles.horizontalButton,
			]}>
			{getIcon(
				props.iconFamily,
				props.iconName,
				props.label ? 20 : 30,
				styles.colors.gray
			)}
			{props.label && (
				<StyledText
					style={[
						styles.itemButtonText,
						props.styling == 'horizontal' &&
							styles.paddingHorizontal3,
					]}>
					{props.label.toUpperCase()}
				</StyledText>
			)}
		</Pressable>
	);
}
