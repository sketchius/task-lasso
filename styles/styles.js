import { StyleSheet, StatusBar } from 'react-native';
import { colors, space, font } from './standards';



const styleArray = {
    defaultText: {
        fontFamily: 'RobotoRegular',
        fontSize: font.size2
    },
    headerFont: {
        fontFamily: 'RobotoMedium',
        color: colors.gray
    },
    alertText: {
        fontSize: font.size00,
        color: '#555',
        fontFamily: 'TitilliumWebBold'
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
        alignItems: 'center',
        borderTopWidth: .25,
        borderBottomWidth: 2,
        borderColor: colors.gray
    },
    navOptionActive: {
        width: '20%',
        alignItems: 'center',
        padding: space.size3,
        backgroundColor: 'white'
    },
    navOptionInactive: {
        width: '20%',
        alignItems: 'center',
        padding: space.size3,
        backgroundColor: 'white'
    },
    navOptionTextActive: {
        fontFamily: 'RobotoMedium',
        fontSize: font.size1,
        paddingLeft: space.size2,
        paddingRight: space.size2,
        color: colors.gray,
        backgroundColor: colors.teal3,
        borderLeftWidth: .75,
        borderRightWidth: .75,
        borderRadius: space.size2,
        borderColor: colors.teal2
    },
    navOptionTextInactive: {
        fontFamily: 'RobotoMedium',
        paddingLeft: space.size2,
        paddingRight: space.size2,
        fontSize: font.size1,
        color: colors.gray3,
        borderLeftWidth: .75,
        borderRightWidth: .75,
        borderRadius: space.size2,
        borderColor: 'white'
    },
    navContent: {
        flex: 1,
        width: '100%'
    },
    screenHeader: {
        backgroundColor: colors.gray,
        padding: space.size3
    },
    taskScreen: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.gray6
    },
    compactTaskElement: {
    },
    taskScreenHeader: {
        backgroundColor: 'white'
    },
    taskScreenHeaderText: {
        fontFamily: 'TitilliumWebBold',
        fontSize: font.size5,
        color: colors.gray
    },
    screenHeaderFullScreen: {
        height: '100%',
        justifyContent: 'space-between'
    },
    screenHeaderText: {
        fontFamily: 'TitilliumWebRegular',
        marginRight: space.size2,
        fontSize: 40,
        color: 'white'
    },
    screenHeaderDateView: {
        marginTop: space.size3,
        marginLeft: space.size3,
        justifyContent: 'center',
        borderLeftWidth: 0.5,
        borderColor: 'white',
        paddingLeft: space.size4
    },
    screenHeaderDateText: {
        fontFamily: 'TitilliumWebRegular',
        fontSize: font.size0,
        color: 'white'
    },
    screenHeaderYearText: {
        fontFamily: 'TitilliumWebBold',
        fontSize: font.size0,
        color: 'white'
    },
    screenHeaderGreetingText: {
        fontSize: 48,
        color: colors.gray
    },
    screenHeaderButton: {
        backgroundColor: '#fffe94',
        padding: space.size5,
        alignSelf: 'center',
        borderRadius: space.size3
    },
    editField: {
        margin: space.size2,
        marginLeft: space.size4,
        marginRight: space.size4,
        height: 'auto',
        paddingTop: space.size2,
        paddingBottom: space.size5
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
        margin: space.size4,
    },
    helpIcon: {
        height: 20,
        width: 20
    },
    helpText: {
        fontSize: font.size0,
        marginLeft: space.size3,
        marginBottom: space.size3,
        color: colors.gray2
    },
    formFieldLabel: {
        marginBottom: space.size3,
        marginRight: space.size2,
        fontSize: font.size3,
        fontFamily: 'TitilliumWebSemibold',
        color: colors.gray
    },
    formFieldLabelWhite: {
        marginBottom: space.size3,
        marginRight: space.size2,
        fontSize: font.size3,
        fontFamily: 'TitilliumWebSemibold',
        color: 'white'
    },
    textInputContainer: {
        width: '100%',
    },
    textInput: {
        textAlignVertical: 'top',
        minHeight: 40,
        padding: space.size4,
        width: 'auto',
        backgroundColor: 'white'
    },
    selected: {
        backgroundColor: '#fffe94'
    },
    selectionListSelected: {
        borderWidth: 1,
        borderRadius: space.size2,
        borderColor: colors.gray3
    },
    selectionListDeselected: {
        borderWidth: 1,
        borderRadius: space.size2,
        borderColor: 'transparent'
    },
    colorBorder: {
        borderWidth: 2,
        borderRadius: space.size2,
        borderColor: colors.blue3
    },
    colorlessBorder: {
        borderWidth: 2,
        borderRadius: space.size2,
        borderColor: 'transparent'
    },
    whiteBackground: {
        backgroundColor: 'white'
    },
    selectionIcon: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noBorder: {
        borderWidth: 0
    },
    smallIcon: {
        height: 16,
        width: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: space.size2
    },
    caret: {
        height: 24,
        width: 24,
        marginRight: space.size3,
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
        padding: space.size4
    },
    selectionItemRow: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: space.size4
    },
    oneColumns: {
        width: '100%',
    },
    twoColumns: {
        width: '50%',
    },
    threeColumns: {
        width: '33%'
    },
    sixColumns: {
        width: '15%'
    },
    selectionText: {
        fontSize: font.size1,
        fontFamily: 'RobotoMedium',
        color: colors.gray
    },
    selectionTextSmall: {
        fontSize: font.size1,
        fontFamily: 'RobotoMedium',
        color: colors.gray
    },
    selectionSubtext: {
        paddingLeft: .75,
        fontSize: font.size0,
        color: colors.gray2
    },
    taskTypeElement: {
        paddingLeft: space.size1,
        paddingRight: space.size1,
        marginRight: space.size3,
        alignItems: 'center',
        flexDirection: 'row'
    },
    taskTypeText: {
        marginLeft: space.size2,
        fontSize: font.size00,
        color: colors.gray3,
        fontFamily: 'TitilliumWebBold'    
    },
    taskDetailDescription: {
        fontSize: font.size2,
        color: colors.gray2
    },
    taskDetailInfo: {
        paddingLeft: space.size1,
        paddingRight: space.size1,
        padding: space.size2,
        alignItems: 'center'
    },
    taskDetailIcon: {
        width: 14,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskDetailLabel: {
        marginLeft: space.size2,
        fontSize: font.size0,
        color: colors.gray4,
        fontFamily: 'TitilliumWebBold'   
    },
    taskDetailValue: {
        marginLeft: space.size2,
        fontFamily: 'RobotoMedium',
        fontSize: font.size0,
        color: colors.gray3
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
        margin: space.size4,
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
    flexStart: {
        alignItems: 'flex-start'
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
        padding: space.size5,
        backgroundColor: colors.blue3,
        borderLeftWidth: .25,
        borderRightWidth: .25,
        borderColor: colors.gray
    },
    taskTabInactive: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '50%',
        backgroundColor: 'white',
        borderWidth: 1.5,
        padding: space.size3,
        borderLeftWidth: .25,
        borderRightWidth: .25,
        borderColor: colors.gray
    },
    taskListSectionHeader: {
        fontFamily: 'TitilliumWebSemibold'
    },
    taskListItemRow: {
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    notesContainer: {
        backgroundColor: 'white'
    },
    flexibleTasksContainer: {
        backgroundColor: 'white',
        marginTop: space.size4,
        borderTopWidth: space.size0,
        borderBottomWidth: space.size0,
        borderColor: colors.gray
    },
    assignedTasksContainer: {
        backgroundColor: 'white',
        marginTop: space.size4,
        borderTopWidth: space.size0,
        borderBottomWidth: space.size0,
        borderColor: colors.gray
    },
    scheduledTasksContainer: {
        backgroundColor: 'white',
        marginTop: space.size4,
        borderTopWidth: space.size0,
        borderBottomWidth: space.size0,
        borderColor: colors.gray
    },
    iconPlaceholder: {
        borderColor: colors.gray,
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
        marginRight: space.size3
    },
    taskIconCompact: {
        height: 20,
        width: 24,
        paddingRight: space.size2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: space.size3,
        borderRightWidth: 1,
        borderStyle: 'dotted',
        borderColor: colors.gray3
    },
    

    taskIconLarge: {
        height: 36,
        width: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: space.size3
    },
    taskCountElement: {
        marginLeft: space.size4,
        fontFamily: 'TitilliumWebSemibold',
        fontSize: font.size1,
        backgroundColor: 'white',
        color: colors.gray2
    },
    circleBorder: {
        paddingLeft: space.size3,
        paddingRight: space.size3,
        textAlign: 'center',
        justifyContent: 'center',
        height: 20,
        borderColor: colors.gray,
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
        fontSize: font.size00
    },
    fontSize00: {
        fontSize: font.size0
    },
    fontSize0: {
        fontSize: font.size1
    },
    fontSize1: {
        fontSize: font.size2
    },
    fontSize2: {
        fontSize: font.size3
    },
    fontSize3: {
        fontSize: font.size4
    },
    fontSize4: {
        fontSize: font.size5
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
    gray3Text: {
        color: colors.gray3
    },
    thinBorder: {
        borderWidth: .75,
        borderRadius: space.size3,
        borderColor: colors.gray2
    },
    bottomBorder: {
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray3,
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
        marginLeft: space.size2,
        marginRight: space.size2,
        flex: 1,
        height: 1,
        borderTopWidth: .5,
        borderColor: colors.gray3
    },
    horizontalLineShort: {
        marginLeft: space.size2,
        marginRight: space.size2,
        width: space.size5,
        height: 1,
        borderTopWidth: .5,
        borderColor: colors.gray3
    },
    horizontalLineWhite: {
        marginLeft: space.size2,
        marginRight: space.size2,
        flex: 1,
        height: 1,
        borderTopWidth: .5,
        borderColor: 'white'
    },
    FlexiblehorizonalDivider: {
        borderLeftWidth: .5,
        marginLeft: space.size4,
        marginRight: space.size4,
        borderColor: colors.gray3
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
        borderLeftColor: colors.blue2
    },
    topBorder: {
        borderTopWidth: 1,
        borderColor: colors.gray
    },
    leftBorder2: {
        borderLeftWidth: 2,
        borderColor: colors.gray
    },
    horizontalBorders: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: colors.gray
    },
    taskBorder: {
        borderBottomWidth: 0.5,
        borderColor: colors.gray
    },
    tealHighlight: {
        paddingLeft: space.size2,
        paddingRight: space.size2,
        backgroundColor: colors.teal3,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: colors.teal2
    },
    hiddenHighlight: {
        paddingLeft: space.size2,
        paddingRight: space.size2,
        backgroundColor: 'transparent',
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: colors.gray3,
    },
    redHighlight: {
        paddingLeft: space.size2,
        paddingRight: space.size2,
        backgroundColor: colors.red3,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderRadius: space.size2,
        borderColor: colors.red2
    },
    yellowHighlight: {
        paddingLeft: space.size2,
        paddingRight: space.size2,
        backgroundColor: colors.yellow3,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: colors.yellow2
    },
    greenHighlight: {
        paddingLeft: space.size2,
        paddingRight: space.size2,
        backgroundColor: colors.green3,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: colors.green2
    },
    blueHighlight: {
        paddingLeft: space.size2,
        paddingRight: space.size2,
        backgroundColor: colors.blue3,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: colors.blue2
    },
    orangeHighlight: {
        paddingLeft: space.size2,
        paddingRight: space.size2,
        backgroundColor: colors.orange3,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: colors.orange2
    },
    selectionBorder1: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        //borderTopColor: colors.gray,
        //borderBottomColor: colors.gray,
        //borderLeftColor: colors.gray,
        //borderRightColor: colors.gray,
        borderRadius: space.size2
    },
    hiddenBorder1: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderRadius: space.size2
    },
    colors,
    space,
    font
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
    styleArray[property + modifier + '000'] = { [property + modifier]: space.size000 }
    styleArray[property + modifier + '00'] = { [property + modifier]: space.size00 }
    styleArray[property + modifier + '0'] = { [property + modifier]: space.size0 }
    styleArray[property + modifier + '1'] = { [property + modifier]: space.size1 }
    styleArray[property + modifier + '2'] = { [property + modifier]: space.size2 }
    styleArray[property + modifier + '3'] = { [property + modifier]: space.size3 }
    styleArray[property + modifier + '4'] = { [property + modifier]: space.size4 }
    styleArray[property + modifier + '5'] = { [property + modifier]: space.size5 }
    styleArray[property + modifier + '6'] = { [property + modifier]: space.size6 }
}

