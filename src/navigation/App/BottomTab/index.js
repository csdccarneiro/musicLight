import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MiniPlayer } from '../../../components';

//PAGES
import Music from './Music';
import Playlist from './Playlist';
import Search from './Search';
import Settings from './Settings';

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
    
    const iconMusic = ({ color }) => <Icon name="music" color={color} size={20} />;
    const iconSearch = ({ color }) => <Icon name="search" color={color} size={20} />;
    const iconPlaylist = ({ color }) => <Icon name="list" color={color} size={20} />;
    const iconSettings = ({ color }) => <Icon name="cog" color={color} size={20} />;
    
    return (
        <Tab.Navigator backBehavior={'initialRoute'} tabBar={CustomTabBar} 
            tabBarOptions={{ adaptive: true, inactiveTintColor: 'gray' }} >
            <Tab.Screen name={"Musicas"} component={Music} options={{ tabBarIcon: iconMusic }} />
            <Tab.Screen name={"Pesquisar"} component={Search} options={{ tabBarIcon: iconSearch }} />
            <Tab.Screen name={"Playlist"} component={Playlist} options={{ tabBarIcon: iconPlaylist }} />
            <Tab.Screen name={"Configurações"} component={Settings} options={{ tabBarIcon: iconSettings }} />
        </Tab.Navigator>
    );

}

export default BottomTab;