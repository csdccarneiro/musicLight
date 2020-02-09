import React from 'react';
import { View, StyleSheet, TextInput, Picker } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useDispatch } from 'react-redux';

export default function Toolbar(props) {

    const dispatch = useDispatch();

    return (
        <View style={style.container}>
            <View style={style.containerInput}>
                <TextInput 
                    style={style.inputSearch}
                    placeholder={"Pesquise uma Música"} 
                    placeholderTextColor={"white"}
                    onSubmitEditing={(event) => {
                        if (event.nativeEvent.text != "")
                            dispatch({ type: "SEARCH_MUSIC", searchMusic: event.nativeEvent.text, listSearchMusic: props.searchMusic });
                    }}
                    onChangeText={(text) => { if(text == "") dispatch({ type: "SEARCH_MUSIC", searchMusic: "", listSearchMusic: props.searchMusic }) }}
                />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Avatar icon={{ name: 'ellipsis-v', size: 23, color: 'white', type: 'font-awesome' }} overlayContainerStyle={{ backgroundColor: 'transparent', marginRight: 5 }} size={"small"} />
                <Picker style={style.picker}
                    onValueChange={(itemValue, itemIndex) => {
                        if(itemValue === "listing")
                            props.openModeListing();
                        else if(itemValue === "rate")
                            props.openModeRate();
                    }}> 
                    <Picker.Item label="Opções" color={"#F89424"} />
                    <Picker.Item label="Modo de Listagem" value="listing" />
                    <Picker.Item label="Velocidade de Reprodução" value="rate" />
                </Picker>
            </View>
        </View>
    );

}

const style = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: "#F89424"
    },
    containerInput: {
        flex: 1    
    },
    inputSearch: {
        backgroundColor: "#F89424", 
        color: "white", 
        fontSize: 17, 
        paddingLeft: 20, 
        height: 50
    },
    picker: {
        width: 50, 
        right: 10, 
        position: 'absolute', 
        backgroundColor: 'transparent'
    }
});