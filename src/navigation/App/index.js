import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

//TELA INICIAL
import BottomTab from './BottomTab';

//TEMAS
import THEMES from '../../Themes';

function AppContainer({ app }) {

    // theme={app.dark ? THEME.dark : THEME.light}

    return (
        <NavigationContainer>
            <BottomTab />
        </NavigationContainer>
    );

}

export default connect()(AppContainer);