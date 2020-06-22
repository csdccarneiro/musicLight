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
        default: return state;
        break;
    }
}

export default Player; 