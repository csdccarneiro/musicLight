import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Picker } from 'react-native';
import { Avatar } from 'react-native-elements';

export default function ItemCard(props){
    return(
        <View style={[style.itemContainer, { width: props.width }]}>
            <TouchableOpacity style={{ alignItems: 'center' }}>
                { (String(props.cover).indexOf('.jpg') >= 0) ? <Image style={[style.itemImage, { height: 120 - (props.height - 10) }]} source={{ uri: props.cover }} />
                : <Avatar icon={{ name: 'music', type: 'font-awesome', color: 'red', size: 120 - (props.height - 10) }} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={120 - (props.height - 10)} />}
            </TouchableOpacity>
            <View style={style.itemContainerText}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Text numberOfLines={1} style={style.itemTitle}>{props.title} </Text>
                    <Text numberOfLines={1} style={style.itemSubtitle}>{props.subtitle}</Text>
                </View>
                <View style={style.itemPicker}>
                    <Picker
                        mode={'dropdown'}
                        style={{ margin: -10 }}
                        onValueChange={(itemValue, itemIndex) => alert(itemValue)}>
                        <Picker.Item label="Adicionar Lista de Reprodução" value="1" />
                        <Picker.Item label="Compartilhar" value="2" />
                        <Picker.Item label="Excluir" value="3" />
                    </Picker>
                </View>
            </View>
        </View>  
    );
}

const style = StyleSheet.create({
    itemContainer: {
        flexDirection: 'column', 
        borderWidth: 0.2, 
        borderColor: 'black', 
        overflow: 'hidden',
        borderRadius: 5,
        elevation: 3,
        backgroundColor: "#F2F2F2",
        margin: 3
    },
    itemImage: {
        width: '100%',
        resizeMode: 'cover'
    },
    itemContainerText: {
        paddingLeft: 5, 
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row' 
    },
    itemTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'justify'
    },
    itemSubtitle: {
        fontSize: 11,
        textAlign: 'justify'
    },
    itemPicker: {
        flex: 0.3, 
        flexDirection: 'column', 
        justifyContent: 'center'
    }
});
