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
        flex: 1,
    },
    container: {
        flex: 1,
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
    alignedRow: {
        flexDirection: 'row',
        alignItems: 'center'
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
    padding1: {
        padding: size1
    },
    padding2: {
        padding: size2
    },
    padding3: {
        padding: size3
    },
    padding4: {
        padding: size4
    },
    padding5: {
        padding: size5
    },
    paddingRight0: {
        paddingRight: 0
    },
    paddingRight3: {
        paddingRight: size3
    },
    paddingRight4: {
        paddingRight: size4
    },
    margin1: {
        margin: 1
    },
    margin2: {
        margin: 2
    },
    margin3: {
        margin: 3
    },
    margin4: {
        margin: 4
    },
    margin5: {
        margin: 5
    },
    marginTop2: {
        marginTop: size2
    },
    marginTop3: {
        marginTop: size3
    },
    marginTop4: {
        marginTop: size4
    },
    marginRight0: {
        marginRight: 0
    },
    marginVertical0: {
        marginTop: size0,
        marginBottom: size0
    },
    marginVertical1: {
        marginTop: size1,
        marginBottom: size1
    },
    marginVertical2: {
        marginTop: size2,
        marginBottom: size2
    },
    marginVertical3: {
        marginTop: size3,
        marginBottom: size3
    },
    marginVertical4: {
        marginTop: size4,
        marginBottom: size4
    },
    marginVertical5: {
        marginTop: size5,
        marginBottom: size5
    },
    alignItems: {
        alignItems: 'center'
    },
    justifyContent: {
        justifyContent: 'center'
    },
    fontSize000: {
        fontSize: 10
    },
    fontSize00: {
        fontSize: 12
    },
    fontSize0: {
        fontSize: 14
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
    flex100: {
        flex: 1,
        width: '100%'
    },
    autoWidth: {
        backgroundColor: 'pink'
    },
    bold: {
        fontWeight: '500'
    },
    lightText: {
        color: '#999'
    },
    checkBox: {
        margin: 5,
        padding: 8,
        borderColor: "black",
        borderWidth: 1
    },
    whiteBackground: {
        backgroundColor: 'white'
    },
    orangeAlert: {
        borderRadius: 16,
        borderWidth: 0.5,
        paddingLeft: size4,
        paddingRight: size4
    }
});
