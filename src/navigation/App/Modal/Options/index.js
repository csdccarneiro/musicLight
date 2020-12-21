import React, { useCallback } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
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
            case "SHARE":
                dispatch({ type: "SHARE_FILE", payload: { items: [item] } });
                navigation.navigate("Home");
            break;
            case "DETAILS":
                const { cover, path, rating, fileName, title, artist, album, author } = item;
                navigation.navigate("Modal", { screen: "Details", params: { item: { path, rating, album, author, 
                    fileName, title, cover } } });
            break;
            default: break;
        }
    });

    return (
        <View style={styles.container}>
            <Text numberOfLines={2} style={styles.titleModal}>{item.fileName}</Text>
            <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => executeOptions("REPRODUCTION")}><Text style={styles.textModalOptions}>Reproduzir</Text></TouchableHighlight>
            <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => executeOptions("SHARE")}><Text style={styles.textModalOptions}>Compartilhar</Text></TouchableHighlight>
            <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => executeOptions("DETAILS")}><Text style={styles.textModalOptions}>Detalhes</Text></TouchableHighlight>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "space-between"
    },
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