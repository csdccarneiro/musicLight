import React, { useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ItemList } from '../../../../components';

function Music ({ app, dispatch, navigation }) {

    const [ selected, setSelected ] = useState(new Map());
    const { colors } = useTheme();

    const getMultiItemsSelected = useCallback(items => {
        return app.localListMusic.filter(music => (items.has(music.id) ? music : undefined));
    },[app.localListMusic]);

    const onSelect = useCallback(items => {
        const newSelected = new Map(selected);
        if(Array.isArray(items)) 
            (newSelected.size == items.length ? newSelected.clear() : items.map(music => newSelected.set(music.id, true)));
        else 
            (!newSelected.has(items.id) ? newSelected.set(items.id, true) : newSelected.delete(items.id));
        setSelected(newSelected);
    }, [selected]);
    
    const onItemPress = useCallback(item => {
        if(selected.size > 0)
            onSelect(item);
        else 
            dispatch({ type: "TRACK_SELECT", payload: { musicId: item.id } });
    }, [selected]);

    const onItemOptions = useCallback(item => {
        if(selected.size <= 0)
            navigation.navigate("Modal", { screen: 'Options', params: { app, item } });
    }, [app.localListMusic, selected]);

    function renderItems({ item }) {

        return (
            <ItemList 
                item={item}
                backgroundSelected={colors.primary}
                colorText={colors.text}
                widthItem={app.widthItems}
                onItemPress={onItemPress}
                optionsVisible={onItemOptions}
                onSelect={onSelect} 
                selected={selected.has(item.id)}
            />
        );

    }

    function topOptionsItems() {
        return (
            <View style={{ ...styles.containerSelectOptions, display: (selected.size > 0 ? "flex" : "none"), 
                backgroundColor: colors.primary }}>
                <Icon.Button name={"view-comfy"} size={30} underlayColor={'#C7C7C7'} style={styles.iconItemSelected} 
                    backgroundColor={"transparent"} color={"white"} onPress={() => onSelect(app.localListMusic)} />
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{selected.size}</Text>
                <Icon.Button onPress={() => dispatch({ type: "SHARE_FILE", payload: { items: getMultiItemsSelected(selected) } })}
                    name={"share"} size={30} color={"white"} style={styles.iconItemSelected} backgroundColor={"transparent"}
                    underlayColor={'#C7C7C7'} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={app.localListMusic}
                initialNumToRender={5}
                columnWrapperStyle={styles.listContent}
                ListHeaderComponent={topOptionsItems}
                stickyHeaderIndices={[0]}
                ListEmptyComponent={<ActivityIndicator size={"large"} color={colors.primary} />}
                numColumns={2}
                extraData={selected}
                renderItem={renderItems}
                removeClippedSubviews={true}
                keyExtractor={item => item.id}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerButtonBottom: {
        position: "absolute", 
        zIndex: 99, 
        bottom: 10, 
        right: 10
    },
    buttonAdd: {
        padding: 15, 
        marginRight: -10
    },
    listContent: {
        justifyContent: "space-between", 
        paddingTop: 10,
        paddingHorizontal: 25
    },
    textEmpty: {
        textAlign: "center", 
        paddingTop: 10
    },
    containerSelectOptions: {
        width: '100%',  
        paddingVertical: 5,
        flexDirection: "row", 
        alignItems: 'center', 
        justifyContent: "space-around"
    },
    iconItemSelected: {
        backgroundColor: "transparent", 
        marginRight: -9
    }
});

export default connect(state => ({ app: state.App }))(Music);
