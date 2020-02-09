import TrackPlayer from 'react-native-track-player';
import BackgroundTimer from 'react-native-background-timer';
import { Animated, Easing } from 'react-native';
import { store, persistor } from './store';

module.exports = async function() {

    BackgroundTimer.setInterval(async () => {
        const position = await TrackPlayer.getPosition();
        const duration = await TrackPlayer.getDuration();
        const music = await store.getState();
        if ((duration - position) <= 1.5 && (duration - position) != 0) {
            if (music.player.modeReproduction == "random") {
                const list = await TrackPlayer.getQueue();
                TrackPlayer.skip(list[Math.floor(Math.random() * list.length - 1)].id);
            }
            else if(music.player.modeReproduction == "repeat")
                TrackPlayer.seekTo(0);
        }
        store.dispatch({ type: "UPDATE_POSITION_AND_DURATION", position: position, duration: duration });
    }, 500);

    TrackPlayer.addEventListener('playback-track-changed', async (event) => {
        if (await TrackPlayer.getState() !== TrackPlayer.STATE_PAUSED)
            store.dispatch({ type: "TRACK_CHANGE", dataMusic: await TrackPlayer.getTrack(event.nextTrack) });        
    });

    TrackPlayer.addEventListener('playback-state', async (event) => {
        
        const animateValue = new Animated.Value(0);
        const spin = animateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        const animationLoop = Animated.loop(
            Animated.timing(animateValue, { toValue: 1, duration: 3000, easing: Easing.linear, useNativeDriver: true })
        );
        
        if(event.state === TrackPlayer.STATE_PLAYING) {
            animationLoop.start();
            store.dispatch({ type: "MODIFY_STATE", animationLoop: spin, iconPlayer: "pause" });
        }
        else if(event.state === TrackPlayer.STATE_PAUSED) {
            animationLoop.stop();
            store.dispatch({ type: "MODIFY_STATE", animationLoop: spin, iconPlayer: "play" });
        }

    });

    TrackPlayer.addEventListener('remote-play', async () => {
        store.dispatch({ type: "TRACK_PLAY" });
    });

    TrackPlayer.addEventListener('remote-pause', async () => {
        store.dispatch({ type: "TRACK_PAUSE" });
    });

    TrackPlayer.addEventListener('remote-previous', async () => {
        store.dispatch({ type: "TRACK_PREVIOUS" });
    });

    TrackPlayer.addEventListener('remote-next', async () => {
        store.dispatch({ type: "TRACK_NEXT" });
    });

    TrackPlayer.addEventListener('remote-duck', async (data) => {
        if (data.paused || data.permanent)
            store.dispatch({ type: "TRACK_PAUSE" });
    });

    TrackPlayer.addEventListener('remote-jump-backward', async (data) => {
        TrackPlayer.getPosition().then(position => {
            TrackPlayer.seekTo(position - data.interval);
        });
    });

    TrackPlayer.addEventListener('remote-jump-forward', async (data) => {
        TrackPlayer.getPosition().then(position => {
            TrackPlayer.seekTo(position + data.interval);
        });
    });
    
    TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
        if (data.track != null) {
            var list = await TrackPlayer.getQueue();
            TrackPlayer.skip(list[0].id);
            TrackPlayer.play();
        }
    });

}
