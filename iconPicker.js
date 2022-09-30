import { View, ScrollView } from "react-native";
import { iconOptions } from "./iconOptions";
import StyledText from "./components/StyledText";
import getIcon from "./tools/Icons";
import { styles } from "./styles/styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useState } from "react";

export default function IconPicker() {

    const prompt = 'Setup meeting for next thurs';

    const [selectedCategory,setSelectedCategory] = useState(1);

    const categories = [
        {
            name: 'Suggestions',
            subcategories: [],
            iconFamily: 'MaterialIcons',
            iconName: 'auto-awesome'
        },
        {
            name: 'Home and Office',
            subcategories: [
                'household',
                'office',
                'commerce',
                'time'
            ],
            iconFamily: 'FontAwesome5',
            iconName: 'home'
        },
        {
            name: 'Tools, Tech, and Fun',
            subcategories: [
                'tools',
                'fun',
                'tech'
            ],
            iconFamily: 'Ionicons',
            iconName: 'construct'
        },
        {
            name: 'People and Travel',
            subcategories: [
                'people',
                'clothing',
                'activity',
                'travel',
                'places'
            ],
            iconFamily: 'MaterialCommunityIcons',
            iconName: 'human-male-female',
        },
        {
            name: 'Outside and Nature',
            subcategories: [
                'nature',
                'food'
            ],
            iconFamily: 'FontAwesome5',
            iconName: 'tree',
        },
        {
            name: 'Shapes and Symbols',
            subcategories: [
                'symbols'
            ],
            iconFamily: 'MaterialCommunityIcons',
            iconName: 'shape'
        }
    ]

    const getCategoryButtons = () => {
        return categories.map( (category, index) => {
            return <Pressable key={index} onPress={() => setSelectedCategory(index)}>{getIcon(category.iconFamily,category.iconName,24,styles.colors.gray)}</Pressable>
        })
    }

    const getIconOptions = () => {
        if (selectedCategory == 0) return <View style={[styles.row, {flexWrap: 'wrap'}]}>{getSuggestedIconOptions()}</View>;
        return categories[selectedCategory].subcategories
        .map( (subcategory) => {
            return <View style={[styles.row, {flexWrap: 'wrap'}]}>{getIconOptionsBySubcategory(subcategory)}</View>;
        })
    }

    const getIconOptionsBySubcategory = (subcategory) => {
        return iconOptions
        .filter( iconOption => subcategory == iconOption.subcategory)
        .sort( (a,b) => a.iconName > b.iconName )
        .map( (iconOption) => {
            return <View style={[styles.padding2, styles.iconPickerOption]}>{getIcon(iconOption.iconFamily,iconOption.iconName,iconOption.iconFamily == 'FontAwesome5' || iconOption.iconFamily == 'FontAwesome' ? 20: 24,'black')}</View>;
        })
    }

    const getSuggestedIconOptions = () => {
        const suggestedIconOptions = [];
        iconOptions.forEach( option => {
            for (let i = 0; i < option.tags.length; i++) {
                const tag = option.tags[i];
                if (prompt.includes(tag))
                    suggestedIconOptions.push({option,score:(1/(i+1))});
            }
        })
        console.log(JSON.stringify(suggestedIconOptions,null,4))
        return suggestedIconOptions
        .sort( (a,b) => a.score < b.score )
        .map( (iconOption) => {
            return <View style={[styles.padding2, styles.iconPickerOption]}>{getIcon(iconOption.option.iconFamily,iconOption.option.iconName,iconOption.option.iconFamily == 'FontAwesome5' || iconOption.option.iconFamily == 'FontAwesome' ? 20: 24,'black')}</View>;
        })
    }

    return <View>
        <View style={styles.alignedRow}>{getCategoryButtons()}</View>
        <StyledText>{categories[selectedCategory].name}</StyledText>
        <View>
            <View>{getIconOptions()}</View>
        </View>
    </View>
}