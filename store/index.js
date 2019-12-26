import { createStore, combineReducers } from 'redux';
import { player, page_music } from './reducers';

const store = createStore(combineReducers({
    player: player,
    page_music: page_music
}));

export default store;