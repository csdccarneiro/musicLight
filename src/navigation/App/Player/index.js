import React, { memo } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
  
function Player({ navigation, player, dispatch }) {

    const { colors } = useTheme();

    function formatTime(seconds) {
        return seconds > 3600 ?
        [parseInt(seconds / 60 / 60), parseInt(seconds / 60 % 60), parseInt(seconds % 60)]
        .join(":").replace(/\b(\d)\b/g, "0$1") :
        [parseInt(seconds / 60 % 60), parseInt(seconds % 60)]
        .join(":").replace(/\b(\d)\b/g, "0$1")
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerOptions}>
                <Icon.Button name={"expand-more"} size={25} color={colors.text} underlayColor={"#B7B6B6"}
                    backgroundColor={"transparent"} onPress={() => navigation.goBack()} iconStyle={{ marginRight: 2 }} />
                <Icon.Button name={"more-vert"} size={25} color={colors.text} backgroundColor={"transparent"}
                    underlayColor={"#B7B6B6"} onPress={() => navigation.goBack()} iconStyle={{ marginRight: 0 }} />
            </View>
            <View style={styles.containerTrackInfo}>
                <Image source={{ uri: player.icon }} style={styles.image} />
                <View>
                    <Text style={{ ...styles.playerTitle, color: colors.text }}>{player.title}</Text>
                    <Text style={{ ...styles.playersubtitle, color: colors.text }}>{player.subtitle}</Text>
                </View>
                <View>
                    <Slider style={styles.slider} minimumValue={0} maximumValue={player.duration} value={player.position} 
                        thumbTintColor={colors.primary} minimumTrackTintColor={colors.primary} maximumTrackTintColor={colors.text}
                        onSlidingComplete={value => dispatch({ type: "TRACK_SEEK", payload: { sliderProgress: value } })} />
                    <View style={styles.containerText}>
                        <Text style={{ color: colors.text }}>{formatTime(player.position)}</Text>
                        <Text style={{ color: colors.text }}>{formatTime(player.duration)}</Text>
                    </View>
                </View>
                <View style={styles.containerControllers}>
                    <Icon.Button name={"fast-rewind"} onPress={() => dispatch({ type: "TRACK_PREVIOUS" })} 
                        borderRadius={50} size={50} marginRight={-8} underlayColor={"#C7C7C7"}
                        color={colors.text} backgroundColor={"transparent"} />
                    <Icon.Button name={(player.play ? "pause" : "play-arrow")} size={60} borderRadius={50} 
                        marginRight={-10} underlayColor={"#C7C7C7"} color={"white"} backgroundColor={colors.primary} 
                        onPress={() => dispatch({ type: "TOGGLE_PLAY_PAUSE" })} />
                    <Icon.Button name={"fast-forward"} onPress={() => dispatch({ type: "TRACK_NEXT" })} size={50}
                        borderRadius={50} marginRight={-10} underlayColor={"#C7C7C7"} color={colors.text} 
                        backgroundColor={"transparent"} />
                </View>
                <View style={styles.containerOtherControllers}>
                    <Icon.Button name={player.reproduction} size={22} backgroundColor={"transparent"} marginLeft={8}
                        iconStyle={{ paddingVertical: 8 }} onPress={() => dispatch({ type: "TRACK_REPRODUCTION" })}
                        color={colors.primary} borderRadius={50} underlayColor={"#C7C7C7"} />
                    <Icon.Button name={"rotate-left"} size={22} backgroundColor={"transparent"} marginLeft={8}
                        iconStyle={{ paddingVertical: 8 }} onPress={() => dispatch({ type: "JUMP_BACKWARD", payload: { interval: 15 } })}
                        color={colors.text} borderRadius={50} underlayColor={"#C7C7C7"} />
                    <Icon.Button name={(player.volume ? "volume-up" : "volume-off")} size={22} marginLeft={8} 
                        backgroundColor={"transparent"} color={colors.text} borderRadius={50} marginTop={8}
                        onPress={() => dispatch({ type: "TRACK_VOLUME" })} underlayColor={"#C7C7C7"} />
                    <Icon.Button name={"rotate-right"} size={22} backgroundColor={"transparent"} marginLeft={8}
                        iconStyle={{ paddingVertical: 8 }} onPress={() => dispatch({ type: "JUMP_FORWARD", payload: { interval: 15 } })}
                        color={colors.text} borderRadius={50} underlayColor={"#C7C7C7"} />
                    <Icon.Button name={"favorite-border"} size={22} backgroundColor={"transparent"} marginLeft={8}
                        iconStyle={{ paddingVertical: 8 }} onPress={() => dispatch({ type: "TRACK_REPRODUCTION" })}
                        color={colors.primary} borderRadius={50} underlayColor={"#C7C7C7"} />
                </View>
            </View>
        </View>
    );
//favorite
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerOptions: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        paddingHorizontal: 5, 
        paddingVertical: 5
    },  
    containerTrackInfo: {
        justifyContent: "space-evenly", 
        flex: 1, 
        paddingHorizontal: 20
    },
    image: {
        width: "100%", 
        height: "50%",
        borderRadius: 15
    },  
    slider: {
        width: "100%", 
        marginLeft: 5
    },
    containerText: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        paddingLeft: 15, 
        paddingRight: 10
    },  
    containerControllers: {
        flexDirection: "row", 
        justifyContent: "space-evenly", 
        paddingHorizontal: 70, 
        alignItems: "center"
    },
    containerOtherControllers: {
        flexDirection: "row", 
        justifyContent: "space-evenly", 
        paddingHorizontal: 40  
    },
    playerTitle: {
        fontSize: 19,
        textAlign: "center",
        fontFamily: "sans-serif-medium",
        fontWeight: 'bold'
    },
    playersubtitle: {
        fontSize: 12,
        textAlign: "center",
        fontFamily: "sans-serif-medium"
    }
});

export default connect(state => ({ player: state.Player }))(memo(Player));