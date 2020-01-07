import TrackPlayer from "react-native-track-player";
import controller from '../../../../controller';

const DATA_PLAYER = {
    id: null,
    fileName: '',
    artwork: '',
    duration: 0,
    position: 0,
    velocity: 1,
    modeReproduction: 'refresh',
    iconPlayer: 'play',
    playing: false,
    animationLoop: '0deg'
};

const player = (state = DATA_PLAYER, action) => {
    switch (action.type) {
        case "ADD_OR_MODIFY_TRACK":
            TrackPlayer.skip(action.musicId);
            TrackPlayer.play();
            return state;
        break;
        case "TRACK_CHANGE":
            return { ...state, id: action.dataMusic.id, fileName: action.dataMusic.fileName, 
                artwork: action.dataMusic.artwork };
        break;
        case "TRACK_PLAY":
            TrackPlayer.play();
            return state;
        break;
        case "TRACK_PAUSE":
            TrackPlayer.pause();
            return state;
        break;
        case "CHANGE_MODE_REPRODUCTION":
            if (state.modeReproduction == "refresh")
                return { ...state, modeReproduction: "repeat" };
            else if (state.modeReproduction == "repeat")
                return { ...state, modeReproduction: "random" };
            else
                return { ...state, modeReproduction: "refresh" };
        break;
        case "TRACK_PREVIOUS":
            TrackPlayer.skipToPrevious();
            return state;
        break;
        case "TRACK_NEXT":
            TrackPlayer.skipToNext();
            return state;
        break;
        case "MODIFY_STATE":
            return { ...state, animationLoop: action.animationLoop, iconPlayer: action.iconPlayer };
        break;
        case "UPDATE_POSITION_AND_DURATION":
            return { ...state, position: action.position, duration: action.duration };
        break;
        
        default: return state;
        break;
    }
}

export default player; 