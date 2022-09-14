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

//const darkColor = '#383769'
//const darkColor2 = '#64629c'
//const darkColor3 = '#8e8cc1'

const darkColor = '#030a15'
const darkColor2 = '#3c4350'
const darkColor3 = '#6c717a'

const styleArray = {
    defaultText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16
    },
    headerFont: {
        fontFamily: 'Roboto-Medium',
    },
    screenHeader: {
        fontFamily: 'TitilliumWeb-Bold'
    },
    alertText: {
        fontSize: 10,
        color: '#555',
        fontFamily: 'TitilliumWeb-Bold'
    },
    alertIcon: {
        color: '#555'
    },
    scrollContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        width: '100%',
    },
    editField: {
        margin: size2,
        marginLeft: size4,
        marginRight: size4,
        flex: 1,
        paddingTop: size2,
        paddingBottom: size5
    },
    helpButton: {
        height: 24,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    helpElement: {
        margin: size4,
    },
    helpIcon: {
        height: 20,
        width: 20
    },
    helpText: {
        fontSize: 12,
        marginLeft: size3,
        marginBottom: size3,
        color: darkColor2
    },
    formSectionBorder: {
        
    },
    formFieldLabel: {
        marginBottom: size3,
        marginRight: size2,
        fontSize: 18,
        fontFamily: 'TitilliumWeb-Semibold',
        color: darkColor
    },
    textInputContainer: {
        width: '100%',
    },
    textInput: {
        textAlignVertical: 'top',
        minHeight: 40,
        padding: size4,
        width: 'auto',
        backgroundColor: 'white'
    },
    selected: {
        backgroundColor: '#fffe94'
    },
    selectionIcon: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: darkColor,
        borderWidth: size0,
        borderRadius: size3
    },
    
    selectionIconSmall: {
        height: 25,
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0
    },


    selectionIcon2: {
        height: 40,
        width: 40
    },
    selectionItem: {
        flexDirection: 'row',
        padding: size4
    },
    selectionText: {
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        color: darkColor
    },
    selectionSubtext: {
        fontSize: 12,
        color: darkColor2
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
    fill: {
        height: '100%',
        width: '100%'
    },
    capturedTasksContainer: {
        backgroundColor: 'white'
    },
    flexibleTasksContainer: {
        backgroundColor: 'yellow'
    },
    assignedTasksContainer: {
        backgroundColor: 'pink'
    },
    scheduledTasksContainer: {
        backgroundColor: 'cyan'
    },
    iconPlaceholder: {
        borderColor: darkColor,
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
    taskIcon: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: size3,
        backgroundColor: 'pink'
    },
    taskCountElement: {
        marginLeft: 8,
        backgroundColor: '#dfefef',
        color: darkColor
    },
    circleBorder: {
        textAlign: 'center',
        width: 20,
        height: 20,
        borderRadius: 20,
        borderColor: darkColor,
        borderWidth: 1
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
    centerText: {
        textAlign: 'center'
    },
    flex100: {
        flex: 1,
        width: '100%'
    },
    autoWidth: {
        backgroundColor: 'pink'
    },
    thin: {
        fontWeight: '300'
    },
    bold: {
        fontWeight: '500'
    },
    bolder: {
        fontWeight: '600'
    },
    lightText: {
        color: '#999'
    },
    thinBorder: {
        borderWidth: 0.5,
        borderRadius: size4
    },
    whiteBackground: {
        backgroundColor: 'white'
    },
    size80: {
        width: 80
    },
    width300: {
        width: 260
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    horizontalLine: {
        marginLeft: size2,
        marginRight: size2,
        flex: 1,
        height: 1,
        borderTopWidth: .5,
        borderColor: darkColor3
    },
    yellowBackground: {
        backgroundColor: '#f7ffca'
    },
    orangeBackground: {
        backgroundColor: '#ffeed3'
    },
    testBorder: {
        borderWidth: 0.5,
        borderColor: 'pink'
    },
    leftBorder: {
        borderLeftWidth: 0.5,
        borderStyle: 'dotted',
        borderColor: darkColor
    },
    
    leftBorder2: {
        borderLeftWidth: 2,
        borderColor: darkColor
    },
    horizontalBorders: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: darkColor
    },
    darkColor,
    darkColor2
}

const populateStyles = (property,includePositional) => {
    addSizeStyles(property,'');
    if(includePositional) {
        addSizeStyles(property,'Top');
        addSizeStyles(property,'Bottom');
        addSizeStyles(property,'Left');
        addSizeStyles(property,'Right');
        addSizeStyles(property,'Width');
        addSizeStyles(property,'Height');
        addSizeAxisStyles(property,'Horizontal','Left','Right');
        addSizeAxisStyles(property,'Vertical','Top','Bottom');
        addSizeAxisStyles(property,'Square','Width','Height');
    }
}

const addSizeStyles = (property, modifier) => {
    styleArray[property + modifier + '000'] = { [property + modifier]: size000 }
    styleArray[property + modifier + '00'] = { [property + modifier]: size00 }
    styleArray[property + modifier + '0'] = { [property + modifier]: size0 }
    styleArray[property + modifier + '1'] = { [property + modifier]: size1 }
    styleArray[property + modifier + '2'] = { [property + modifier]: size2 }
    styleArray[property + modifier + '3'] = { [property + modifier]: size3 }
    styleArray[property + modifier + '4'] = { [property + modifier]: size4 }
    styleArray[property + modifier + '5'] = { [property + modifier]: size5 }
    styleArray[property + modifier + '6'] = { [property + modifier]: size6 }
}

const addSizeAxisStyles = (property, reference ,modifier1, modifier2) => {
    styleArray[property + reference + '000'] = { [property + modifier1]: size000, [property + modifier2]: size000 }
    styleArray[property + reference + '00'] = { [property + modifier1]: size00, [property + modifier2]: size00 }
    styleArray[property + reference + '0'] = { [property + modifier1]: size0, [property + modifier2]: size0 }
    styleArray[property + reference + '1'] = { [property + modifier1]: size1, [property + modifier2]: size1 }
    styleArray[property + reference + '2'] = { [property + modifier1]: size2, [property + modifier2]: size2 }
    styleArray[property + reference + '3'] = { [property + modifier1]: size3, [property + modifier2]: size3 }
    styleArray[property + reference + '4'] = { [property + modifier1]: size4, [property + modifier2]: size4 }
    styleArray[property + reference + '5'] = { [property + modifier1]: size5, [property + modifier2]: size5 }
    styleArray[property + reference + '6'] = { [property + modifier1]: size6, [property + modifier2]: size6 }
}

populateStyles('padding',true);
populateStyles('margin',true);
populateStyles('borderWidth',true);
populateStyles('width',false);
populateStyles('height',false);
addSizeAxisStyles('','Square','Width','Height');

export const definedStyles = StyleSheet.create(styleArray);
