import { useState } from 'react';
import {ScrollView, View, Pressable, DeviceEventEmitter} from 'react-native';

import { useSelector } from 'react-redux';

import { format } from 'date-fns';

import TodoItem from "../../screens/home-screen/todo-item";
import StyledText from "./../../components/StyledText";
import { SelectionList } from './../../components/Form';

import { styles } from '../../styles/styles';

export default function ToDoList(navigation,route) {
    

    const taskList = useSelector(state => state.tasks.filter(task => task.assigned));

    const toDoListItems = () => taskList
        .map( task => {
        return <TodoItem task={task} key={task.uniqid} styles={styles} navigation={navigation} compact={false}/>
    });


    return (
        <ScrollView style={styles.container}>
            {toDoListItems()}
        </ScrollView>
    )
}