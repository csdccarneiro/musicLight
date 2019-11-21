import React from 'react';
import { View } from 'react-native';
import AppContainer from './navigation';
import Service from './service';

export default function App(){
  return (
    <View style={{ flex: 1 }}>
        <AppContainer />
    </View>
  );
}


