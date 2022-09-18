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
import Tasklist from './task-screen';
import AllTasklist from './tasklist';



export default function AppNavigation() {
    const styles = definedStyles;

    const [selectedItem,setSelectedItem] = useState(0);
    const [expanded,setExpanded] = useState(false);

    const navOptions = [
        {
            index: 0,
            title: `To-Do List`,
            iconFamily: 'FontAwesome',
            iconName: 'list-alt',
            component: <ToDoList></ToDoList>
        },
        {
            index: 1,
            title: `All Tasks`,
            iconFamily: '',
            iconName: '',
            component: <AllTasklist></AllTasklist>
        }
    ]

    const handleNavPress = (index) => {
        if (index == selectedItem)
            setExpanded(!expanded);
        else{
            setSelectedItem(index);
            setExpanded(false);
        }
    }

    const navigationWidget = navOptions.map( (navOption) => {
            return (
            (selectedItem == navOption.index || expanded) && <Pressable onPress={() => handleNavPress(navOption.index)} style={selectedItem == navOption.index ? styles.navOptionActive : styles.navOptionInactive }>
                {expanded ? getIcon(navOption.iconFamily,navOption.iconName,30,styles.darkColor) : getIcon('Entypo','menu',30,styles.darkColor)}
                <StyledText styles={styles} style={styles.navOptionText}>{navOption.title}</StyledText>
            </Pressable> )
        });

    return (
        <View style={styles.container}>
            <View style={styles.navWidget}>
                {navigationWidget}
            </View>
            <View style={styles.navContent}>
                {navOptions[selectedItem].component}
            </View>
        </View>
    )
}