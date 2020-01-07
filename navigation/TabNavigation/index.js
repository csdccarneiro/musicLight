
import React from 'react';
import { View, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
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
    }
});

const HeaderFull = ({navigation}) => {
    const dispatch = useDispatch();
    const music = useSelector(state => state.page_music); 
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#F89424" }}>
            <View style={{ flex: 1 }}>
                <TextInput 
                    style={{ backgroundColor: "#F89424", color: "white", fontSize: 18, paddingLeft: 20, height: 50 }}
                    placeholder={"Músicas"} 
                    placeholderTextColor={"white"}
                    onSubmitEditing={(event) => {
                        if (event.nativeEvent.text != ""){ 
                            dispatch({ type: "SEARCH_MUSIC", searchMusic: event.nativeEvent.text, listSearchMusic: music.searchMusic });
                        }    
                    }}
                    onChangeText={(text) => { if(text == "") dispatch({ type: "SEARCH_MUSIC", searchMusic: "", listSearchMusic: music.searchMusic }) }}
                />
            </View>
            <Avatar icon={{ name: 'navicon', size: 30, color: 'white', type: 'font-awesome' }} onPress={() => navigation.openDrawer()} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
        </View>
    );
}

const AppStackNavigator = createStackNavigator({
    AppTabNavigator: {
        screen: AppTabNavigator,
        navigationOptions: ({ navigation }) => ({
            header: <HeaderFull navigation={navigation} />
        })
    }
});

export default AppStackNavigator;