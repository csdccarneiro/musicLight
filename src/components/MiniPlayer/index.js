import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';

function MiniPlayer({ navigation, player, dispatch }) {

    const { colors } = useTheme();

    function ProgressBar() {
        return (
            <View style={styles.progress}>
                <View style={{ flex: player.progress, backgroundColor: "red" }} />
                <View style={{ flex: player.duration - player.progress, backgroundColor: "#C7C7C7" }} />
            </View>
        )
    }

    return (
        <>
            <ProgressBar />
            <TouchableOpacity onPress={() => navigation.navigate("Player")} style={{ ...styles.container, backgroundColor: colors.primary }}>
                <Image source={{ uri: player.icon }} style={styles.image} />
                <View style={styles.containerText}> 
                    <Text numberOfLines={1} style={styles.playerTitle}>{player.title}</Text>
                    <Text numberOfLines={1} style={styles.playerSubTitle}>{player.subtitle}</Text>
                </View>
                <View style={styles.containerControllers}>
                    <Icon.Button name={"backward"} size={25} underlayColor={"#808080"} iconStyle={{ ...styles.icon, marginLeft: -5 }} onPress={() => dispatch({ type: "TRACK_PREVIOUS" })} color={"white"} backgroundColor={"transparent"} />
                    <Icon.Button name={(player.play ? "pause" : "play")} size={33} underlayColor={"#808080"} iconStyle={styles.icon} onPress={() => dispatch({ type: (player.play ? "TRACK_PAUSE" : "TRACK_PLAY") })} color={"white"} backgroundColor={"transparent"} />
                    <Icon.Button name={"forward"} size={25} underlayColor={"#808080"} iconStyle={{ ...styles.icon, marginRight: -5 }} onPress={() => dispatch({ type: "TRACK_NEXT" })} color={"white"} backgroundColor={"transparent"} />
                </View>
            </TouchableOpacity>
        </>
    );

}

const styles = StyleSheet.create({
    progress: {
        height: 4,
        width: "100%",
        flexDirection: "row"
    },
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

export default connect(state => ({ player: state.Player }))(memo(MiniPlayer));