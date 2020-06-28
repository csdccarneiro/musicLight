import TrackPlayer from "react-native-track-player";
import { store } from "../store";

export default async function() {
    
    setInterval(async () => {
        if (await TrackPlayer.getState() === TrackPlayer.STATE_PLAYING) {
            const progress = await TrackPlayer.getPosition();
            const duration = await TrackPlayer.getDuration();
            store.dispatch({ type: "TRACK_PROGRESS", progress, duration });
        }       
    }, 700);

    TrackPlayer.addEventListener("playback-track-changed", async (event) => {
        if (await TrackPlayer.getState() !== TrackPlayer.STATE_PAUSED) {
            store.dispatch({ type: "TRACK_CHANGE", music: await TrackPlayer.getTrack(event.nextTrack) });
        }       
    });

    TrackPlayer.addEventListener("remote-play", async () => {
        store.dispatch({ type: "TRACK_PLAY" });
    });

    TrackPlayer.addEventListener("remote-pause", async () => {
        store.dispatch({ type: "TRACK_PAUSE" });
    });

    TrackPlayer.addEventListener("remote-next", async () => {
        store.dispatch({ type: "TRACK_NEXT" });
    });

    TrackPlayer.addEventListener("remote-previous", async () => {
        store.dispatch({ type: "TRACK_PREVIOUS" });
    });

    TrackPlayer.addEventListener("remote-jump-backward", async (data) => {
        TrackPlayer.getPosition().then(position => {
            TrackPlayer.seekTo(position - data.interval);
        });
    });

    TrackPlayer.addEventListener("remote-jump-forward", async (data) => {
        TrackPlayer.getPosition().then(position => {
            TrackPlayer.seekTo(position + data.interval);
        });
    });

}