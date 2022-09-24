import { useState } from 'react';
import { Pressable, View } from 'react-native';

import getIcon from '../tools/Icons';

import Svg, { Path } from 'react-native-svg';

import { styles } from '../styles/styles';

export default function MultistateCheckbox(props) {


    let boxComponent;

    // switch (props.state) {
    //     case 0:
    //         boxComponent = <View style={styles.whiteBackground}>
    //             <Svg height="20" width="20" viewBox="0 0 10 10" >                
    //                 <Path
    //                     d="M 0 0 L 0 10 L 10 10 L 10 0 L 0 0 L 0 10"
    //                     strokeWidth='1.5'
    //                     stroke='#000000'
    //                 ></Path>
    //             </Svg>
    //         </View>
    //         break;
    //     case 1:
    //         boxComponent = <View style={styles.whiteBackground}>
    //             <Svg height="20" width="20" viewBox="0 0 10 10" >
    //                 <Path
    //                     d="M 0 0 L 0 10 L 10 10 L 10 0 L 0 0 L 0 10"
    //                     strokeWidth='1.5'
    //                     stroke='#000000'
    //                 ></Path>
    //                 <Path
    //                     d="M 0 0 L 0 10 L 10 0 L 0 0 L 0 10"
    //                     strokeWidth='0'
    //                     fill='#000000'
    //                 ></Path>
    //             </Svg>
    //         </View>
    //         break;
    //     case 2:
    //         boxComponent = <View style={styles.whiteBackground}>
    //             <Svg height="20" width="20" viewBox="0 0 10 10" >
    //                 <Path
    //                     d="M 0 0 L 0 10 L 10 10 L 10 0 L 0 0 L 0 10"
    //                     strokeWidth='1.5'
    //                     stroke='#000000'
    //                     fill='#000000'
    //                 ></Path>
    //             </Svg>
    //         </View>
    //         break;
    //     default:
    //         boxComponent = <View></View>;
    //         break;

    // }

    
    switch (props.state) {
        case 0:
            boxComponent = getIcon('FontAwesome5','square',24,styles.colors.gray)
            break;
        case 1:
            boxComponent =  getIcon('FontAwesome5','minus-square',24,styles.colors.gray)
            break;
        case 2:
            boxComponent =  getIcon('FontAwesome5','check-square',24,styles.colors.gray)
            break;
        default:
            boxComponent = <View></View>;
            break;

    }

    const toggleState = () => {
        props.onStateChange()
    }

    return <Pressable style={props.style}
    onPress={toggleState}>
            {boxComponent}
    </Pressable>
}