import { Text } from 'react-native';
import { styles } from './../styles/styles'

export default function StyledText(props) {
    return <Text style={[styles.defaultText, props.style]} numberOfLines={props.numberOfLines}>{props.children}</Text>
}