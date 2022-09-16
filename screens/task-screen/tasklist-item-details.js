import { View, Pressable } from "react-native";

import differenceInHours from 'date-fns/differenceInHours'

import StyledText from './../../components/StyledText';
import getIcon from "./../../tools/Icons";
import { format } from 'date-fns';
import { getDateInContext, getTime } from "./../../tools/DateContext";

import { definedStyles } from './../../Styles';


export default function TasklistDetails(props) {
    const styles = definedStyles;
    const task = props.task;

    const taskTypeContent = (
        ( () => {
            switch (task.type) {
                case 'FLEXIBLE':
                    return (
                        <View style={[styles.taskDetailInfo]}><View style={styles.taskDetailIcon}>{getIcon('FontAwesome','arrows',12,styles.darkColor2)}</View>
                            <StyledText styles={styles} style={styles.taskDetailLabel}>FLEXIBLE TASK</StyledText>
                        </View>
                    )
                case 'DEADLINE':
                    return (
                        <View style={[styles.taskDetailInfo]}><View style={styles.taskDetailIcon}>{getIcon('Feather','calendar',12,styles.darkColor2)}</View>
                            <StyledText styles={styles} style={styles.taskDetailLabel}>DUE BY {getDateInContext(task.dateDue,false).toUpperCase()}</StyledText>
                        </View>
                    ) 
                case 'SCHEDULED':
                    const scheduledTime = getTime(task.dateDue);
                    const hoursAway = differenceInHours(task.dateDue,new Date());
                    return (
                        <View style={[styles.taskDetailInfo, hoursAway < 3 ? styles.redHighlight : styles.yellowHighlight]}><View style={styles.taskDetailIcon}>{getIcon('Octicons','clock',12,styles.darkColor2)}</View>
                            <StyledText styles={styles} style={styles.taskDetailLabel}>SCHEDULED TODAY{scheduledTime ? ` AT ${scheduledTime.toUpperCase()}` : ``}</StyledText>
                        </View>
                    )
                case 'REPEATING':
                    return (
                        <View style={[styles.taskDetailInfo]}><View style={styles.taskDetailIcon}>{getIcon('FontAwesome','refresh',12,styles.darkColor2)}</View>
                            <StyledText styles={styles} style={styles.taskDetailLabel}>REPEATING TASK</StyledText>
                        </View>
                    )
            }
        })()
    )

    const getPriorityElement = () => {
        switch (task.priority) {
            case 0:
                return (
                <View style={[styles.taskDetailInfo]}><View style={styles.taskDetailIcon}>{getIcon('AntDesign','minuscircleo',10,styles.darkColor2)}</View>
                    <StyledText styles={styles} style={styles.taskDetailLabel}>{'LOW PRIORITY'}</StyledText>
                </View>)
            case 1:
                return (
                <View style={[styles.taskDetailInfo]}><View style={styles.taskDetailIcon}>{getIcon('AntDesign','rightcircleo',10,styles.darkColor2)}</View>
                    <StyledText styles={styles} style={styles.taskDetailLabel}>{'MED PRIORITY'}</StyledText>
                </View>)
            case 2:
                return (
                <View style={[styles.taskDetailInfo]}><View style={styles.taskDetailIcon}>{getIcon('AntDesign','exclamationcircleo',10,styles.darkColor2)}</View>
                    <StyledText styles={styles} style={styles.taskDetailLabel}>{'HIGH PRIORITY'}</StyledText>
                </View>)
        }
    }

    return (
        <View style={[styles.container,styles.marginBottom3]}>
            <View>
                {task.description && <StyledText styles={styles} style={styles.taskDetailDescription} numberOfLines={4}>{task.description}</StyledText>}
                <View style={[styles.row, styles.marginLeft5]}>
                    <View>
                        {taskTypeContent}
                        {getPriorityElement()}
                        <View style={[styles.taskDetailInfo]}>
                            <View style={styles.taskDetailIcon}>{getIcon('Ionicons','time-outline',12,styles.darkColor2)}</View>
                            <StyledText styles={styles} style={styles.taskDetailLabel}>{`DURATION ${task.duration}m`}</StyledText>
                        </View>
                    </View>
                    <View style={styles.FlexiblehorizonalDivider}></View>
                    <View>
                        {task.dateDue && <View style={[styles.taskDetailInfo, styles.standard]}>
                            <StyledText styles={styles} style={styles.taskDetailLabel}>{`DUE`}</StyledText>
                            <StyledText styles={styles} style={styles.taskDetailValue}>{format(task.dateDue,'M/d/yyyy')}</StyledText>
                            
                        </View>}
                        {task.dateCreated && <View style={[styles.taskDetailInfo, styles.standard]}>
                            <StyledText styles={styles} style={styles.taskDetailLabel}>{`CREATED`}</StyledText>
                            <StyledText styles={styles} style={styles.taskDetailValue}>{format(task.dateCreated,'M/d/yyyy')}</StyledText>
                            
                        </View>}
                        {task.dateModified && <View style={[styles.taskDetailInfo, styles.standard]}>
                            <StyledText styles={styles} style={styles.taskDetailLabel}>{`MODIFIED`}</StyledText>
                            <StyledText styles={styles} style={styles.taskDetailValue}>{format(task.dateModified,'M/d/yyyy')}</StyledText>
                            
                        </View>}
                    </View>
                </View>
            </View>
            <View style={[styles.alignedRow, styles.spaceBetween, styles.marginVertical3, styles.width300]}>
                <Pressable style={[styles.size80, styles.alignItems, styles.thinBorder, styles.paddingVertical4]}>
                    {getIcon('FontAwesome','times',16,'black')}
                    <StyledText styles={styles} style={styles.paddingTop2}>Delete</StyledText>
                </Pressable>
                
                <Pressable style={[styles.size80, styles.alignItems, styles.thinBorder, styles.paddingVertical4]}>
                    {getIcon('Feather','edit',16,'black')}
                    <StyledText styles={styles} style={styles.paddingTop2}>Edit</StyledText>
                </Pressable>
                
                <Pressable style={[styles.size80, styles.alignItems, styles.thinBorder, styles.paddingVertical4]}>
                    {getIcon('AntDesign','arrowright',16,'black')}
                    <StyledText styles={styles} style={styles.paddingTop2}>Schedule</StyledText>
                </Pressable>
            </View>
        </View>
    )
}