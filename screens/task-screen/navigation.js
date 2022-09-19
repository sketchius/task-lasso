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
            title: `To-Do`,
            iconFamily: 'MaterialCommunityIcons',
            iconName: 'clipboard-check-outline',
            component: <ToDoList key={0}></ToDoList>
        },
        {
            index: 1,
            title: `Tasks`,
            iconFamily: 'FontAwesome',
            iconName: 'list-ul',
            component: <AllTasklist key={1}></AllTasklist>
        },
        {
            index: 2,
            title: `New`,
            iconFamily: 'Ionicons',
            iconName: 'ios-add-circle',
            component: <AllTasklist key={2}></AllTasklist>
        },
        {
            index: 3,
            title: `Planner`,
            iconFamily: 'FontAwesome5',
            iconName: 'calendar-alt',
            component: <AllTasklist key={3}></AllTasklist>
        },
        {
            index: 4,
            title: `Settings`,
            iconFamily: 'Ionicons',
            iconName: 'md-settings',
            component: <AllTasklist key={4}></AllTasklist>
        }
    ]

    const handleNavPress = (index) => {
        if (index != selectedItem)
            setSelectedItem(index);
    }

    const navigationWidget = navOptions.map( (navOption) => {
            return (
            <Pressable onPress={() => handleNavPress(navOption.index)} style={selectedItem == navOption.index ? styles.navOptionActive : styles.navOptionInactive }>
                {getIcon(navOption.iconFamily,navOption.iconName,24,selectedItem == navOption.index ? styles.darkColor : styles.darkColor3)}
                <StyledText styles={styles} style={selectedItem == navOption.index ? styles.navOptionTextActive : styles.navOptionTextInactive}>{navOption.title}</StyledText>
            </Pressable> 
        )
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