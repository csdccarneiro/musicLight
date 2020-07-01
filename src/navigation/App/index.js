import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { connect } from 'react-redux';

//TELA INICIAL
import BottomTab from './BottomTab';
import Player from './Player'; 

//TEMAS
import THEMES from '../../Themes';

const Stack = createNativeStackNavigator();

function AppContainer({ app, dispatch }) {

    useEffect(() => {
        dispatch({ type: "ASYNC_GET_MUSICS" });
    }, []);
    
    return (
        <NavigationContainer theme={app.dark ? THEMES.Dark : THEMES.Light}>
            <Stack.Navigator screenOptions={{ headerShown: false }}  >
                <Stack.Screen name={"Home"} component={BottomTab} />
                <Stack.Screen name={"Player"} component={Player} />
            </Stack.Navigator>
        </NavigationContainer>
    );

}

export default connect(state => ({ app: state.App }))(AppContainer);