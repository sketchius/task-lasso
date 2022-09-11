import { useState } from 'react';
import { Pressable, View } from 'react-native';

import Svg, { Circle, Rect, Path } from 'react-native-svg';


export default function MultistateCheckbox(props) {
    const [state,setState] = useState(0);

    const styles = props.styles;

    let boxComponent;

    switch (state) {
        case 0:
            boxComponent = <View>
                <Svg height="20" width="20" viewBox="0 0 10 10" >                
                    <Path
                        d="M 0 0 L 0 10 L 10 10 L 10 0 L 0 0 L 0 10"
                        strokeWidth='1.5'
                        stroke='#000000'
                    ></Path>
                </Svg>
            </View>
            break;
        case 1:
            boxComponent = <View>
                <Svg height="20" width="20" viewBox="0 0 10 10" >
                    <Path
                        d="M 0 0 L 0 10 L 10 10 L 10 0 L 0 0 L 0 10"
                        strokeWidth='1.5'
                        stroke='#000000'
                    ></Path>
                    <Path
                        d="M 0 0 L 0 10 L 10 0 L 0 0 L 0 10"
                        strokeWidth='0'
                        fill='#000000'
                    ></Path>
                </Svg>
            </View>
            break;
        case 2:
            boxComponent = <View>
                <Svg height="20" width="20" viewBox="0 0 10 10" >
                    <Path
                        d="M 0 0 L 0 10 L 10 10 L 10 0 L 0 0 L 0 10"
                        strokeWidth='1.5'
                        stroke='#000000'
                        fill='#000000'
                    ></Path>
                </Svg>
            </View>
            break;
        default:
            boxComponent = <View></View>;
            break;

    }

    const toggleState = () => {
        const newState = state==2 ? 0 : state+1;

        props.onStateChange(newState)

        setState(newState);
    }

    return <Pressable style={[styles.padding5]}
    onPress={toggleState}>
        
            {boxComponent}
    </Pressable>
}