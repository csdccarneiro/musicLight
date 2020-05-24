import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

//PAGES
//import Music from './Music';
import Playlist from './Playlist';
import Search from './Search';
import Settings from './Settings';

function BottomTab() {
    
    const Tab = createBottomTabNavigator();
    
    //const iconMusic = ({ color }) => <Icon name="music" color={color} size={20} />;
    const iconSearch = ({ color }) => <Icon name="search" color={color} size={20} />;
    const iconPlaylist = ({ color }) => <Icon name="list" color={color} size={20} />;
    const iconSettings = ({ color }) => <Icon name="cog" color={color} size={20} />;
    //<Tab.Screen name="Musicas" component={Music} options={{ tabBarIcon: iconMusic }} />
    
    return (
        <Tab.Navigator backBehavior={'initialRoute'} tabBarOptions={{ adaptive: true, inactiveTintColor: 'gray' }} >
            <Tab.Screen name="Pesquisar" component={Search} options={{ tabBarIcon: iconSearch }} />
            <Tab.Screen name="Playlist" component={Playlist} options={{ tabBarIcon: iconPlaylist }} />
            <Tab.Screen name="Configurações" component={Settings} options={{ tabBarIcon: iconSettings }} />
        </Tab.Navigator>
    );

}

export default BottomTab;