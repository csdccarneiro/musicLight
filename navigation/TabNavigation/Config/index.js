import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Config({  navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text onPress={() => navigation.openDrawer()} >Config!</Text>
        </View>
    );
}