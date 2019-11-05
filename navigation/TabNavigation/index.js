
import React from 'react';
import { View, TextInput } from 'react-native';
//IMPORTANDO TAB PAGES 
import Music from './Music';
import Movie from './Movie';
import Playlist from './Playlist';
import Downloads from './Downloads';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

//#3498db

const AppTabNavigator = createBottomTabNavigator({
    Music: {
        screen: Music,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                return <Icon name={"music"} size={focused ? 25 : 18} color={focused ? "#F89424" : "#999"} />
            },
            tabBarLabel: "Músicas"
        })
    },
    Movie: {
        screen: Movie,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                return <Icon name={"film"} size={focused ? 25 : 18} color={focused ? "#F89424" : "#999"} />
            },
            tabBarLabel: "Videos"
        })
    },
    Playlist: {
        screen: Playlist,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                return <Icon name={"list"} size={focused ? 25 : 18} color={focused ? "#F89424" : "#999"} />
            },
            tabBarLabel: "Lista de Reprodução"
        })
    },
    Downloads: {
        screen: Downloads,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                return <Icon name={"download"} size={focused ? 25 : 18} color={focused ? "#F89424" : "#999"} />
            }
        })
    },
    Config: {
        screen: "Config",
        navigationOptions: ({ navigation }) => ({
            tabBarOnPress: () => {
                navigation.openDrawer();
            },
            tabBarLabel: "Configurações",
            tabBarIcon: <Icon name={"gear"} size={18} color={"#999"} />
        })
    }
}, {
    tabBarOptions: {
        activeTintColor: 'orange',
        labelStyle: ({ fontSize: 13 }),
        tabStyle: ({ backgroundColor: 'black', paddingBottom: 5, paddingTop: 5 }),
    },
});

const AppStackNavigator = createStackNavigator({
    AppTabNavigator: {
        screen: AppTabNavigator,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TextInput 
                    style={{ backgroundColor: "#F89424", color: "white", fontSize: 18, paddingLeft: 25, height: 50 }}
                    placeholder={"Músicas"} 
                    placeholderTextColor={"white"} 
                />
            )
        })
    }
});


export default AppStackNavigator;