import { ScrollView } from "react-native";

export default function TaskDetails(props) {
    const styles = props.styles;
    const task = props.task;

    const taskTypeContent = (
        ( () => {
            switch (task.type) {
                case 'FLEXIBLE':
                    if (expanded){
                    return (
                        <View style={[styles.taskTypeElement]}>{getIcon('FontAwesome','arrows',12,styles.darkColor2)}
                            <StyledText styles={styles} style={styles.taskTypeText}>FLEXIBLE TASK</StyledText>
                        </View>
                    ) }
                    else return undefined;
                case 'DEADLINE':
                    return (
                        <View style={[styles.taskTypeElement]}>{getIcon('Feather','calendar',12,styles.darkColor2)}
                            <StyledText styles={styles} style={styles.taskTypeText}>DUE BY {getDateInContext(task.dateDue,false).toUpperCase()}</StyledText>
                        </View>
                    ) 
                case 'SCHEDULED':
                    const scheduledTime = getTime(task.dateDue);
                    const hoursAway = differenceInHours(task.dateDue,new Date());
                    return (
                        <View style={[styles.taskTypeElement, hoursAway < 3 ? styles.redHighlight : styles.yellowHighlight]}>{getIcon('Octicons','clock',12,styles.darkColor2)}
                            <StyledText styles={styles} style={styles.taskTypeText}>SCHEDULED TODAY{scheduledTime ? ` AT ${scheduledTime.toUpperCase()}` : ``}</StyledText>
                        </View>
                    )
                case 'REPEATING':
                    if (expanded){
                    return (
                        <View style={[styles.taskTypeElement]}>{getIcon('FontAwesome','refresh',12,styles.darkColor2)}
                            <StyledText styles={styles} style={styles.taskTypeText}>REPEATING TASK</StyledText>
                        </View>
                    ) }
                    else return undefined;
            }
        })()
    )

    const getPriorityText = (priority) => {
        switch (priority) {
            case '0':
                return 'LOW PRIORITY';
            case '1':
                return 'MED PRIORITY';
            case '2':
                return 'HI PRIORITY';
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.alignedRow}>
                    <View style={styles.taskIcon}>
                        {getIcon(task.iconLibrary,task.iconName,20,'black')}
                    </View>
                    <View style={styles.alignedRow}>
                        <StyledText styles={styles} style={[styles.listItem, styles.fontSize2, styles.headerFont]}>{task.title}</StyledText>
                    </View>
                </View>
                <StyledText styles={styles} style={[styles.fontSize00, styles.lightText]} numberOfLines={expanded ? 4 : 1}>{task.description}</StyledText>
                <View style={styles.row}>
                    <View>
                        {taskTypeContent}
                        <View style={[styles.taskTypeElement]}>{getIcon('AntDesign','exclaimationcircleo',12,styles.darkColor2)}
                                <StyledText styles={styles} style={styles.taskTypeText}>{getPriorityText(task.priority)}</StyledText>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}