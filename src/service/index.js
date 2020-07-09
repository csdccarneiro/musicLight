import TrackPlayer from "react-native-track-player";
import { store } from "../store";

export default async function() {

    setInterval(async () => {
        if (await TrackPlayer.getState() === TrackPlayer.STATE_PLAYING) {
            const position = await TrackPlayer.getPosition();
            const duration = await TrackPlayer.getDuration();
            const player = await store.getState().Player;
            if ((duration - position) <= 1.5 && (duration - position) != 0) {
                if (player.reproduction == "shuffle") {
                    const list = await TrackPlayer.getQueue();
                    TrackPlayer.skip(list[Math.floor(Math.random() * list.length - 1)].id);
                }
                else if(player.reproduction == "repeat-one")
                    TrackPlayer.seekTo(0);
            }
            store.dispatch({ type: "TRACK_PROGRESS", payload: { position, duration } });
        }       
    }, 700);

    TrackPlayer.addEventListener("playback-track-changed", async (event) => {
        const music = await TrackPlayer.getTrack(event.nextTrack);
        if (music)
            store.dispatch({ type: "TRACK_CHANGE", payload: music });
    });

    TrackPlayer.addEventListener('playback-state', async (event) => {
        store.dispatch({ type: "TRACK_STATE", payload: { 
            play: (event.state === TrackPlayer.STATE_PLAYING ? true : false) } });
    });

    TrackPlayer.addEventListener("remote-play", async () => {
        store.dispatch({ type: "TOGGLE_PLAY_PAUSE" });
    });

    TrackPlayer.addEventListener("remote-pause", async () => {
        store.dispatch({ type: "TOGGLE_PLAY_PAUSE" });
    });

    TrackPlayer.addEventListener("remote-previous", async () => {
        store.dispatch({ type: "TRACK_PREVIOUS" });
    });

    TrackPlayer.addEventListener("remote-next", async () => {
        store.dispatch({ type: "TRACK_NEXT" });
    });

    TrackPlayer.addEventListener("remote-jump-backward", async (data) => {
        store.dispatch({ type: "JUMP_BACKWARD", payload: { interval: data.interval } });
    });

    TrackPlayer.addEventListener("remote-jump-forward", async (data) => {
        store.dispatch({ type: "JUMP_FORWARD", payload: { interval: data.interval } });
    });

    TrackPlayer.addEventListener('remote-duck', async (data) => {
        if (data.paused || data.permanent)
            store.dispatch({ type: "TRACK_PAUSE" });
    });

    TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
        if (data.track != null)
            store.dispatch({ type: "TRACK_NEXT" });
    });

}