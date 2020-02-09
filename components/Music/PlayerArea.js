import React from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { Avatar, Slider } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { seekTo, getState, STATE_PLAYING, STATE_PAUSED, getVolume } from 'react-native-track-player';

export default function PlayerArea(props){

    const music = useSelector(state => state.player);
    const dispatch = useDispatch();

    async function toggleStatePlayer(){ 
        if (await getState() === STATE_PLAYING)
            dispatch({ type: "TRACK_PAUSE" });
        else if(await getState() === STATE_PAUSED)
            dispatch({ type: "TRACK_PLAY" });    
    }

    async function toggleVolume(){ 
        if (await getVolume() === 1)
            dispatch({ type: "CHANGE_VOLUME", volume: 0 });
        else if(await getVolume() === 0)
            dispatch({ type: "CHANGE_VOLUME", volume: 1 });
    }

    function formatTime(seconds) {
        return seconds > 3600 ?
        [parseInt(seconds / 60 / 60), parseInt(seconds / 60 % 60), parseInt(seconds % 60)]
        .join(":").replace(/\b(\d)\b/g, "0$1") :
        [parseInt(seconds / 60 % 60), parseInt(seconds % 60)]
        .join(":").replace(/\b(\d)\b/g, "0$1")
    }

    return (
        <Animated.View style={[style.playerContainer, { height: props.header }]}>
            <View>
                <Animated.Image 
                    style={{ width: 55, height: 55, marginLeft: 10, transform: [{ rotate: music.animationLoop }] }}
                    source={(String(music.artwork).indexOf('.jpg') >= 0) ? 
                    { uri: music.artwork } : require('../../images/musical-note.png')}
                />
            </View>
            <View style={style.playerContainerControllers}>
                <View style={style.playerContainerIcons}>
                    <Avatar icon={{ name: (Boolean(music.volume) ? 'volume-up' : 'volume-off'), type: 'font-awesome', color: '#C7C7C7', size: 25 }} onPress={toggleVolume} overlayContainerStyle={style.coverStyle}  size={"medium"} />
                    <Avatar icon={{ name: 'backward', type: 'font-awesome', color: '#C7C7C7', size: 30 }} onPress={() => dispatch({ type: "TRACK_PREVIOUS" })} overlayContainerStyle={style.coverStyle} size={"medium"} />
                    <Avatar rounded icon={{ name: music.iconPlayer, type: 'font-awesome', color: 'black', size: 30 }} onPress={toggleStatePlayer} size={"medium"} />
                    <Avatar icon={{ name: 'forward', type: 'font-awesome', color: '#C7C7C7', size: 30 }} onPress={() => dispatch({ type: "TRACK_NEXT" })} overlayContainerStyle={style.coverStyle} size={"medium"} />
                    <Avatar icon={{ name: music.modeReproduction, type: 'font-awesome', color: '#C7C7C7', size: 25 }} onPress={() => dispatch({ type: "CHANGE_MODE_REPRODUCTION" })} overlayContainerStyle={style.coverStyle} size={"medium"} />
                </View>
                <View style={style.playerTime}>
                    <Text style={style.colorText}>{formatTime(music.position)}</Text>
                    <Slider style={style.playerSlider} animateTransitions={true} animationType={'spring'} value={music.position} onValueChange ={value => seekTo(value)} maximumValue={music.duration} trackStyle={{ height: 3 }} thumbStyle={{ height: 13, width: 13 }} />
                    <Text style={style.colorText}>{formatTime(music.duration)}</Text>
                </View>
                <View style={style.playerContainerTrack}>
                    <Text numberOfLines={1} style={style.colorText}>{music.fileName}</Text>    
                </View>
            </View> 
        </Animated.View>
    );
}

const style = StyleSheet.create({
    playerContainer: {
        backgroundColor: 'black', 
        flexDirection: 'row', 
        alignItems: 'center', 
        overflow: 'hidden',
        marginTop: -1
    },
    playerContainerControllers: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    playerContainerIcons: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        alignItems: 'center'
    },
    playerTime: {
        flexDirection: 'row', 
        marginLeft: 10, 
        marginRight: 10
    },
    playerSlider: {
        flex: 1, 
        marginTop: -10, 
        marginBottom: -15, 
        marginLeft: 5, 
        marginRight: 5
    },
    playerContainerTrack: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginLeft: 25, 
        marginRight: 25
    },
    colorText: {
        color: 'white'
    },
    coverStyle: {
        backgroundColor: 'transparent',
    }
});
