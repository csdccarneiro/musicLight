import React, { memo } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import { useTheme } from '@react-navigation/native';
  
function Player({ navigation }) {

    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.containerOptions}>
                <Icon.Button name={"chevron-down"} size={20} color={colors.text} backgroundColor={"transparent"}
                    underlayColor={"#B7B6B6"} onPress={() => navigation.goBack()} iconStyle={{ marginRight: 0 }} />
                <Icon.Button name={"ellipsis-v"} size={20} color={colors.text} backgroundColor={"transparent"} 
                    iconStyle={{ marginRight: 0 }} />
            </View>
            <View style={styles.containerTrackInfo}>
                <Image source={{ uri: "file:///storage/emulated/0/354306.jpg" }} style={styles.image} />
                <View>
                    <Text style={{ ...styles.playerTitle, color: colors.text }}>Radioactive Imagine Dragons (ft The Macy Kate Band  Kurt Schneider)</Text>
                    <Text style={{ ...styles.playersubtitle, color: colors.text }}>Artista Desconhecido</Text>
                </View>
                <View>
                    <Slider style={styles.slider} minimumValue={0} maximumValue={1} thumbTintColor={colors.primary} 
                        minimumTrackTintColor={colors.primary} maximumTrackTintColor={colors.text} />
                    <View style={styles.containerText}>
                        <Text style={{ color: colors.text }}>00:00</Text>
                        <Text style={{ color: colors.text }}>03:00</Text>
                    </View>
                </View>
                <View style={styles.containerControllers}>
                    <Icon.Button name={"backward"} size={33} backgroundColor={"transparent"} borderRadius={50}
                        marginHorizontal={-4} color={colors.text} />
                    <Icon.Button name={"pause"} size={40} backgroundColor={colors.primary} color={"white"} 
                        borderRadius={50} iconStyle={{ paddingVertical: 12, paddingLeft: 15, paddingRight: 6 }} />
                    <Icon.Button name={"forward"} size={33} iconStyle={{ paddingHorizontal: 4 }} 
                        backgroundColor={"transparent"} marginRight={-15} color={colors.text} borderRadius={50} />
                </View>
                <View style={styles.containerOtherControllers}>
                    <Icon.Button name={"rotate-left"} size={20} backgroundColor={"transparent"} 
                        iconStyle={{ paddingVertical: 5 }} marginLeft={6} color={colors.text} borderRadius={50} />
                    <Icon.Button name={"rotate-right"} size={20} backgroundColor={"transparent"} 
                        iconStyle={{ paddingVertical: 5 }} marginLeft={6} color={colors.text} borderRadius={50} />
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerOptions: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        paddingHorizontal: 10, 
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

export default memo(Player);