import { Pressable, View } from "react-native";
import getIcon from "./Icons";
import StyledText from "./StyledText";
import { Text } from "react-native";

import {getDateInContext,getTime} from './DateContext';

export default function TaskListItem(props) {
    const styles = props.styles;
    const task = props.task;
    let dueElement;
    if (props.showDate) {
        dueElement = <View style={[styles.dueElement]}><Text style={[styles.defaultText, styles.fontSize0]}>{getDateInContext(task.dateDue,task.useTime)}</Text></View>
    }

    return (
        <Pressable
            onPress={() => {
                props.onTaskEvent(task,'view');
            }}
        >
            <View style={[styles.alignedRow, styles.paddingBottom4]}>
                <View style={styles.taskIcon}>
                    {getIcon(task.iconLibrary,task.iconName,20,'black')}
                </View>
                <View style={styles.alignedRow}>
                    <StyledText styles={styles} style={[styles.listItem, styles.fontSize2, styles.headerFont]}>{task.title}</StyledText>
                </View>
            </View>
        </Pressable>
    )

}