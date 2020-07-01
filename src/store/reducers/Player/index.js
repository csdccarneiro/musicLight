import TrackPlayer from 'react-native-track-player';
import controllers from "../../../controllers";

const DATA_INITIAL_PLAYER = {
    id: null,
    title: null,
    subtitle: null,
    icon: null,
    duration: 0,
    position: 0,
    play: false,
    volume: true,
    velocity: 0,
};

const Player = (state = DATA_INITIAL_PLAYER, action) => {
    switch (action.type) {
        case "ADD_OR_INIT_MUSICS":
            controllers.MusicController.initMusic(action.payload.localListMusic, action.payload.musicId);
            return state;
        break;
        case "TRACK_CHANGE":
            return { ...state, id: action.payload.id, title: action.payload.title, 
                    subtitle: action.payload.artist, icon: action.payload.artwork };
        break;
        case "TRACK_PLAY":
            TrackPlayer.play();
            return state;
        break;
        case "TRACK_PAUSE":
            TrackPlayer.pause();
            return state;
        break;
        case "TRACK_STATE":
            return { ...state, play: action.payload.play };
        break;        
        case "TRACK_NEXT":
            TrackPlayer.skipToNext();
            return state;
        break;
        case "TRACK_PREVIOUS":
            TrackPlayer.skipToPrevious();
            return state;
        break;
        case "TRACK_PROGRESS":
            return { ...state, position: action.payload.position, duration: action.payload.duration };
        break;
        case "TRACK_SEEK":
            TrackPlayer.seekTo(action.payload.sliderProgress);
            return state;
        break;
        case "JUMP-FORWARD":
            TrackPlayer.seekTo(state.position + action.payload.interval);
            return state;
        break;
        case "JUMP-BACKWARD":
            TrackPlayer.seekTo(state.position - action.payload.interval);
            return state;
        break;
        case "TRACK-VOLUME":
            TrackPlayer.setVolume(Number(!state.volume));
            return { ...state, volume: !state.volume };
        break;
        default: return state;
        break;
    }

}

export default Player; 