
import React from 'react';
import { View, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
//IMPORTANDO TAB PAGES 
import Music from './Music';
import Movie from './Movie';
import Playlist from './Playlist';
import Downloads from './Downloads';

const AppTabNavigator = createMaterialTopTabNavigator({
    Music: {
        screen: Music,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                return <Avatar icon={{ name: 'music', size: 25, color: (focused ? 'black' : "white"), type: 'font-awesome' }} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={25} />
            },
            tabBarLabel: "Músicas"
        })
    },
    Movie: {
        screen: Movie,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                return <Avatar icon={{ name: 'film', size: 22, color: (focused ? 'black' : "white"), type: 'font-awesome' }} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={25} />
            },
            tabBarLabel: "Videos"
        })
    },
    Playlist: {
        screen: Playlist,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                return <Avatar icon={{ name: 'list', size: 25, color: (focused ? 'black' : "white"), type: 'font-awesome' }} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={25} />
            },
            tabBarLabel: "Listas"
        })
    },
    Downloads: {
        screen: Downloads,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                return <Avatar icon={{ name: 'download', size: 25, color: (focused ? 'black' : "white"), type: 'font-awesome' }} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={25} />
            }
        })
    }
}, {
    tabBarOptions: {
        upperCaseLabel: false,
        showIcon: true,
        keyboardHidesTabBar: false,
        activeTintColor: 'black',
        labelStyle: ({ fontSize: 13, marginTop: 0 }),
        tabStyle: ({ backgroundColor: "#F89424", padding: 0 })
    },
});

const AppStackNavigator = createStackNavigator({
    AppTabNavigator: {
        screen: AppTabNavigator,
        navigationOptions: ({ navigation }) => ({
            header: (
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#F89424" }}>
                    <View style={{ flex: 1 }}>
                        <TextInput 
                            style={{ backgroundColor: "#F89424", color: "white", fontSize: 18, paddingLeft: 20, height: 50 }}
                            placeholder={"Músicas"} 
                            placeholderTextColor={"white"} 
                        />
                    </View>
                    <Avatar icon={{ name: 'navicon', size: 30, color: 'white', type: 'font-awesome' }} onPress={() => navigation.openDrawer()} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
                </View>
            )
        })
    }
});

export default AppStackNavigator;