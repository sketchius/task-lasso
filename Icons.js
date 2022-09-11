import { AntDesign, FontAwesome5, FontAwesome, MaterialIcons, Octicons, Entypo, Feather, Ionicons  } from '@expo/vector-icons';

const componentsMap = { AntDesign, FontAwesome5, FontAwesome, MaterialIcons, Octicons, Entypo, Feather, Ionicons  };

export default function getIcon(iconLibrary, iconName, size, color) {
    let Library = componentsMap[iconLibrary];
    if (Library == null) {
        return <AntDesign name={"question"} size={size} color={color}/>
    }
    return <Library name={iconName} size={size} color={color}/>
}