import { StyleSheet } from 'react-native';

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
    listItem: {
        padding: size6,
    },
    button: {
        width: '20%',
        margin: size4,
    },
});
