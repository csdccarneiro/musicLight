import React from 'react';
import { View } from 'react-native';
import AppContainer from './navigation';
import Service from './service';
import store from './store';
import { Provider }  from 'react-redux';

export default function App(){
  return (
    <Provider store={store}>
        <View style={{ flex: 1 }}>
            <AppContainer />
        </View>
    </Provider>
  );
}

