import { ScrollView, View, Pressable } from "react-native";
import StyledText from "./StyledText";
import getIcon from "./Icons";
import { format } from 'date-fns';
import { getDateInContext, getTime } from "./DateContext";

import { definedStyles } from './Styles';

export default function TaskDetails({navigation, route}) {
    const styles = definedStyles;
    const task = route.params.task;

}