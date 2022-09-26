import { Pressable } from "react-native";
import getIcon from "../tools/Icons";
import { styles } from "../styles/styles";
import StyledText from "./StyledText";



export default function StyledButton(props) {
    const handlePress = () => {
        if (props.onPress)
            props.onPress(props.data);
    }
    
    return <Pressable onPress={handlePress} style={[styles.size80, styles.alignItems, styles.thinBorder, styles.margin, styles.paddingVertical4, styles.margin2, styles.itemButton]}>
        {getIcon(props.iconFamily,props.iconName,16,styles.colors.gray)}
    <StyledText style={[styles.paddingTop2]}>{props.label}</StyledText>
</Pressable>
}