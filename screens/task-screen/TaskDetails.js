import { ScrollView, View, Pressable } from "react-native";
import StyledText from "./StyledText";
import getIcon from "./Icons";
import { format } from 'date-fns';
import { getDateInContext, getTime } from "./DateContext";

import { styles } from './../../styles/styles';

export default function TaskDetails({navigation, route}) {
    
    const task = route.params.task;

}