import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable, Button} from 'react-native';
import {getDateInContext,getTime} from './DateContext';
import getIcon from './Icons';
import StyledText from './StyledText';

export default function TaskListScreen(props) {

    const styles = props.styles;

    const filterTaskList = (type, showDate, dateSemantics) => {
        return props.tasks.filter(task => task.type === type).map(task => {
            let dueElement;
    
            if (showDate) {
                dueElement = <View style={[styles.dueElement]}><Text style={[styles.defaultText, styles.fontSize0]}>{dateSemantics} {getDateInContext(task.dateDue,task.useTime)}</Text></View>
            }

            let expandedContent;

            if (task.uniqid === expandedTaskID) {
                expandedContent = 
                <View>
                    <Text style={styles.defaultText}>{task.description}</Text>
                    <Button title='Edit'/>
                </View>
            }
    
            return (
                <Pressable
                    onPress={() => {
                        task.uniqid !== expandedTaskID ? setExpandedTaskID(task.uniqid) : setExpandedTaskID(-1);
                    }}
                >
                    <View style={[styles.alignedRow, styles.paddingBottom4]}>
                        <View style={styles.taskIcon}>
                            {getIcon(task.iconLibrary,task.iconName,20,'black')}
                        </View>
                        <StyledText styles={styles} style={[styles.listItem, styles.fontSize2, styles.headerFont]}>{task.title}</StyledText>
                    </View>
                    {expandedContent}
                    
                </Pressable>
            )
        });
    }

    const getTaskListElement = (taskList) => {
        return <View style={styles.marginTop4}>{taskList}</View>
    }

    const getSectionTaskCountElement = (taskList) => {
        return <Text style={[styles.defaultText, styles.circleBorder, styles.taskCountElement]}>{taskList.length}</Text>
    }

    const [expandedTaskID,setExpandedTaskID] = useState(-1);
    const [sectionExpansion,setSectionExpansion] = useState([true,true,true,true]);

    const capturedTaskList = filterTaskList('CAPTURED',false);
    const flexibleTaskList = filterTaskList('FLEXIBLE',false);
    const assignedTaskList = filterTaskList('DEADLINE',true,'by');
    const scheduledTaskList = filterTaskList('SCHEDULED',true,'');

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
    

    return (
        <ScrollView style={styles.scrollContainer}>
            {capturedTaskElement} 
            {flexibleTaskElement} 
            {deadlineTaskElement}
            {scheduledTaskElement}
        </ScrollView>
    )
}