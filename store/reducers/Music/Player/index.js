import TrackPlayer from "react-native-track-player";
import controller from '../../../../controller';


const DATA_PLAYER = {
    id: '',
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
            controller.musicController.initMusic(action.listMusic, action.musicId);
            return state;
        break;
        case "TRACK_CHANGE":
            return { ...state, 
                id: action.dataMusic.id, fileName: action.dataMusic.fileName, 
                iconPlayer: "pause", artwork: action.dataMusic.artwork 
            };
        break;
        case "TRACK_PLAY":
            TrackPlayer.play();
            return { ...state, iconPlayer: "pause" };
        break;
        case "TRACK_PAUSE":
            TrackPlayer.pause();
            return { ...state, iconPlayer: "play" };
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
            return { ...state, animationLoop: action.animationLoop, playing: action.playing };
        break;
        
        default: return state;
        break;
    }
}

export default player; 