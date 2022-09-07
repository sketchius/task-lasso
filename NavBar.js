import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavBar(props) {
    return (
        <View style={styles.container}>
            <View style={[styles.tab, styles.one]}>
                <Text>1</Text>
            </View>
            <View style={[styles.tab, styles.two]}>
                <Text>2</Text>
            </View>
            <View style={[styles.tab, styles.three, styles.big]}>
                <Text>3</Text>
            </View>
            <View style={[styles.tab, styles.four]}>
                <Text>4</Text>
            </View>
            <View style={[styles.tab, styles.five]}>
                <Text>5</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "cyan",
        height:50,
        width:'100%',
        flexDirection:'row'
    },
    tab: {
        flex: 1,
        width: '25%',
        justifyContent:'center',
        alignItems:'center'
    },
    big: {
        flex: 1.5
    },
    one: {
        backgroundColor:'#00000011'
    },
    two: {
        backgroundColor:'#00000022'
    },
    three: {
        backgroundColor:'#00000033'
    },
    four: {
        backgroundColor:'#00000044'
    },
    five: {
        backgroundColor:'#00000055'
    }
})