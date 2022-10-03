import { useState, useEffect } from 'react';
import {ScrollView, View, Pressable, DeviceEventEmitter} from 'react-native';

import { useSelector } from 'react-redux';

import formatRelative from 'date-fns/formatRelative'

import TodoItem from "./todo-item";
import StyledText from "./../../components/StyledText";
import { SelectionList } from './../../components/Form';

import { styles } from '../../styles/styles';
import store from '../../redux/store';
import StyledProgressBar from '../../components/StyledProgressBar';
import getIcon from '../../tools/Icons';
import { setAppProperty } from '../../redux/data';

import { assignTasks } from '../../task/task-manager';

export default function ToDoList(navigation,route) {

    const status = useSelector(state => state.app.status);
    const taskList = useSelector(state => state.tasks.filter(task => task.assigned));

    const [designation,setDesignation] = useState(0);
    const [ambition,setAmbition] = useState(1);


    const handleCheckIn = () => {
        assignTasks(designation,ambition);
    }

    const toDoListItems = () => taskList
        .map( task => {
        return <TodoItem task={task} key={task.uniqid} styles={styles} navigation={navigation} compact={false}/>
    });

    
    const completedTasks = (store.getState().summaryCompletedTasks || 0);
    const deferredTasks = (store.getState().summaryDeferredTasks || 0);
    const missedTasks = (store.getState().summaryMissedTasks || 0);

    return (

        <View style={styles.container}>
            {status == 'CHECK-IN' ?
            <View>
                {store.getState().summaryDate && <View>
                    <StyledText style={styles.summaryHeaderText}>Summary for {formatRelative(store.getState().summaryDate,new Date())}</StyledText>
                    <StyledProgressBar
                        sections={[
                            {
                                color: styles.colors.teal4,
                                portion: completedTasks
                            },
                            {
                                color: styles.colors.blue3,
                                portion: deferredTasks
                            },
                            {
                                color: styles.colors.red2,
                                portion: missedTasks
                            }
                        ]}
                    />
                    <View style={[styles.alignedRow, styles.marginLeft5]}>
                        {getIcon('Ionicons','checkmark-sharp',30,styles.colors.teal)}
                        <StyledText style={[styles.summaryTaskText, styles.tealText]}>{completedTasks} TASKS COMPLETED</StyledText>
                    </View>
                    <View style={[styles.alignedRow, styles.marginLeft5]}>
                        {getIcon('AntDesign','arrowright',30,styles.colors.blue)}
                        <StyledText style={[styles.summaryTaskText, styles.blueText]}>{deferredTasks} TASKS DEFERED</StyledText>
                    </View>
                    <View style={[styles.alignedRow, styles.marginLeft5]}>
                        {getIcon('MaterialCommunityIcons','emoticon-sad-outline',30,styles.colors.red)}
                        <StyledText style={[styles.summaryTaskText, styles.redText]}>{missedTasks} TASKS MISSED</StyledText>
                    </View>
                </View>}
                <SelectionList styles={styles} data={'designation'} label={'WHAT KIND OF DAY IS IT?'} columns={3} selection={designation} onPress={setDesignation} orientation={'row'} iconStyle={2}
                    selections={[
                    {
                        index: 0,
                        stateValue: 0,
                        iconFamily: 'Entypo',
                        iconName: 'laptop',
                        iconSize: 20,
                        text: 'Work Day',
                        selectedStyle: styles.yellowHighlight,
                        deselectedStyle: styles.hiddenHighlight,
                        activeColor: 'teal'
                    },
                    {
                        index: 1,
                        stateValue: 1,
                        iconFamily: 'FontAwesome5',
                        iconName: 'balance-scale',
                        iconSize: 20,
                        text: 'Half Day',
                        selectedStyle: styles.greenHighlight,
                        deselectedStyle: styles.hiddenHighlight,
                        activeColor: 'teal'
                    },
                    {
                        index: 2,
                        stateValue: 2,
                        iconFamily: 'FontAwesome5',
                        iconName: 'coffee',
                        iconSize: 20,
                        text: 'Day Off',
                        selectedStyle: styles.blueHighlight,
                        deselectedStyle: styles.hiddenHighlight,
                        activeColor: 'teal'
                    }
                ]}></SelectionList>
                <SelectionList styles={styles} data={'ambition'} label={'HOW IS YOUR MOTIVATION TODAY?'} columns={3} selection={ambition} onPress={setAmbition} orientation={'row'} iconStyle={2}
                    selections={[
                    {
                        index: 0,
                        stateValue: 0,
                        iconFamily: 'MaterialCommunityIcons',
                        iconName: 'sleep',
                        iconSize: 20,
                        text: 'Lazy',
                        selectedStyle: styles.tealHighlight,
                        deselectedStyle: styles.hiddenHighlight,
                        activeColor: 'teal'
                    },
                    {
                        index: 1,
                        stateValue: 1,
                        iconFamily: 'Entypo',
                        iconName: 'man',
                        iconSize: 20,
                        text: 'Normal',
                        selectedStyle: styles.blueHighlight,
                        deselectedStyle: styles.hiddenHighlight,
                        activeColor: 'teal'
                    },
                    {
                        index: 2,
                        stateValue: 2,
                        iconFamily: 'MaterialCommunityIcons',
                        iconName: 'arm-flex',
                        iconSize: 20,
                        text: 'Ambitious',
                        selectedStyle: styles.pinkHighlight,
                        deselectedStyle: styles.hiddenHighlight,
                        activeColor: 'teal'
                    }
                ]}></SelectionList>
                <Pressable style={[styles.screenHeaderButton,styles.marginBottom6]} onPress={() => handleCheckIn()}><StyledText>Start the day!</StyledText></Pressable>
            </View>
            :
            <ScrollView style={styles.container}>
                {toDoListItems()}
            </ScrollView>}
        </View>
    )
}