import { useState, useEffect } from 'react';
import { Pressable, View, Text } from "react-native";

import StyledText from './../../components/StyledText';
import TasklistDetails from './tasklist-item-details';
import {getDateInContext} from './../../tools/DateContext';
import getIcon from "./../../tools/Icons";

import { definedStyles } from './../../Styles';



export default function TasklistItem(props) {
    const styles = definedStyles;
    const task = props.task;

    const [expanded,setExpanded] = useState(props.expanded);

    useEffect( () => {
        setExpanded(props.expanded);
    },[props.expanded])
    

    let dueElement;
    if (props.showDate) {
        dueElement = <View style={[styles.dueElement]}><Text style={[styles.defaultText, styles.fontSize0]}>{getDateInContext(task.dateDue,task.useTime)}</Text></View>
    }

    return (
        <Pressable style={[styles.topBorder, styles.paddingHorizontal5]}
            onPress={() => {
                setExpanded(!expanded);
            }}
        >
            <View style={[styles.alignedRow, styles.padding2]}>
                <View style={expanded ? styles.taskIcon : styles.taskIcon}>
                    {getIcon(task.iconLibrary,task.iconName,expanded ? 20 : 20,'black')}
                </View>
                <View style={styles.alignedRow}>
                    <StyledText styles={styles} style={[styles.listItem, expanded ? styles.fontSize2 : styles.fontSize2, styles.headerFont]}>{task.title}</StyledText>
                </View>
            </View>
            {expanded && <TasklistDetails task={task}/>}
        </Pressable>
    )
}