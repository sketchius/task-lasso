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

const darkColor = '#000000';
const darkColor2 = '#424242';
const darkColor3 = '#787878';
const darkColor4 = '#a6a6a6';
const darkColor5 = '#d1d1d1';
const darkColor6 = '#dbdbdb';

const red3 = '#ffe1e1';
const orange3 = '#ffe7cd';
const yellow3 = '#feffcf';
const teal3 = '#c3feff';
const green3 = '#dbffdd';
const blue3 = '#dae5ff';
const pink3 = '#ffe1f0';

const blue1 = '#97a8d1';

const yellow = '#fdff48';

const orange2 = '#e2b590';
const yellow2 = '#e1d890';
const green2 = '#a5e9aa';
const teal2 = '#53daea';
const blue2 = '#b5c4e8';

const styleArray = {
    defaultText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16
    },
    headerFont: {
        fontFamily: 'Roboto-Medium',
        color: darkColor
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
        width: '100%'
    },
    navWidget: {
        flexDirection: 'row',
        borderTopWidth: .25,
        borderBottomWidth: 2,
        borderColor: darkColor
    },
    navOptionActive: {
        width: '20%',
        alignItems: 'center',
        padding: size3,
        backgroundColor: 'white'
    },
    navOptionInactive: {
        width: '20%',
        alignItems: 'center',
        padding: size3,
        backgroundColor: 'white'
    },
    navOptionTextActive: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        paddingLeft: size2,
        paddingRight: size2,
        color: darkColor,
        backgroundColor: teal3,
        borderLeftWidth: .75,
        borderRightWidth: .75,
        borderRadius: size2,
        borderColor: teal2
    },
    navOptionTextInactive: {
        fontFamily: 'Roboto-Medium',
        paddingLeft: size2,
        paddingRight: size2,
        fontSize: 14,
        color: darkColor3,
        borderLeftWidth: .75,
        borderRightWidth: .75,
        borderRadius: size2,
        borderColor: 'white'
    },
    navContent: {
        flex: 1,
        width: '100%'
    },
    screenHeader: {
        backgroundColor: darkColor,
        padding: size3
    },
    taskScreen: {
        flex: 1,
        width: '100%',
        backgroundColor: darkColor6
    },
    compactTaskElement: {
    },
    taskScreenHeader: {
        backgroundColor: 'white'
    },
    taskScreenHeaderText: {
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 24,
        color: darkColor
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
        color: darkColor
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
    smallIcon: {
        height: 16,
        width: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: size2
    },
    caret: {
        height: 24,
        width: 24,
        marginRight: size3,
        alignItems: 'center',
        justifyContent: 'center'
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
        marginRight: size3,
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
        alignItems: 'center'
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
        color: darkColor4,
        fontFamily: 'TitilliumWeb-Bold'   
    },
    taskDetailValue: {
        marginLeft: size2,
        fontFamily: 'Roboto-Medium',
        fontSize: 12,
        color: darkColor3
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
    taskTabActive: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '50%',
        borderWidth: 1.5,
        padding: size5,
        backgroundColor: blue3,
        borderLeftWidth: .25,
        borderRightWidth: .25,
        borderColor: darkColor
    },
    taskTabInactive: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '50%',
        backgroundColor: 'white',
        borderWidth: 1.5,
        padding: size3,
        borderLeftWidth: .25,
        borderRightWidth: .25,
        borderColor: darkColor
    },
    taskListSectionHeader: {
        fontFamily: 'TitilliumWeb-SemiBold'
    },
    taskListItemRow: {
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    capturedTasksContainer: {
        backgroundColor: 'white',
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
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: size3
    },
    taskIconCompact: {
        height: 20,
        width: 24,
        paddingRight: size2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: size3,
        borderRightWidth: 1,
        borderStyle: 'dotted',
        borderColor: darkColor3
    },
    

    taskIconLarge: {
        height: 36,
        width: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: size3
    },
    taskCountElement: {
        marginLeft: size4,
        fontFamily: 'TitilliumWeb-Semibold',
        fontSize: 14,
        backgroundColor: 'white',
        color: darkColor2
    },
    circleBorder: {
        paddingLeft: size3,
        paddingRight: size3,
        textAlign: 'center',
        justifyContent: 'center',
        height: 20,
        borderColor: darkColor,
        borderWidth: .25
    },
    alignItems: {
        alignItems: 'center'
    },
    justifyContent: {
        justifyContent: 'center'
    },
    baseline: {
        alignItems: 'baseline'
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
    darkColor3Text: {
        color: darkColor3
    },
    thinBorder: {
        borderWidth: .75,
        borderRadius: size3,
        borderColor: darkColor2
    },
    bottomBorder: {
        borderBottomWidth: 0.5,
        borderBottomColor: darkColor3,
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
    spaceAround: {
        justifyContent: 'space-around'
    },
    spaceEvenly: {
        justifyContent: 'space-evenly'
    },
    horizontalLine: {
        marginLeft: size2,
        marginRight: size2,
        flex: 1,
        height: 1,
        borderTopWidth: .5,
        borderColor: darkColor3
    },
    horizontalLineShort: {
        marginLeft: size2,
        marginRight: size2,
        width: size5,
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
        borderLeftWidth: 1,
        borderLeftColor: blue2
    },
    topBorder: {
        borderTopWidth: 1,
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
    taskBorder: {
        borderBottomWidth: 0.5,
        borderColor: darkColor
    },
    tealHighlight: {
        paddingLeft: size2,
        paddingRight: size2,
        backgroundColor: teal3,
        borderLeftWidth: .75,
        borderRightWidth: .75,
        borderRadius: size2,
        borderColor: teal2
    },
    yellowHighlight: {
        paddingLeft: size2,
        paddingRight: size2,
        backgroundColor: yellow3,
        borderLeftWidth: .75,
        borderRightWidth: .75,
        borderRadius: size2,
        borderColor: yellow2
    },
    greenHighlight: {
        paddingLeft: size2,
        paddingRight: size2,
        backgroundColor: green3,
        borderLeftWidth: .75,
        borderRightWidth: .75,
        borderRadius: size2,
        borderColor: green2
    },
    blueHighlight: {
        paddingLeft: size2,
        paddingRight: size2,
        backgroundColor: blue3,
        borderLeftWidth: .75,
        borderRightWidth: .75,
        borderRadius: size2,
        borderColor: blue2
    },
    orangeHighlight: {
        paddingLeft: size2,
        paddingRight: size2,
        backgroundColor: orange3,
        borderLeftWidth: .75,
        borderRightWidth: .75,
        borderRadius: size2,
        borderColor: orange2
    },
    darkColor,
    darkColor2,
    darkColor3,
    darkColor4,
    darkColor5,
    yellow3,
    green3,
    pink3,
    blue3,
    red3,
    yellow,
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
