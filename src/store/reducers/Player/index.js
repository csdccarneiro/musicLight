import controllers from "../../../controllers";

const DATA_INITIAL_PLAYER = {
    id: null,
    title: null,
    subtitle: null,
    icon: null,
    duration: 0,
    position: 0,
    play: false,
    path: null,
    album: null,
    author: null,
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
        case "TRACK_FAVORITE":
            return { ...state, rating: action.payload.rating };
        break;
        case "TRACK_SELECT":
            controllers.MusicController.selectTrack(action.payload.musicId);
            return state;
        break;
        case "TRACK_CHANGE":
            const { id, title, artist, artwork, rating, url, author, album } = action.payload;
            return { ...state, id, title, rating, author, album, subtitle: artist, icon: artwork, path: url };
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
            const { position, duration } = action.payload;
            return { ...state, position, duration };
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