import React, { memo } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface ItemListProps {
    id: String,
    title: String,
    subtitle: String,
    icon: String,
    colorSelected: String,
    widthItem: Number,
    onItemPress: Function,
    optionsVisible: Function,
    onSelect: Function,
    selected: Map
}

function ItemList({ id, title, subtitle, icon, colorSelected, colorText, widthItem,
        onItemPress, optionsVisible, onSelect, selected }: ItemListProps) {
    
    const isSelected = selected.has(id);
    
    return (
        <TouchableOpacity onPress={() => { selected.size > 0 ? onSelect(id) : onItemPress(id) }} 
            style={{ ...styles.button, width: widthItem, backgroundColor: (isSelected ? colorSelected : null) }} 
            onLongPress={() => { if(selected.size <= 0) onSelect(id) }}>
            <Image source={{ uri: icon }} style={styles.image} />
            <TouchableOpacity style={styles.containerText} 
                onLongPress={() => { if(selected.size <= 0) optionsVisible({ title }) }}>
                <Text numberOfLines={1} style={{ ...styles.title, color: (!isSelected ? colorText : "white") }}>{title}</Text>
                <Text numberOfLines={1} style={{ ...styles.subtitle, color: (!isSelected ? colorText : "white") }}>{subtitle}</Text>
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