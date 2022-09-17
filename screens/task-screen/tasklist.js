import React, {useState,useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import StyledText from './../../components/StyledText';
import TasklistSection from './../../screens/task-screen/tasklist-section';

import { definedStyles } from './../../Styles';


export default function Tasklist({navigation, route}) {


    let styles = definedStyles;



    const getTaskListElement = (taskList) => {
        return <View style={styles.marginTop4}>{taskList}</View>
    }

    const getSectionTaskCountElement = (taskList) => {
        return <Text style={[styles.defaultText, styles.circleBorder, styles.taskCountElement]}>{taskList.length}</Text>
    }



    const [expandedTaskID,setExpandedTaskID] = useState(-1);
    const [sectionExpansion,setSectionExpansion] = useState([true,true,true,true]);

    const onTaskEvent = (task, action) => {
        navigation.navigate('Tasks', {
            screen: 'Details',
            params: { task },
          });
    }
    
    const isFocused = useIsFocused()

    useEffect(() => {
            setExpandedTaskID(route.params ? route.params.expandedId : -1);
        } , [isFocused])
    

    const sections = [
        <TasklistSection type={'CAPTURED'} key={0} showDate={false} styles={styles} onTaskEvent={onTaskEvent} expandedId={expandedTaskID}/>,
        <TasklistSection type={'FLEXIBLE'} key={1} showDate={false} styles={styles}  onTaskEvent={onTaskEvent} expandedId={expandedTaskID}/>,
        <TasklistSection type={'DEADLINE'} key={2} showDate={true} styles={styles}  onTaskEvent={onTaskEvent} expandedId={expandedTaskID}/>,
        <TasklistSection type={'SCHEDULED'} key={3} showDate={true} styles={styles}  onTaskEvent={onTaskEvent} expandedId={expandedTaskID}/>,
        <TasklistSection type={'REPEATING'} key={4} showDate={true} styles={styles}  onTaskEvent={onTaskEvent} expandedId={expandedTaskID}/>
    ]
/*
    const capturedTaskElement = 
        <Pressable 
            style={[styles.capturedTasksContainer, styles.padding5, styles.paddingVertical4]}
            onPress={() => {
                const newArray = [...sectionExpansion];
                newArray[0] = !newArray[0];
                setSectionExpansion(newArray);
        }}>
            <View style={[styles.row, styles.alignItems]}><Text style={[styles.defaultText, styles.taskListSectionHeader, styles.fontSize3, styles.marginRight4, styles.bold]}>CAPTURED TASKS</Text>{!sectionExpansion[0] && getSectionTaskCountElement(capturedTaskList)}
                <View style={styles.horizontalLine}/>
            </View>
            {sectionExpansion[0] && getTaskListElement(capturedTaskList)}
        </Pressable>;

    const flexibleTaskElement =
        <Pressable 
            style={[styles.flexibleTasksContainer, styles.padding5, styles.paddingVertical3]}
            onPress={() => {
                const newArray = [...sectionExpansion];
                newArray[1] = !newArray[1];
                setSectionExpansion(newArray);
        }}>
            <View style={[styles.row, styles.alignItems]}><Text style={[styles.defaultText, styles.taskListSectionHeader, styles.fontSize3, styles.marginRight4, styles.bold]}>FLEXIBLE TASKS</Text>{!sectionExpansion[1] && getSectionTaskCountElement(flexibleTaskList)}
                <View style={styles.horizontalLine}/>
            </View>
            {sectionExpansion[1] && getTaskListElement(flexibleTaskList)}
        </Pressable>;

    const deadlineTaskElement =
        <Pressable 
            style={[styles.assignedTasksContainer, styles.padding5, styles.paddingVertical3]}
            onPress={() => {
                const newArray = [...sectionExpansion];
                newArray[2] = !newArray[2];
                setSectionExpansion(newArray);
        }}>
            <View style={[styles.row, styles.alignItems]}><Text style={[styles.defaultText, styles.taskListSectionHeader, styles.fontSize3, styles.marginRight4, styles.bold]}>DEADLINE TASKS</Text>{!sectionExpansion[2] && getSectionTaskCountElement(assignedTaskList)}
                <View style={styles.horizontalLine}/>
            </View>
            {sectionExpansion[2] && getTaskListElement(assignedTaskList)}
        </Pressable>;

    const scheduledTaskElement =
         <Pressable 
            style={[styles.scheduledTasksContainer, styles.padding5, styles.paddingVertical3]}
            onPress={() => {
                const newArray = [...sectionExpansion];
                newArray[3] = !newArray[3];
                setSectionExpansion(newArray);
        }}>
            <View style={[styles.row, styles.alignItems]}><Text style={[styles.defaultText, styles.taskListSectionHeader, styles.fontSize3, styles.marginRight4, styles.bold]}>SCHEDULED TASKS</Text>{!sectionExpansion[3] && getSectionTaskCountElement(scheduledTaskList)}
                <View style={styles.horizontalLine}/>
            </View>
            {sectionExpansion[3] && getTaskListElement(scheduledTaskList)}
        </Pressable>;
        */
    

    return (
        <View style={styles.container}>
                        <View style={[styles.screenHeader]}>
                <View style={[styles.alignedRow, styles.justifyContent]}>
                    <StyledText styles={styles} style={styles.screenHeaderText}>TASK INVENTORY</StyledText>
                </View>
            </View>
            <ScrollView style={styles.scrollContainer}>
                {sections}
            </ScrollView>
        </View>
    )
}