import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux';

function Settings({ app, dispatch }) {
    
    const { colors } = useTheme();
    const [ minimumMusicDuration, setMinimumMusicDuration ] = useState(app.minimumMusicDuration);

    function formatTime(seconds) {
        var time = parseFloat((seconds % 1).toFixed(1));
        return (time > 0.5 ? Math.round(seconds) : parseFloat(seconds.toFixed(1)));
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={{ color: colors.primary, fontWeight: "bold", fontSize: 17 }}>Temas</Text>
                <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", padding: 20 }}>
                    <Text style={{ color: colors.text, fontSize: 15 }}>Modo escuro</Text>
                    <Switch trackColor={{ false: "#B7B6B6", true: "#B7B6B6" }}
                        thumbColor={colors.primary} ios_backgroundColor={colors.primary}
                        onValueChange={() => dispatch({ type: "CHANGE_THEME" })}
                        value={app.dark}
                    />
                </View>
            </View>
            <View>
               <Text style={{ color: colors.primary, fontWeight: "bold", fontSize: 17 }}>Filtro de arquivos</Text>
               <View style={{ justifyContent: "space-between", padding: 20 }}>
                    <Text style={{ color: "#B7B6B6", fontSize: 13 }}>Ignorar músicas com duração inferior a: {minimumMusicDuration} minutos</Text>
                    <View style={{ flexDirection: "row", marginTop: 17, alignItems: "center" }}>
                        <Text style={{ color: colors.text, fontSize: 14 }}>0</Text>
                        <Slider style={{ width: "88%" }} step={0.10} minimumValue={0} maximumValue={5}
                            minimumTrackTintColor={"#FFFFFF"} maximumTrackTintColor={"#000000"}
                            value={minimumMusicDuration} onValueChange={value => setMinimumMusicDuration(formatTime(value))}
                        />
                        <Text style={{ color: colors.text, fontSize: 14 }}>5</Text>
                    </View>
                </View>
            </View>
        </View>
    );

} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
});

export default connect(state => ({ app: state.App }))(Settings);