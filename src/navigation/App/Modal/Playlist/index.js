import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

function Playlist({ route }) {
    
    const { playList, item } = route.params;
    
    return (
        <View style={{ flex: 1, marginBottom: 10, marginTop: 10 }}>
            <View style={{ marginBottom: 15 }}>
                <Text style={style.titleModal}>Playlists</Text>
                <Text style={style.titleDescription}>Selecione uma playlist, e adicione a música</Text>
            </View>
            <FlatList
                data={playList}
                initialNumToRender={5}
                contentContainerStyle={(playList.length > 0 ? {} : style.styleList)}
                renderItem={({ item }) => <Text>{item.text}</Text>}
                ListEmptyComponent={<Text style={{ textAlign: "center" }}>Nenhuma playlist no momento</Text>}
                keyExtractor={item => item.id}
            />
        </View>
    );

}

const style = StyleSheet.create({
    styleList: { 
        flex: 1,
        justifyContent: "center", 
        alignItems: "center" 
    },  
    titleModal: {
        fontSize: 17, 
        textAlign: "center", 
        fontFamily: "sans-serif-medium",
        fontWeight: "bold"
    },
    titleDescription: {
        fontSize: 12,
        textAlign: "center"
    }
});

export default Playlist;