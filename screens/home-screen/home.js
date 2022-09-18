import { useState } from 'react';
import {ScrollView, View, Pressable, DeviceEventEmitter} from 'react-native';

import { useSelector } from 'react-redux';

import { format } from 'date-fns';

import TodoItem from "../../screens/home-screen/todo-item";
import StyledText from "./../../components/StyledText";
import { SelectionList } from './../../components/Form';

import { definedStyles } from './../../Styles';
import Tasklist from '../task-screen/task-screen';
import AppNavigation from '../task-screen/navigation';

export default function Home(navigation,route) {
    const styles = definedStyles;

    const taskList = useSelector(state => state.tasks.filter(task => task.assigned));

    const toDoListItems = () => taskList
        .map( task => {
        return <TodoItem task={task} key={task.uniqid} styles={styles} navigation={navigation}/>
    });

    const [status,setStatus] = useState('CHECK-IN');



   
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
                    <StyledText styles={styles} style={styles.screenHeaderText}>{format(new Date(),'EEEE').toUpperCase()}</StyledText>
                    <View style={styles.screenHeaderDateView}>
                        <StyledText styles={styles} style={styles.screenHeaderDateText}>{format(new Date(),'MMM do')}</StyledText>
                        <StyledText styles={styles} style={styles.screenHeaderYearText}>{format(new Date(),'y')}</StyledText>
                    </View>
                </View>
                {status == 'CHECK-IN' &&
                <View styles={styles.testtt}>
                    <SelectionList styles={styles} data={'designation'} label={'WHAT KIND OF DAY IS IT?'} defaultSelection={0} invert={true} orientation={'row'} onChange={handleInput} iconStyle={2}
                        selections={[
                        {
                            index: 0,
                            iconFamily: 'Entypo',
                            iconName: 'laptop',
                            iconSize: 20,
                            text: 'Work Day'
                        },
                        {
                            index: 1,
                            iconFamily: 'FontAwesome5',
                            iconName: 'balance-scale',
                            iconSize: 20,
                            text: 'Half Day'
                        },
                        {
                            index: 2,
                            iconFamily: 'FontAwesome5',
                            iconName: 'coffee',
                            iconSize: 20,
                            text: 'Day Off'
                        }
                    ]}></SelectionList>
                    <SelectionList styles={styles} data={'ambition'} label={'HOW IS YOUR MOTIVATION TODAY?'} defaultSelection={1} invert={true} orientation={'row'} onChange={handleInput} iconStyle={2}
                        selections={[
                        {
                            index: 0,
                            iconFamily: 'MaterialCommunityIcons',
                            iconName: 'sleep',
                            iconSize: 20,
                            text: 'Lazy'
                        },
                        {
                            index: 1,
                            iconFamily: 'Entypo',
                            iconName: 'man',
                            iconSize: 20,
                            text: 'Normal'
                        },
                        {
                            index: 2,
                            iconFamily: 'MaterialCommunityIcons',
                            iconName: 'arm-flex',
                            iconSize: 20,
                            text: 'Ambitious'
                        }
                    ]}></SelectionList>
                </View>}
                {status == 'CHECK-IN' && <Pressable style={[styles.screenHeaderButton,styles.marginBottom6]} onPress={() => handleInput('start')}><StyledText styles={styles}>Start the day!</StyledText></Pressable>}
                {false && status == 'ASSIGNED' && <Pressable style={[styles.screenHeaderButton,styles.marginBottom6]} onPress={() => handleInput('end')}><StyledText styles={styles}>End the day!</StyledText></Pressable>}
            </View>
            <AppNavigation></AppNavigation>
        </View>
      )

}