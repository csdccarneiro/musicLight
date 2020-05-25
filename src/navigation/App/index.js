import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

//TELA INICIAL
import BottomTab from './BottomTab'; 

//TEMAS
import THEMES from '../../Themes';

function AppContainer({ app, dispatch }) {

    useEffect(() => {
        dispatch({ type: "ASYNC_GET_MUSICS", payload: {} });
    }, []);

    return (
        <NavigationContainer theme={app.dark ? THEMES.Dark : THEMES.Light}>
            <BottomTab />
        </NavigationContainer>
    );

}

export default connect(state => ({ app: state.App }))(AppContainer);