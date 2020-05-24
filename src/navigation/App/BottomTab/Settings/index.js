import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';

function Settings() {

    const dispatch = useDispatch();

    return (
        <View>
            <Button title={'Teste'} onPress={() => dispatch({ type: "MODIFY_THEME" })}  />
        </View>
    );

} 

export default Settings;