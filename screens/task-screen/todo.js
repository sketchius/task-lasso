import { useState, useEffect } from 'react';
import {ScrollView, View, Pressable, DeviceEventEmitter} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { format } from 'date-fns';

import TodoItem from "./todo-item";
import StyledText from "./../../components/StyledText";
import { SelectionList } from './../../components/Form';

import { styles } from '../../styles/styles';
import store from '../../redux/store';

export default function ToDoList(navigation,route) {
    const dispatch = useDispatch();

    const status = useSelector(state => state.status);
    const taskList = useSelector(state => state.tasks.filter(task => task.assigned));

    const [designation,setDesignation] = useState('work');
    const [ambition,setAmbition] = useState('normal');

    useEffect( () => {
        const updatedStatus = store.getState().status;
        console.log(`status = ${status}. updated status = ${updatedStatus}`)
    },[status])

    const handleCheckIn = () => {
        DeviceEventEmitter.emit("event.dayEvent", {event:'assignTasks', designation,ambition});
        dispatch({type:'day/dayStateChanged',payload: 'ASSIGNED'} )
    }

    const toDoListItems = () => taskList
        .map( task => {
        return <TodoItem task={task} key={task.uniqid} styles={styles} navigation={navigation} compact={false}/>
    });

    return (
        <View style={styles.container}>
            {status == 'CHECK-IN' ?
            <View styles={styles.testtt}>
                <SelectionList styles={styles} data={'designation'} label={'WHAT KIND OF DAY IS IT?'} selection={designation} onPress={setDesignation} orientation={'row'} iconStyle={2}
                    selections={[
                    {
                        index: 0,
                        stateValue: 0,
                        iconFamily: 'Entypo',
                        iconName: 'laptop',
                        iconSize: 20,
                        text: 'Work Day',
                        selectedStyle: styles.yellowHighlight,
                        deselectedStyle: styles.hiddenHighlight
                    },
                    {
                        index: 1,
                        stateValue: 1,
                        iconFamily: 'FontAwesome5',
                        iconName: 'balance-scale',
                        iconSize: 20,
                        text: 'Half Day',
                        selectedStyle: styles.greenHighlight,
                        deselectedStyle: styles.hiddenHighlight
                    },
                    {
                        index: 2,
                        stateValue: 2,
                        iconFamily: 'FontAwesome5',
                        iconName: 'coffee',
                        iconSize: 20,
                        text: 'Day Off',
                        selectedStyle: styles.blueHighlight,
                        deselectedStyle: styles.hiddenHighlight
                    }
                ]}></SelectionList>
                <SelectionList styles={styles} data={'ambition'} label={'HOW IS YOUR MOTIVATION TODAY?'} selection={ambition} onPress={setAmbition} orientation={'row'} iconStyle={2}
                    selections={[
                    {
                        index: 0,
                        stateValue: 0,
                        iconFamily: 'MaterialCommunityIcons',
                        iconName: 'sleep',
                        iconSize: 20,
                        text: 'Lazy',
                        selectedStyle: styles.tealHighlight,
                        deselectedStyle: styles.hiddenHighlight
                    },
                    {
                        index: 1,
                        stateValue: 1,
                        iconFamily: 'Entypo',
                        iconName: 'man',
                        iconSize: 20,
                        text: 'Normal',
                        selectedStyle: styles.blueHighlight,
                        deselectedStyle: styles.hiddenHighlight
                    },
                    {
                        index: 2,
                        stateValue: 2,
                        iconFamily: 'MaterialCommunityIcons',
                        iconName: 'arm-flex',
                        iconSize: 20,
                        text: 'Ambitious',
                        selectedStyle: styles.pinkHighlight,
                        deselectedStyle: styles.hiddenHighlight
                    }
                ]}></SelectionList>
                <Pressable style={[styles.screenHeaderButton,styles.marginBottom6]} onPress={() => handleCheckIn()}><StyledText>Start the day!</StyledText></Pressable>
            </View>
            :
            <ScrollView style={styles.container}>
                <StyledText>TO DO LIST:</StyledText>
                {toDoListItems()}
            </ScrollView>}
        </View>
    )
}