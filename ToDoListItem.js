import React, {useState} from 'react';
import {Text, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';


export default function ToDoListItem(props) {
    const task = props.task;

    const styles = props.styles;

    return (
    <View style={[styles.alignedRow, styles.marginVertical3, styles.whiteBackground]}>
        <View style={styles.padding5}><View style={styles.checkBox}></View></View>
        <View style={[styles.margin4, styles.paddingRight3, styles.flex100]}>
            <View style={styles.alignedRow}>
                <View style={styles.paddingRight4}>
                    <AntDesign name="car" size={20} color="black" />
                </View>
                <Text style={[styles.listItem, styles.fontSize2, styles.bold]}>{task.title}</Text>
            </View>
            {task.description && <Text style={[styles.fontSize0, styles.lightText]} numberOfLines={1}>{task.description}</Text>}
            <View style={[styles.alignedRow, styles.marginTop3]}>
                <View style={[styles.paddingRight4, styles.alignedRow]}><Octicons name="note" size={12} color="#aaa" /><Text style={styles.fontSize00}> 3</Text></View>
                <View style={styles.flex1}></View>
                <View style={styles.orangeAlert}>
                    <Text style={styles.fontSize000}>HIGH PRIORITY</Text>
                </View>
            </View>
        </View>
    </View> )
}