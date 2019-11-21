
import React from 'react';
import { View, TextInput } from 'react-native';
//IMPORTANDO TAB PAGES 
import Music from './Music';
import Movie from './Movie';
import Playlist from './Playlist';
import Downloads from './Downloads';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

const AppTabNavigator = createMaterialTopTabNavigator({
    Music: {
        screen: Music,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                return <Icon name={"music"} size={25} color={focused ? 'black' : "white"} />
            },
            tabBarLabel: "Músicas"
        })
    },
    Movie: {
        screen: Movie,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                return <Icon name={"film"} size={22} color={focused ? "black" : "white"} />
            },
            tabBarLabel: "Videos"
        })
    },
    Playlist: {
        screen: Playlist,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                return <Icon name={"list"} size={25} color={focused ? "black" : "white"} />
            },
            tabBarLabel: "Listas"
        })
    },
    Downloads: {
        screen: Downloads,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                return <Icon name={"download"} size={25} color={focused ? "black" : "white"} />
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
                    <Icon name={"navicon"} onPress={() => navigation.openDrawer()} style={{ marginRight: 15 }} size={30} color={"white"} />
                </View>
            )
        })
    }
});

export default AppStackNavigator;