import { useState } from 'react';
import {ScrollView, View, Pressable, DeviceEventEmitter} from 'react-native';

import { useSelector } from 'react-redux';

import { format } from 'date-fns';

import StyledText from "./../../components/StyledText";
import { SelectionList } from './../../components/Form';

import { styles } from '../../styles/styles';
import Tasklist from '../task-screen/task-screen';
import AppNavigation from '../task-screen/navigation';

export default function Home(navigation,route) {
    

    const taskList = useSelector(state => state.tasks.filter(task => task.assigned));

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
                DeviceEventEmitter.emit("event.dayEvent", {event:'assignTasks', designation,ambition});
                setStatus('ASSIGNED');
                break;
            case 'end':
                route.params.onEndDay();
                break;
        }
    }


    return (
        <View>
            {status == 'CHECK-IN' &&
            <View styles={styles.testtt}>
                <SelectionList styles={styles} data={'designation'} label={'WHAT KIND OF DAY IS IT?'} columns={3} selection={designation} onPress={setDesignation} invert={true} orientation={'row'} iconStyle={2}
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
                <SelectionList styles={styles} data={'ambition'} label={'HOW IS YOUR MOTIVATION TODAY?'} columns={3} selection={ambition} onPress={setAmbition} invert={true} orientation={'row'} iconStyle={2}
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
            </View>}
            {status == 'CHECK-IN' && <Pressable style={[styles.screenHeaderButton,styles.marginBottom6]} onPress={() => handleInput('start')}><StyledText>Start the day!</StyledText></Pressable>}
            {false && status == 'ASSIGNED' && <Pressable style={[styles.screenHeaderButton,styles.marginBottom6]} onPress={() => handleInput('end')}><StyledText>End the day!</StyledText></Pressable>}
        </View>

      )

}