import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';

function Settings({ app, dispatch }) {
    
    const { colors } = useTheme();

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