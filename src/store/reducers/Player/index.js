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
    progress: 0,
    velocity: 0,
};

const Player = (state = DATA_INITIAL_PLAYER, action) => {
    switch (action.type) {
        case "ADD_OR_INIT_MUSICS":
            controllers.MusicController.initMusic(action.payload.localListMusic, action.payload.musicId);
            return state;
        break;
        case "TRACK_CHANGE":
            return { ...state, id: action.music.id, title: action.music.title, 
                subtitle: action.music.artist, icon: action.music.artwork };
        break;
        case "TRACK_PLAY":
            TrackPlayer.play();
            return { ...state, play: true };
        break;
        case "TRACK_PAUSE":
            TrackPlayer.pause();
            return { ...state, play: false };
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
            return { ...state, progress: action.progress, duration: action.duration };
        break;
        default: return state;
        break;
    }

}

export default Player; 