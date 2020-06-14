import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';

function MiniPlayer({ navigation }) {

    const { colors } = useTheme();
    
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Player")} style={{ ...styles.container, backgroundColor: colors.primary }}>
            <Image source={{ uri: "file:///storage/emulated/0/354306.jpg" }} style={styles.image} />
            <View style={styles.containerText}> 
                <Text numberOfLines={1} style={styles.playerTitle}>Radioactive Imagine Dragons (ft The Macy Kate Band  Kurt Schneider)</Text>
                <Text style={styles.playerSubTitle}>Artista Desconhecido</Text>
            </View>
            <View style={styles.containerControllers}>
                <Icon.Button name={"backward"} size={25} underlayColor={"#808080"} iconStyle={{ ...styles.icon, marginLeft: -5 }} onPress={() => alert("Olá")} color={"white"} backgroundColor={"transparent"} />
                <Icon.Button name={"pause"} size={33} underlayColor={"#808080"} iconStyle={styles.icon} onPress={() => alert("Olá")} color={"white"} backgroundColor={"transparent"} />
                <Icon.Button name={"forward"} size={25} underlayColor={"#808080"} iconStyle={{ ...styles.icon, marginRight: -5 }} onPress={() => alert("Olá")} color={"white"} backgroundColor={"transparent"} />
            </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        alignItems: "center", 
        paddingLeft: 10,
        paddingRight: 5, 
        paddingVertical: 10
    },
    image: {
        borderRadius: 5,
        width: 40, 
        height: 40
    },
    containerText: {
        flex: 1, 
        marginHorizontal: 8
    },
    containerControllers: {
        flexDirection: "row", 
        alignItems: "center"
    },  
    icon: {
        marginRight: 0, 
        marginTop: -5, 
        marginBottom: -5
    },
    playerTitle: {
        fontSize: 16,
        color: "white",
        fontFamily: "sans-serif-medium",
        fontWeight: 'bold'
    },
    playerSubTitle: {
        fontSize: 11,
        color: "white",
        fontFamily: "sans-serif-medium"
    }
});

export default memo(MiniPlayer);