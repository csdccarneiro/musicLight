import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'; 

function Details({ route }) { 
    
    const { item } = route.params; 
    
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.cover }} style={styles.iconDetail} />
            <Text numberOfLines={2} style={styles.containerLine}>
                <Text style={styles.titleDetail}>Título: </Text> 
                <Text>{item.fileName}</Text> 
            </Text>
            <Text numberOfLines={2} style={styles.containerLine}>
                <Text style={styles.titleDetail}>Album: </Text> 
                <Text>{item.album}</Text> 
            </Text>
            <Text numberOfLines={2} style={styles.containerLine}>
                <Text style={styles.titleDetail}>Autor: </Text> 
                <Text>{item.author}</Text> 
            </Text>
            <Text style={styles.containerLine}>
                <Text style={styles.titleDetail}>Favorito: </Text> 
                <Text>{(item.rating ? "Sim" : "Não")}</Text> 
            </Text>
            <Text numberOfLines={3} style={styles.containerLine}>
                <Text style={styles.titleDetail}>Caminho: </Text>
                <Text>{item.path}</Text>
            </Text>
        </View> 
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20, 
        paddingVertical: 20,
        justifyContent: "space-between"
    },
    iconDetail: {
        width: 100, 
        height: 100, 
        alignSelf: "center", 
        marginBottom: 10
    },
    containerLine: {
        fontSize: 15, 
        paddingTop: 10
    },
    titleDetail: {
        fontWeight: "bold"
    }
});

export default Details;