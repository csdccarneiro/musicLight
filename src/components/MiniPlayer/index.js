import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';

function MiniPlayer({ navigation, player, dispatch }) {

    const { colors } = useTheme();
    
    function ProgressBar() {
        return (
            <View style={styles.progress}>
                <View style={{ flex: player.position, backgroundColor: "red" }} />
                <View style={{ flex: player.duration - player.position, backgroundColor: "transparent" }} />
            </View>
        )
    }

    return (
        <View style={{ display: (player.id ? "flex" : "none") }}>
            <ProgressBar />
            <TouchableOpacity onPress={() => navigation.navigate("Player")} style={{ ...styles.container, 
                backgroundColor: colors.primary }}>
                <Image source={{ uri: player.icon }} style={styles.image} />
                <View style={styles.containerText}> 
                    <Text numberOfLines={1} style={styles.playerTitle}>{player.title}</Text>
                    <Text numberOfLines={1} style={styles.playerSubTitle}>{player.subtitle}</Text>
                </View>
                <View style={styles.containerControllers}>
                    <Icon.Button name={(player.play ? "pause" : "play-arrow")} size={45} color={"white"}
                        borderRadius={50} marginRight={-10} padding={6} backgroundColor={"transparent"} 
                        onPress={() => dispatch({ type: "TOGGLE_PLAY_PAUSE" })} underlayColor={"#C7C7C7"} />
                    <Icon.Button name={"fast-forward"} onPress={() => dispatch({ type: "TRACK_NEXT" })} size={30}
                        borderRadius={50} marginRight={-10} padding={4} underlayColor={"#C7C7C7"} color={"white"} 
                        backgroundColor={"transparent"} />
                </View>
            </TouchableOpacity>
        </View>
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
        paddingRight: 5
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