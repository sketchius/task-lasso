import { View, ScrollView } from "react-native";
import { iconOptions } from "./iconOptions";
import StyledText from "./components/StyledText";
import getIcon from "./tools/Icons";
import { styles } from "./styles/styles";

export default function IconPicker() {
    const categories = [];

    const addCategory = (name) => {
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            if (category == name)
                return
        }
        categories.push(name)
    }

    iconOptions.forEach( (iconOption) => {
        addCategory(iconOption.category);
    })

    const getCategoryIconOptions = (category) => {
        return iconOptions
        .filter( iconOption => iconOption.category == category)
        .sort( (a,b) => a.iconName > b.iconName )
        .map( (iconOption) => {
            return <View style={styles.padding2}>{getIcon(iconOption.iconFamily,iconOption.iconName,24,'black')}</View>;
        })
    }

    return <ScrollView>{categories.map( (category) => {
        return <View>
            <StyledText>{category}</StyledText>
            <View style={[styles.row, {flexWrap: 'wrap'}]}>{getCategoryIconOptions(category)}</View>
        </View>
        
    })}</ScrollView>
}