import { View } from "react-native";
import { styles } from "../styles/styles";

export default function StyledProgressBar(props) {

    const getBarComponenets = () => props.sections
        .map( (section, index) => {
            return <View key={index} style={{height: '100%', backgroundColor:section.color, flex:section.portion}}/>
        });
    



    return <View style={[{height: 40, flexGrow: 1, margin: styles.space.size4, borderWidth: 1.5, borderColor: styles.colors.gray},  styles.row]}>
        {getBarComponenets()}
    </View>
}