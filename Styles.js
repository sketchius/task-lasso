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

const darkColor = '#030a15';
const darkColor2 = '#3c4350';
const darkColor3 = '#6c717a';

const yellow3 = '#feffba';
const green3 = '#dbffdd';
const pink3 = '#ffe1f0';
const blue3 = '#dae5ff';
const red3 = '#ffe1e1';

const styleArray = {
    defaultText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16
    },
    headerFont: {
        fontFamily: 'Roboto-Medium',
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
    screenHeader: {
        backgroundColor: darkColor,
        padding: size5,
        borderBottomWidth: 3,
        borderBottomColor: '#fffe94'
    },
    screenHeaderFullScreen: {
        height: '100%',
        justifyContent: 'space-between'
    },
    screenHeaderText: {
        fontFamily: 'TitilliumWeb-Regular',
        marginRight: size2,
        fontSize: 40,
        color: 'white'
    },
    screenHeaderDateView: {
        marginTop: size3,
        marginLeft: size3,
        justifyContent: 'center',
        borderLeftWidth: 0.5,
        borderColor: 'white',
        paddingLeft: size4
    },
    screenHeaderDateText: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 12,
        color: 'white'
    },
    screenHeaderYearText: {
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 12,
        color: 'white'
    },
    screenHeaderGreetingText: {
        fontSize: 48,
        color: 'white'
    },
    screenHeaderButton: {
        backgroundColor: '#fffe94',
        padding: size5,
        alignSelf: 'center',
        borderRadius: size3
    },
    editField: {
        margin: size2,
        marginLeft: size4,
        marginRight: size4,
        height: 'auto',
        paddingTop: size2,
        paddingBottom: size5
    },
    whiteText: {
        color: 'white'
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
    formFieldLabel: {
        marginBottom: size3,
        marginRight: size2,
        fontSize: 18,
        fontFamily: 'TitilliumWeb-Semibold',
        color: darkColor
    },
    formFieldLabelWhite: {
        marginBottom: size3,
        marginRight: size2,
        fontSize: 18,
        fontFamily: 'TitilliumWeb-Semibold',
        color: 'white'
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
    whiteBackground: {
        backgroundColor: 'white'
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
    wrap: {
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    selectionIcon2: {
        height: 40,
        width: 40
    },
    selectionItemColumn: {
        flexDirection: 'row',
        padding: size4
    },
    selectionItemRow: {
        width: '31%',
        flexDirection: 'column',
        alignItems: 'center',
        padding: size4
    },
    selectionText: {
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        color: darkColor
    },
    selectionTextSmall: {
        fontSize: 14,
        fontFamily: 'Roboto-Medium',
        color: darkColor
    },
    selectionSubtext: {
        fontSize: 12,
        color: darkColor2
    },
    taskTypeElement: {
        paddingLeft: size1,
        paddingRight: size1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    taskTypeText: {
        marginLeft: size2,
        fontSize: 10,
        color: darkColor3,
        fontFamily: 'TitilliumWeb-Bold'    
    },
    taskDetailDescription: {
        fontSize: 16,
        color: darkColor2
    },
    taskDetailInfo: {
        paddingLeft: size1,
        paddingRight: size1,
        padding: size2,
        alignItems: 'center',
        flexDirection: 'row'
    },
    taskDetailIcon: {
        width: 14,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskDetailLabel: {
        marginLeft: size2,
        fontSize: 12,
        color: darkColor3,
        fontFamily: 'TitilliumWeb-Bold'   
    },
    taskDetailValue: {
        marginLeft: size2,
        fontSize: 14,
        color: darkColor
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
    standard: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    alignedRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    centerSelf: {
        alignSelf: 'center'
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
    taskListSectionHeader: {
        fontFamily: 'TitilliumWeb-Bold'
    },
    taskListItemRow: {
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    capturedTasksContainer: {
        backgroundColor: 'white',
        marginTop: size4,
        borderTopWidth: size0,
        borderBottomWidth: size0,
        borderColor: darkColor
    },
    flexibleTasksContainer: {
        backgroundColor: 'white',
        marginTop: size4,
        borderTopWidth: size0,
        borderBottomWidth: size0,
        borderColor: darkColor
    },
    assignedTasksContainer: {
        backgroundColor: 'white',
        marginTop: size4,
        borderTopWidth: size0,
        borderBottomWidth: size0,
        borderColor: darkColor
    },
    scheduledTasksContainer: {
        backgroundColor: 'white',
        marginTop: size4,
        borderTopWidth: size0,
        borderBottomWidth: size0,
        borderColor: darkColor
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
        height: 24,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: size3
    },
    taskIconLarge: {
        height: 36,
        width: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: size3
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
    bottomBorder: {
        borderTopWidth: 0.25,
        borderTopColor: darkColor3,
    },
    whiteBackground: {
        backgroundColor: 'white'
    },
    size80: {
        width: '32%'
    },
    width300: {
        width: '100%'
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
    horizontalLineWhite: {
        marginLeft: size2,
        marginRight: size2,
        flex: 1,
        height: 1,
        borderTopWidth: .5,
        borderColor: 'white'
    },
    FlexiblehorizonalDivider: {
        borderLeftWidth: .5,
        marginLeft: size4,
        marginRight: size4,
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
        borderColor: darkColor3
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
    yellowHighlight: {
        backgroundColor: yellow3
    },
    greenHighlight: {
        backgroundColor: green3
    },
    pinkHighlight: {
        backgroundColor: pink3
    },
    blueHighlight: {
        backgroundColor: blue3
    },
    redHighlight: {
        backgroundColor: red3
    },
    darkColor,
    darkColor2,
    darkColor3,
    yellow3,
    green3,
    pink3,
    blue3,
    red3,
    whiteColor: 'white'
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
