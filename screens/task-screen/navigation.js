import React, {useState,useEffect} from 'react';
import { View, Pressable, DeviceEventEmitter} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import StyledText from './../../components/StyledText';

import { styles } from '../../styles/styles';
import getIcon from '../../tools/Icons';
import ToDoList from './todo';
import AllTasklist from './tasklist';
import DataInspector from '../../DataInspector';
import IconPicker from '../../iconPicker';



export default function AppNavigation() {
    let test = test;

    const [selectedItem,setSelectedItem] = useState(0);
    const [expanded,setExpanded] = useState(false);

    const navigation = useNavigation();

    const openTaskEditor = () => {
        navigation.navigate('Editor',{action: 'new', mode: 'task'});
    }

    
    useEffect( () => {
        DeviceEventEmitter.addListener("event.navigationEvent", eventData => handleNavigationEvent(eventData));
    },[])

    const handleNavigationEvent = (eventData) => {
        switch (eventData.event) {
            case 'navigate':
                setSelectedItem(eventData.index);
                break;
        }
    }

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
            index: 1,
            title: `New`,
            iconFamily: 'Ionicons',
            iconName: 'ios-add-circle',
            bigIcon: true,
            onPress: openTaskEditor
        },
        {
            index: 3,
            title: `Planner`,
            iconFamily: 'FontAwesome5',
            iconName: 'calendar-alt',
            component: <IconPicker key={3}></IconPicker>
        },
        {
            index: 4,
            title: `Settings`,
            iconFamily: 'Ionicons',
            iconName: 'md-settings',
            component: <DataInspector key={4}></DataInspector>
        }
    ]

    const handleNavPress = (index) => {
        if (index != selectedItem)
            setSelectedItem(index);
    }

    const navigationWidget = navOptions.map( (navOption, index) => {
            return (
            <Pressable key={index} onPress={() => navOption.onPress ? navOption.onPress() : handleNavPress(navOption.index)} style={selectedItem == navOption.index ? styles.navOptionActive : styles.navOptionInactive }>
                {getIcon(navOption.iconFamily,navOption.iconName,navOption.bigIcon ? 48 : 24,selectedItem == navOption.index ? styles.gray : styles.gray3)}
                {!navOption.bigIcon && <StyledText style={selectedItem == navOption.index ? styles.navOptionTextActive : styles.navOptionTextInactive}>{navOption.title}</StyledText>}
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