import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { player, page_music } from './reducers';

const persisConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persisConfig, combineReducers({
    page_music: page_music,
    player: player
}));

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export  { store, persistor };