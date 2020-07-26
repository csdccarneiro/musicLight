import React, { memo } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface ItemListProps {
    item: Object,
    backgroundSelected: String,
    widthItem: Number,
    onItemPress: Function,
    optionsVisible: Function,
    onSelect: Function,
    selected: Boolean
}

function ItemList({ item, backgroundSelected, colorText, widthItem,
        onItemPress, optionsVisible, onSelect, selected }: ItemListProps) {

    return (
        <TouchableOpacity onPress={() => onItemPress(item)} 
            style={{ ...styles.button, width: widthItem, backgroundColor: (selected ? backgroundSelected : null) }} 
            onLongPress={() => (onSelect ? onSelect(item) : null)}>
            <Image source={{ uri: item.cover }} style={styles.image} />
            <TouchableOpacity style={styles.containerText} 
                onLongPress={() => (optionsVisible ? optionsVisible(item) : null)}>
                <Text numberOfLines={1} style={{ ...styles.title, color: (!selected ? colorText : "white") }}>{item.fileName}</Text>
                <Text numberOfLines={1} style={{ ...styles.subtitle, color: (!selected ? colorText : "white") }}>{item.title}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    button: {
        borderRadius: 15,
        height: 210,
        marginBottom: 10,
        borderWidth: 0.3,
        borderColor: "#808080",
        overflow: "hidden"
    },
    containerText: {
        paddingBottom: 5, 
        paddingHorizontal: 10
    },
    title: {
        fontWeight: 'bold',
        fontFamily: "sans-serif-medium",
        fontSize: 16
    },
    subtitle: {
        fontSize: 10,
        fontFamily: "sans-serif-medium"
    },
    image: {
        flex: 1,
        height: "100%",
        resizeMode: "cover"
    }
}); 

export default memo(ItemList);