import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';

function Settings({ dispatch }) {

    return (
        <View>
            <Button title={'Teste'} onPress={() => dispatch({ type: "CHANGE_THEME" })}  />
        </View>
    );

} 

export default connect(state => ({ app: state.App }))(Settings);