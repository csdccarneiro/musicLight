import React from 'react';
import { View, StatusBar } from 'react-native';
import Music from './navigation/Music';
import { store, persistor } from './store';
import { Provider }  from 'react-redux';
import { PersistGate }  from 'redux-persist/integration/react';

export default function App(){
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar barStyle={'light-content'} backgroundColor={"#F89424"}/>
                <Music />
            </View>
        </PersistGate>
    </Provider>
  );
}
