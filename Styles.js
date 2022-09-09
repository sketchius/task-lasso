import { StyleSheet, StatusBar } from 'react-native';

const size000 = 0.125;
const size00 = 0.25;
const size0 = 0.5;
const size1 = 1;
const size2 = 2;
const size3 = 4;
const size4 = 8;
const size5 = 16;
const size6 = 32;

export const styles = StyleSheet.create({
    scrollContainer: {
        flex: size1,
    },
    container: {
        flex: size1,
        width: '100%',
    },
    test: {
        height: 'auto',
        backgroundColor: 'pink',
    },
    safe: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    button: {
        width: '20%',
        margin: size4,
    },
    row: {
        flexDirection: 'row'
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
        padding: 0
    },
    capturedTasksContainer: {
        backgroundColor: 'white'
    },
    openTasksContainer: {
        backgroundColor: 'yellow'
    },
    assignedTasksContainer: {
        backgroundColor: 'pink'
    },
    scheduledTasksContainer: {
        backgroundColor: 'cyan'
    },
    iconPlaceholder: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        width: 15,
        height: 15,
        marginRight: 10
    },
    dueElement: {
        backgroundColor: 'white',
        width: 'auto',
        padding: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 15
    },
    flex1: {
        flex: 1
    },
    taskCountElement: {
        marginLeft: 8,
        backgroundColor: '#dfefef',
        color: 'black'
    },
    circleBorder: {
        textAlign: 'center',
        width: 20,
        height: 20,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1
    },
    padding5: {
        padding: 16
    },
    paddingRight0: {
        paddingRight: 0
    },
    margin2: {
        margin: 2
    },
    marginTop4: {
        marginTop: 8
    },
    marginRight0: {
        marginRight: 0
    },
    alignItems: {
        alignItems: 'center'
    },
    justifyContent: {
        justifyContent: 'center'
    },
    fontSize0: {
        fontSize: 12
    },
    fontSize1: {
        fontSize: 16
    },
    fontSize2: {
        fontSize: 18
    },
    fontSize3: {
        fontSize: 20
    },
    fontSize4: {
        fontSize: 24
    },
    fontSize5: {
        fontSize: 32
    },
    fontSize6: {
        fontSize: 40
    },
    bold: {
        fontWeight: '500'
    }
});
