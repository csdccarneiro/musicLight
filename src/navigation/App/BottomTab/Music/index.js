import React, { useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ItemList, Overlay } from '../../../../components';

function Music ({ app, dispatch }) {
    
    const [ selected, setSelected ] = useState(new Map());
    const [ modal, setModal ] = useState({ visible: false, title: undefined });
    const { colors } = useTheme();
    
    const onSelect = useCallback(musicId => {
        const newSelected = new Map(selected);
        if(Array.isArray(musicId)) 
            (newSelected.size == musicId.length ? newSelected.clear() : 
            musicId.map(music => newSelected.set(music.id, true)));
        else 
            (!newSelected.has(musicId) ? newSelected.set(musicId, true) : 
            newSelected.delete(musicId));
        setSelected(newSelected);
    }, [selected]);

    const onItemPress = useCallback(musicId => {
        dispatch({ type: "ADD_OR_INIT_MUSICS", payload: { localListMusic: app.localListMusic, musicId } });
    }, []);

    const onItemOptions = useCallback(item => {
        setModal({ visible: (item.title ? true : false), title: item.title });
    }, []);

    function renderItems({ item }) {

        return (
            <ItemList 
                id={item.id}
                title={item.fileName}
                subtitle={item.title}
                icon={item.cover}
                colorSelected={colors.primary}
                colorText={colors.text}
                widthItem={app.widthItems}
                onItemPress={onItemPress}
                optionsVisible={onItemOptions}
                onSelect={onSelect} 
                selected={selected}
            />
        );

    }

    function topOptionsItems() {

        return (
            <View style={{ ...styles.containerSelectOptions, display: (selected.size > 0 ? "flex" : "none"), 
                backgroundColor: colors.primary }}>
                <Icon.Button name={"th"} size={27} underlayColor={'#C7C7C7'} style={styles.iconItemSelected} 
                    backgroundColor={"transparent"} color={"white"} onPress={() => onSelect(app.localListMusic)} />
                <Icon.Button name={"trash"} size={27} color={"white"} style={styles.iconItemSelected} 
                    backgroundColor={"transparent"} />
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{selected.size}</Text>
                <Icon.Button name={"share-alt"} size={27} color={"white"} style={styles.iconItemSelected} 
                    backgroundColor={"transparent"} />
                <Icon.Button name={"plus"} size={27} color={"white"} style={styles.iconItemSelected} 
                    backgroundColor={"transparent"} />
            </View>
        );

    }

    return (
        <View>
            <Overlay isVisible={modal.visible} animation={'fade'} style={styles.modal} onClose={onItemOptions}>
                <Text style={styles.titleModal}>{modal.title}</Text>
                <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => alert('Olá')}><Text style={styles.textModalOptions}>Adicionar a playlist</Text></TouchableHighlight>
                <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => alert('Olá')}><Text style={styles.textModalOptions}>Compartilhar</Text></TouchableHighlight>
                <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => alert('Olá')}><Text style={styles.textModalOptions}>Excluir</Text></TouchableHighlight>
                <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => alert('Olá')}><Text style={styles.textModalOptions}>Detalhes</Text></TouchableHighlight>
            </Overlay>
            <FlatList
                data={app.localListMusic}
                initialNumToRender={5}
                columnWrapperStyle={styles.listContent}
                ListHeaderComponent={topOptionsItems}
                stickyHeaderIndices={[0]}
                ListEmptyComponent={<ActivityIndicator size={"large"} color={colors.primary} />}
                numColumns={2}
                extraData={{ selected, colors }}
                renderItem={renderItems}
                removeClippedSubviews={true}
                keyExtractor={item => item.path}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    modal: {
        marginHorizontal: 30, 
        backgroundColor: "white"
    },
    titleModal: {
        fontSize: 17, 
        textAlign: "center", 
        paddingHorizontal: 15, 
        fontFamily: "sans-serif-medium",
        paddingVertical: 15, 
        fontWeight: "bold"
    },
    listContent: {
        justifyContent: "space-between", 
        paddingTop: 10,
        paddingHorizontal: 25
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
    },
    textModalOptions: {
        padding: 15, 
        fontSize: 15
    }
});

export default connect(state => ({ app: state.App }))(Music);