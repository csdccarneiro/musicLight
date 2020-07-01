import TrackPlayer from "react-native-track-player";
import { store } from "../store";

export default async function() {

    setInterval(async () => {
        if (await TrackPlayer.getState() === TrackPlayer.STATE_PLAYING) {
            const position = await TrackPlayer.getPosition();
            const duration = await TrackPlayer.getDuration();
            store.dispatch({ type: "TRACK_PROGRESS", payload: { position, duration } });
        }       
    }, 700);

    TrackPlayer.addEventListener("playback-track-changed", async (event) => {
        const music = await TrackPlayer.getTrack(event.nextTrack);
        if (music)
            store.dispatch({ type: "TRACK_CHANGE", payload: music });
    });

    TrackPlayer.addEventListener('playback-state', async (event) => {
        if(event.state === TrackPlayer.STATE_PLAYING) 
           store.dispatch({ type: "TRACK_STATE", payload: { play: true } });    
        else 
           store.dispatch({ type: "TRACK_STATE", payload: { play: false } });    
    });

    TrackPlayer.addEventListener("remote-play", async () => {
        store.dispatch({ type: "TRACK_PLAY" });
    });

    TrackPlayer.addEventListener("remote-pause", async () => {
        store.dispatch({ type: "TRACK_PAUSE" });
    });

    TrackPlayer.addEventListener("remote-previous", async () => {
        store.dispatch({ type: "TRACK_PREVIOUS" });
    });

    TrackPlayer.addEventListener("remote-next", async () => {
        store.dispatch({ type: "TRACK_NEXT" });
    });

    TrackPlayer.addEventListener("remote-jump-backward", async (data) => {
        store.dispatch({ type: "JUMP-BACKWARD", payload: { interval: data.interval } });
    });

    TrackPlayer.addEventListener("remote-jump-forward", async (data) => {
        store.dispatch({ type: "JUMP-FORWARD", payload: { interval: data.interval } });
    });

    TrackPlayer.addEventListener('remote-duck', async (data) => {
        if (data.paused || data.permanent)
            store.dispatch({ type: "TRACK_PAUSE" });
    });

}