import React from 'react';
import AppDrawerNavigation from '../navigation/DrawerNavigation';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

const AppSwitchNavigator = createSwitchNavigator({
    navigation: {
       screen: AppDrawerNavigation
    }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;