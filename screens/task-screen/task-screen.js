import React, {useState,useEffect} from 'react';
import {ScrollView, View, Pressable, DeviceEventEmitter} from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { format } from 'date-fns';
import StyledText from './../../components/StyledText';

import TodoItem from "../../screens/home-screen/todo-item"
import TasklistSection from './../../screens/task-screen/tasklist-section';

import { definedStyles } from './../../Styles';
import getIcon from '../../tools/Icons';
import ToDoList from './todo';



export default function Tasklist({navigation, route}) {
    const styles = definedStyles;

    const [tab,setTab] = useState(0);

    const taskList = useSelector(state => state.tasks.filter(task => task.assigned));

    const status = useSelector(state => state.status)

    const toDoListItems = () => taskList
        .map( task => {
        return <TodoItem task={task} key={task.uniqid} styles={styles} navigation={navigation}/>
    });

    return (
        <View style={styles.taskScreen}>
            <View style={[styles.taskScreenHeader]}>
                <View style={[styles.row, styles.spaceEvenly]}>
                    <Pressable onPress={() => setTab(0)} style={tab == 0 ? styles.taskTabActive : styles.taskTabInactive}>
                        {//getIcon('Feather','check-square',24,styles.darkColor)}
                        }
                        <StyledText styles={styles} style={styles.taskScreenHeaderText}>TO-DO LIST</StyledText>
                    </Pressable>
                    <Pressable onPress={() => setTab(1)} style={tab == 1 ? styles.taskTabActive : styles.taskTabInactive}>
                        {//getIcon('FontAwesome','list-ul',24,styles.darkColor)}
                        }
                        <StyledText styles={styles} style={styles.taskScreenHeaderText}>ALL TASKS</StyledText>
                    </Pressable>
                </View>
            </View>
            <ToDoList></ToDoList>
        </View>
    )
}