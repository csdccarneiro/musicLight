import TrackPlayer from 'react-native-track-player';
import { Animated, Easing } from 'react-native';
import store from './store';

export default async function Service(){
    
    setInterval(async () => {
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
    }, 500);

    TrackPlayer.addEventListener('remote-play', async () => {
        store.dispatch({ type: "TRACK_PLAY" });
    });

    TrackPlayer.addEventListener('playback-track-changed', async (event) => {
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
            store.dispatch({ type: "MODIFY_STATE", animationLoop: spin });
        }
        else if(event.state === TrackPlayer.STATE_PAUSED) {
            animationLoop.stop();
            store.dispatch({ type: "MODIFY_STATE", animationLoop: spin });
        }

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
            TrackPlayer.add(await TrackPlayer.getQueue());
            TrackPlayer.play();
        }
    });
    
}
