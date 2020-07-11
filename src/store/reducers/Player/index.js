import controllers from "../../../controllers";

const DATA_INITIAL_PLAYER = {
    id: null,
    title: null,
    subtitle: null,
    icon: null,
    duration: 0,
    position: 0,
    play: false,
    rating: false,
    volume: true,
    velocity: 0,
    reproduction: "repeat"
};

const Player = (state = DATA_INITIAL_PLAYER, action) => {
    switch (action.type) {
        case "INIT_MUSICS":
            controllers.MusicController.initMusic(action.payload.localListMusic, state);
            return state;
        break;
        case "TRACK_SELECT":
            controllers.MusicController.selectTrack(action.payload.musicId);
            return state;
        break;
        case "TRACK_CHANGE":
            console.log(action.payload);
            return { ...state, id: action.payload.id, title: action.payload.title, 
                    subtitle: action.payload.artist, icon: action.payload.artwork };
        break;
        case "TOGGLE_PLAY_PAUSE":
            controllers.MusicController.togglePlayAndPause();
            return state;
        break;
        case "TRACK_STATE":
            return { ...state, play: action.payload.play };
        break;        
        case "TRACK_NEXT":
            controllers.MusicController.nextTrack();
            return state;
        break;
        case "TRACK_PREVIOUS":
            controllers.MusicController.previousTrack();
            return state;
        break;
        case "TRACK_PROGRESS":
            return { ...state, position: action.payload.position, 
                duration: action.payload.duration };
        break;
        case "TRACK_SEEK":
            controllers.MusicController.seekTrack(action.payload.sliderProgress);
            return state;
        break;
        case "JUMP_FORWARD":
            controllers.MusicController.seekTrack(state.position + action.payload.interval);
            return state;
        break;
        case "JUMP_BACKWARD":
            controllers.MusicController.seekTrack(state.position - action.payload.interval);
            return state;
        break;
        case "TRACK_VOLUME":
            controllers.MusicController.volumeTrack(Number(!state.volume));
            return { ...state, volume: !state.volume };
        break;
        case "TRACK_REPRODUCTION":
            if(state.reproduction == "repeat")
                return { ...state, reproduction: "repeat-one" };
            else if(state.reproduction == "repeat-one")
                return { ...state, reproduction: "shuffle" };
            else
                return { ...state, reproduction: "repeat" };
        break;
        default: return state;
        break;
    }

}

export default Player; 