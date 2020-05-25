import React, { memo } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ItemListProps {
    id: String,
    title: String,
    subtitle: String,
    icon: String,
    colors: Object,
    onItemPress: Function,
    optionsVisible: Function,
    onSelect: Function,
    selected: Boolean
}

function ItemList({ id, title, subtitle, icon, colors, onItemPress, optionsVisible, onSelect, selected }: ItemListProps) {

    return (
        <TouchableHighlight underlayColor={'#B7B6B6'} style={{ ...styles.button, backgroundColor: selected ? colors.primary : null }} onPress={() => onItemPress()} onLongPress={() => onSelect(id)}>
            <View style={styles.conntainerButton}>
                <Image source={{ uri: icon }} style={styles.image} />
                <View style={styles.containerText}>
                    <Text numberOfLines={1} style={{ ...styles.title, color: colors.text }}>{title}</Text>
                    <Text numberOfLines={1} style={{ color: colors.text }}>{subtitle}</Text>
                </View>
                <Icon.Button name={"ellipsis-v"} underlayColor={'#B7B6B6'} size={25} onPress={() => optionsVisible(true)} backgroundColor={"transparent"} color={colors.text} iconStyle={styles.iconStyle} />
            </View>
        </TouchableHighlight>
    );

}

const styles = StyleSheet.create({
    button: {
        borderRadius: 15, 
        marginBottom: 5
    },
    conntainerButton: { 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 7,
        paddingRight: 10
    },
    containerText: {
        flex: 1,
        flexDirection: 'column', 
        padding: 12
    },
    title: {
        fontWeight: 'bold'
    },
    image: {
        width: 35, 
        height: 35
    },
    iconStyle: {
        marginRight: 0, 
        marginTop: -5, 
        marginBottom: -5
    }
}); 

export default memo(ItemList);