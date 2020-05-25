import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store';

//TODA A NAVEGAÇÃO
import AppContainer from './App';

export default function App() {
    
    enableScreens();

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppContainer />
            </PersistGate>
        </Provider>
    );

}