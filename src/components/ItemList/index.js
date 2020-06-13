import React, { memo } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface ItemListProps {
    id: String,
    title: String,
    subtitle: String,
    icon: String,
    colors: Object,
    widthItem: Number,
    onItemPress: Function,
    optionsVisible: Function,
    onSelect: Function,
    selected: Boolean
}

function ItemList({ id, title, subtitle, icon, colors, widthItem,
        onItemPress, optionsVisible, onSelect, selected }: ItemListProps) {
    
    return (
        <TouchableOpacity onPress={() => alert("Olá")} style={{ ...styles.button, width: widthItem, 
            backgroundColor: (selected ? colors.primary : null) }} onLongPress={() => onSelect(id)}>
            <Image source={{ uri: icon }} style={styles.image} />
            <TouchableOpacity style={styles.containerText} 
                onLongPress={() => optionsVisible({ visible: true, currentMusic: { title, icon } })}>
                <Text numberOfLines={1} style={{ ...styles.title, color: colors.text }}>{title}</Text>
                <Text numberOfLines={1} style={{ ...styles.subtitle, color: colors.text }}>{subtitle}</Text>
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