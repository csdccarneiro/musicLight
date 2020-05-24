import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { App } from './reducers';

const persisConfig = {
    key: 'root',
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persisConfig, combineReducers({
    App
}));

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export  { store, persistor };