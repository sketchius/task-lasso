import { Text } from 'react-native';

export default function StyledText(props) {
    return <Text style={[props.styles.defaultText, props.style]} numberOfLines={props.numberOfLines}>{props.children}</Text>
}