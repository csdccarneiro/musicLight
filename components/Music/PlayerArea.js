import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { Avatar, Slider } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { useTrackPlayerProgress, useTrackPlayerEvents, TrackPlayerEvents, skipToNext, skipToPrevious, play, pause, seekTo, getState, STATE_PLAYING, STATE_PAUSED, getCurrentTrack, getTrack } from 'react-native-track-player';


export default function PlayerArea(props){
    const { position, bufferedPosition, duration } = useTrackPlayerProgress();
    const [iconPlayer, setIconPlayer] = useState("play");
    const [track, setTrack] = useState({ artwork: '' });

    const events = [
        TrackPlayerEvents.PLAYBACK_STATE,
        TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
        TrackPlayerEvents.REMOTE_PLAY,
        TrackPlayerEvents.REMOTE_PAUSE,
    ];

    useTrackPlayerEvents(events, async (event) => {
        switch (event.type) {
            case TrackPlayerEvents.PLAYBACK_TRACK_CHANGED:
                setIconPlayer("pause");
                setTrack(await getTrack(event.nextTrack));
            break;
            case TrackPlayerEvents.REMOTE_PLAY:
                setIconPlayer("pause");
            break;
            case TrackPlayerEvents.REMOTE_PAUSE:
                setIconPlayer("play");
            break;
        }
    });

    async function toggleStatePlayer(){
        switch (await getState()) {
            case STATE_PLAYING:
                setIconPlayer("play");
                pause();
            break;
            case STATE_PAUSED:
                setIconPlayer("pause");
                play();
            break;
        }
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
            <View style={style.playerContainerCover}>
                <FastImage
                    style={{ width: 45, height: 45, marginLeft: 10 }}
                    source={(String(track.artwork).indexOf('.jpg') >= 0) ? 
                    {
                        uri: track.artwork, 
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.high,
                        cache: "immutable"
                    }: require('../../images/musical-note.png')}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
            <View style={style.playerContainerControllers}>
                <View style={style.playerContainerIcons}>
                    <Avatar icon={{ name: 'rotate-right', type: 'font-awesome', color: '#C7C7C7', size: 25 }} overlayContainerStyle={style.coverStyle}  size={"medium"} />
                    <Avatar icon={{ name: 'backward', type: 'font-awesome', color: '#C7C7C7', size: 30 }} onPress={() => skipToPrevious()} overlayContainerStyle={style.coverStyle} size={"medium"} />
                    <Avatar rounded icon={{ name: iconPlayer, type: 'font-awesome', color: 'black', size: 30 }} onPress={toggleStatePlayer} size={"medium"} />
                    <Avatar icon={{ name: 'forward', type: 'font-awesome', color: '#C7C7C7', size: 30 }} onPress={() => skipToNext()} overlayContainerStyle={style.coverStyle} size={"medium"} />
                    <Avatar icon={{ name: 'random', type: 'font-awesome', color: '#C7C7C7', size: 25 }} overlayContainerStyle={style.coverStyle} size={"medium"} />
                </View>
                <View style={style.playerTime}>
                    <Text style={style.playerText} >{formatTime(position)}</Text>
                    <Slider style={style.playerSlider} animateTransitions={true} animationType={'spring'} value={position} onValueChange ={ value => { seekTo(value) }} maximumValue={duration} trackStyle={{ height: 3 }} thumbStyle={{ height: 13, width: 13 }} />
                    <Text style={style.playerText} >{formatTime(duration)}</Text>
                </View>
            </View>
        </Animated.View>
    );
}


const style = StyleSheet.create({
    playerContainer: {
        backgroundColor: 'black', 
        flexDirection: 'row'
    },
    playerContainerCover: {
        justifyContent: 'center', 
        overflow: 'hidden'
    },
    playerContainerControllers: {
        flex: 1, 
        flexDirection: 'column',
        paddingTop: 5 
    },
    playerContainerIcons: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly'
    },
    playerTime: {
        flexDirection: 'row', 
        paddingLeft: 20, 
        paddingRight: 20
    },
    playerText: {
        color: 'white',
        textAlign: 'center'
    },
    playerSlider: {
        flex: 1, 
        marginTop: -10, 
        marginBottom: -7, 
        marginLeft: 5, 
        marginRight: 5
    },
    coverStyle: {
        backgroundColor: 'transparent',
    }
});
