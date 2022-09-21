import { useState } from 'react';
import {ScrollView, View, Pressable, DeviceEventEmitter} from 'react-native';

import { useSelector } from 'react-redux';

import { format } from 'date-fns';

import TodoItem from "../../screens/home-screen/todo-item";
import StyledText from "./../../components/StyledText";
import { SelectionList } from './../../components/Form';

import { styles } from '../../styles/styles';
import Tasklist from '../task-screen/task-screen';
import AppNavigation from '../task-screen/navigation';

export default function Home(navigation,route) {
    

    const taskList = useSelector(state => state.tasks.filter(task => task.assigned));

    const toDoListItems = () => taskList
        .map( task => {
        return <TodoItem task={task} key={task.uniqid} styles={styles} navigation={navigation}/>
    });

    const [status,setStatus] = useState('CHECK-IN');

    const [designation,setDesignation] = useState('work');
    const [ambition,setAmbition] = useState('normal');

    //.map(task => {
       
    //});

    let designationSelection = 0;
    let ambitionSelection = 1;

    const handleInput = ( parameter, value ) => {
        
        switch (parameter) {
            case 'designation':
                designationSelection = value;
                break;
            case 'ambition':
                ambitionSelection = value;
                break;
            case 'start':
                DeviceEventEmitter.emit("event.dayEvent", {event:'assignTasks', designation:designationSelection,ambition:ambitionSelection});
                setStatus('ASSIGNED');
                break;
            case 'end':
                route.params.onEndDay();
                break;
        }
    }


    return (
        <View style={styles.container}>
            <View style={[styles.screenHeader, status == 'CHECK-IN' && styles.screenHeaderFullScreen]}>
                <View style={[styles.alignedRow, styles.justifyContent]}>
                    <StyledText style={styles.screenHeaderText}>{format(new Date(),'EEEE').toUpperCase()}</StyledText>
                    <View style={styles.screenHeaderDateView}>
                        <StyledText style={styles.screenHeaderDateText}>{format(new Date(),'MMM do')}</StyledText>
                        <StyledText style={styles.screenHeaderYearText}>{format(new Date(),'y')}</StyledText>
                    </View>
                </View>
                {status == 'CHECK-IN' &&
                <View styles={styles.testtt}>
                    <SelectionList styles={styles} data={'designation'} label={'WHAT KIND OF DAY IS IT?'} selection={designation} onPress={setDesignation} invert={true} orientation={'row'} onChange={handleInput} iconStyle={2}
                        selections={[
                        {
                            index: 0,
                            stateValue: 'work',
                            iconFamily: 'Entypo',
                            iconName: 'laptop',
                            iconSize: 20,
                            text: 'Work Day',
                            selectedStyle: styles.yellowHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 1,
                            stateValue: 'half',
                            iconFamily: 'FontAwesome5',
                            iconName: 'balance-scale',
                            iconSize: 20,
                            text: 'Half Day',
                            selectedStyle: styles.greenHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 2,
                            stateValue: 'off',
                            iconFamily: 'FontAwesome5',
                            iconName: 'coffee',
                            iconSize: 20,
                            text: 'Day Off',
                            selectedStyle: styles.blueHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        }
                    ]}></SelectionList>
                    <SelectionList styles={styles} data={'ambition'} label={'HOW IS YOUR MOTIVATION TODAY?'} selection={ambition} onPress={setAmbition} invert={true} orientation={'row'} onChange={handleInput} iconStyle={2}
                        selections={[
                        {
                            index: 0,
                            stateValue: 'lazy',
                            iconFamily: 'MaterialCommunityIcons',
                            iconName: 'sleep',
                            iconSize: 20,
                            text: 'Lazy',
                            selectedStyle: styles.tealHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 1,
                            stateValue: 'normal',
                            iconFamily: 'Entypo',
                            iconName: 'man',
                            iconSize: 20,
                            text: 'Normal',
                            selectedStyle: styles.blueHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        },
                        {
                            index: 2,
                            stateValue: 'ambitious',
                            iconFamily: 'MaterialCommunityIcons',
                            iconName: 'arm-flex',
                            iconSize: 20,
                            text: 'Ambitious',
                            selectedStyle: styles.pinkHighlight,
                            deselectedStyle: styles.hiddenHighlight
                        }
                    ]}></SelectionList>
                </View>}
                {status == 'CHECK-IN' && <Pressable style={[styles.screenHeaderButton,styles.marginBottom6]} onPress={() => handleInput('start')}><StyledText>Start the day!</StyledText></Pressable>}
                {false && status == 'ASSIGNED' && <Pressable style={[styles.screenHeaderButton,styles.marginBottom6]} onPress={() => handleInput('end')}><StyledText>End the day!</StyledText></Pressable>}
            </View>
            <AppNavigation></AppNavigation>
        </View>
      )

}