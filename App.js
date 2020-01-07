import React from 'react';
import { View } from 'react-native';
import AppContainer from './navigation';
import { store, persistor } from './store';
import { Provider }  from 'react-redux';
import { PersistGate }  from 'redux-persist/integration/react';


export default function App(){
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1 }}>
              <AppContainer />
          </View>
        </PersistGate>
    </Provider>
  );
}

