import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import { App, Player } from './reducers';
import root from './sagas';

//CONFIGURAÇÃO DE PERSISTÊNCIA
const persisConfig = {
    key: 'root',
    storage: AsyncStorage
};

//COMBINANDO REDUCERS
const persistedReducer = persistReducer(persisConfig, combineReducers({
    App, 
    Player
}));

const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

const persistor = persistStore(store);

sagaMiddleware.run(root);

export  { store, persistor };