import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { player, page_music } from './reducers';

const persisConfig = {
    key: 'root',
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persisConfig, combineReducers({
    page_music: page_music,
    player: player
}));

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export  { store, persistor };