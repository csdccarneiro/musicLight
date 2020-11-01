import React, { useCallback } from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

function Options({ route, navigation }) {   

    const { app, item } = route.params;
    const dispatch = useDispatch();

    const executeOptions = useCallback(action => {

        switch (action) {
            case "REPRODUCTION":
                dispatch({ type: "TRACK_SELECT", payload: { musicId: item.id } });
                navigation.navigate("Home");
            break;
            case "ADD_PLAYLIST":
                navigation.navigate("Modal", { screen: "Playlist", params: { playList: app.playList, item } });
            break;
            case "SHARE":
                dispatch({ type: "SHARE_FILE", payload: { items: [item] } });
                navigation.navigate("Home");
            break;
            default: break;
        }
    });

    return (
        <>
            <Text numberOfLines={2} style={styles.titleModal}>{item.fileName}</Text>
            <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => executeOptions("REPRODUCTION")}><Text style={styles.textModalOptions}>Reproduzir</Text></TouchableHighlight>
            <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => executeOptions("ADD_PLAYLIST")}><Text style={styles.textModalOptions}>Adicionar a playlist</Text></TouchableHighlight>
            <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => executeOptions("SHARE")}><Text style={styles.textModalOptions}>Compartilhar</Text></TouchableHighlight>
        </>
    );

}

const styles = StyleSheet.create({
    titleModal: {
        fontSize: 17, 
        textAlign: "center", 
        paddingHorizontal: 20, 
        fontFamily: "sans-serif-medium",
        paddingTop: 15,
        paddingBottom: 5, 
        fontWeight: "bold"
    },
    textModalOptions: {
        padding: 15, 
        fontSize: 15
    }
});

export default Options;