import StyledText from "./StyledText";

import ToDoListItem from "./ToDoListItem";

import {ScrollView, View, Pressable} from 'react-native';

import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { EditField, DateTimeComponent, SelectionList } from './Form';


export default function ToDoScreen(props) {
    const styles = props.styles;

    const taskList = useSelector(state => state.tasks);

    const toDoListItems = taskList.map( task => {
        return <ToDoListItem task={task} key={task.uniqid} styles={styles} onTaskEvent={props.onTaskEvent}/>
    });


    /*const taskList = props.tasks.filter(task => task.assigned)


    .sort((taskA, taskB) => taskB.score - taskA.score )
    .map(task => {
       
    //});*/

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
                props.onAssignTasks(designationSelection,ambitionSelection);
                break;
            case 'end':
                props.onEndDay();
                break;
        }
    }


    return (
        <View style={styles.container}>
            <View style={[styles.screenHeader, props.status == 'CHECK-IN' && styles.screenHeaderFullScreen]}>
                <View style={[styles.alignedRow, styles.justifyContent]}>
                    <StyledText styles={styles} style={styles.screenHeaderText}>{format(new Date(),'EEEE').toUpperCase()}</StyledText>
                    <View style={styles.screenHeaderDateView}>
                        <StyledText styles={styles} style={styles.screenHeaderDateText}>{format(new Date(),'MMM do')}</StyledText>
                        <StyledText styles={styles} style={styles.screenHeaderYearText}>{format(new Date(),'y')}</StyledText>
                    </View>
                </View>
                {props.status == 'CHECK-IN' &&
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
                {props.status == 'CHECK-IN' && <Pressable style={[styles.screenHeaderButton,styles.marginBottom6]} onPress={() => handleInput('start')}><StyledText styles={styles}>Start the day!</StyledText></Pressable>}
                {props.status == 'ASSIGNED' && <Pressable style={[styles.screenHeaderButton,styles.marginBottom6]} onPress={() => handleInput('end')}><StyledText styles={styles}>End the day!</StyledText></Pressable>}
            </View>
            {props.status == 'ASSIGNED' && <ScrollView style={styles.container}>
                {toDoListItems}
            </ScrollView>}
        </View>
      )

}