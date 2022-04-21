import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MiniPlayer } from '../../../components';

//PAGES
import Music from './Music';
import Search from './Search';

const Tab = createBottomTabNavigator();

//BAR CUSTOMIZADA
function CustomTabBar(props) {
    return (
        <>
            <MiniPlayer />
            <BottomTabBar {...props} />
        </>
    );
}

function BottomTab() {
    
    const iconMusic = ({ color }) => <Icon name={"headset"} color={color} size={22} />;
    const iconSearch = ({ color }) => <Icon name={"search"} color={color} size={27} />;
    
    return (
        <Tab.Navigator backBehavior={'initialRoute'} tabBar={CustomTabBar} 
            tabBarOptions={{ inactiveTintColor: 'gray', tabStyle: { paddingBottom: 3 } }} >
            <Tab.Screen name={"Musicas"} component={Music} options={{ tabBarIcon: iconMusic }} />
            <Tab.Screen name={"Pesquisar"} component={Search} options={{ tabBarIcon: iconSearch }} />
        </Tab.Navigator>
    );

}

export default BottomTab;