import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

//PAGES MODAL
import Options from "./Options";
import Details from "./Details";

const ModalStack = createNativeStackNavigator();

function Modal({ navigation }) {

    return (
        <View style={style.container}>
            <View style={style.background} onStartShouldSetResponder={() => navigation.goBack()} />
            <View style={style.containerModal}>
                <ModalStack.Navigator screenOptions={{ headerShown: false, contentStyle: style.modal }}>
                    <ModalStack.Screen name={"Options"} component={Options} />
                    <ModalStack.Screen name={"Details"} component={Details} />
                </ModalStack.Navigator>
            </View>
        </View>
    );

}

const style = StyleSheet.create({   
    container: {
        flex: 1, 
        justifyContent: "center"
    },
    background: {
        flex: 1,
        backgroundColor: "black",
        opacity: 0.5
    },
    containerModal: {
        position: "absolute",
        height: "30%", 
        width: "90%", 
        alignSelf: "center"
    },  
    modal: {       
        backgroundColor: "white"
    }
});

export default Modal;