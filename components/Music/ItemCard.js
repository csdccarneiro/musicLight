import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

export default function ItemCard(props){
    return(
        <View style={[style.itemContainer, { width: props.width }]}>
            <TouchableOpacity onPress={props.onPress} onLongPress={() => alert("Testando")}>
                <FastImage
                    style={{ width: props.width, height: 120  }}
                    source={(String(props.cover).indexOf('.jpg') >= 0) ? 
                        {
                            uri: props.cover, 
                            headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.high,
                            cache: "immutable"
                        }: require('../../images/musical-note.png')}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </TouchableOpacity>
            <View style={style.itemContainerText}>
                <View style={style.itemText}>
                    <Text style={style.itemTitle} numberOfLines={1}>{props.title}</Text>
                    <Text style={style.itemSubtitle} numberOfLines={1}>{props.subtitle}</Text>
                </View>
                <View style={style.itemIcon}> 
                    <TouchableOpacity onPress={props.onOptionPress}>
                        <FastImage
                            style={{ width: 30, height: 20, margin: 3 }}
                            source={require('../../images/ellipsis.png')}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    itemContainer: {
        elevation: 5, 
        borderRadius: 5, 
        backgroundColor: "#F2F2F2",  
        borderWidth: 0.2, 
        margin: 3,
        borderColor: 'black', 
        alignItems: 'center',
        overflow: 'hidden',
        paddingBottom: 3
    },
    itemContainerText: {
        flexDirection: 'row' 
    },
    itemTitle: {
        fontWeight: 'bold', 
        fontSize: 15
    },
    itemSubtitle: {
        fontSize: 11
    },
    itemText: {
        flexDirection: 'column', 
        flex: 1,
        paddingLeft: 5
    },
    itemIcon: {
        margin: -8, 
        justifyContent: 'center'
    }
});

