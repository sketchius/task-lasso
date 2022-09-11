import ToDoListItem from "./ToDoListItem";

import {ScrollView} from 'react-native';

export default function ToDoScreen(props) {
    const styles = props.styles;

    const taskList = props.tasks.filter(task => task.assigned).map(task => {
        return <ToDoListItem task={task} styles={styles} onTaskEvent={props.onTaskEvent}/>
      });


      return (
        <ScrollView style={styles.container}>
            {taskList}
        </ScrollView>
      )

}