const addSizeAxisStyles = (property, reference ,modifier1, modifier2) => {
    styleArray[property + reference + '000'] = { [property + modifier1]: space.size000, [property + modifier2]: space.size000 }
    styleArray[property + reference + '00'] = { [property + modifier1]: space.size00, [property + modifier2]: space.size00 }
    styleArray[property + reference + '0'] = { [property + modifier1]: space.size0, [property + modifier2]: space.size0 }
    styleArray[property + reference + '1'] = { [property + modifier1]: space.size1, [property + modifier2]: space.size1 }
    styleArray[property + reference + '2'] = { [property + modifier1]: space.size2, [property + modifier2]: space.size2 }
    styleArray[property + reference + '3'] = { [property + modifier1]: space.size3, [property + modifier2]: space.size3 }
    styleArray[property + reference + '4'] = { [property + modifier1]: space.size4, [property + modifier2]: space.size4 }
    styleArray[property + reference + '5'] = { [property + modifier1]: space.size5, [property + modifier2]: space.size5 }
    styleArray[property + reference + '6'] = { [property + modifier1]: space.size6, [property + modifier2]: space.size6 }
}

populateStyles('padding',true);
populateStyles('margin',true);
populateStyles('borderWidth',true);
populateStyles('width',false);
populateStyles('height',false);
addSizeAxisStyles('','Square','Width','Height');

export const styles = StyleSheet.create(styleArray);