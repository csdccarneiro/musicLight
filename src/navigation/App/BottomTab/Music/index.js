import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { ItemList, Overlay } from '../../../../components';

function Music ({ app }) {

    const [ selected, setSelected ] = useState(new Map());
    const [ modal, setModal ] = useState({ visible: false, currentMusic: {} });
    const { colors } = useTheme();
    
    const onSelect = React.useCallback(id => {
        const newSelected = new Map(selected);
        newSelected.set(id, !selected.get(id));
        setSelected(newSelected);
    }, [selected]);

    const onItemPress = React.useCallback(() => alert('Olá'), []);

    function renderItems({ item }) {
        
        return (
            <ItemList 
                id={item.id}
                title={item.fileName}
                subtitle={item.title}
                icon={item.cover ? item.cover : app.icon_music}
                colors={colors}
                widthItem={app.widthItems}
                onItemPress={onItemPress}
                optionsVisible={setModal}
                onSelect={onSelect} 
                selected={!!selected.get(item.id)}
            />
        );

    }

    return (
        <View>
            <Overlay isVisible={modal.visible} animation={'fade'} style={{ backgroundColor: colors.background, marginHorizontal: 30 }} onClose={setModal}>
                <View style={styles.containerModalDescription}> 
                    <Image source={{ uri: modal.currentMusic.icon }} style={styles.imageDescriptionModal} />
                    <Text style={{ ...styles.textDescriptionModal, color: colors.text }}>{modal.currentMusic.title}</Text>
                </View>
                <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => alert('Olá')}><Text style={{ ...styles.textModalOptions, color: colors.text }}>Adicionar a playlist</Text></TouchableHighlight>
                <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => alert('Olá')}><Text style={{ ...styles.textModalOptions, color: colors.text }}>Compartilhar</Text></TouchableHighlight>
                <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => alert('Olá')}><Text style={{ ...styles.textModalOptions, color: colors.text }}>Excluir</Text></TouchableHighlight>
                <TouchableHighlight underlayColor={'#C7C7C7'} onPress={() => alert('Olá')}><Text style={{ ...styles.textModalOptions, color: colors.text }}>Detalhes</Text></TouchableHighlight>
            </Overlay>
            <FlatList
                data={app.localListMusic}
                initialNumToRender={10}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                ListEmptyComponent={<ActivityIndicator size={"large"} color={colors.primary} />}
                style={styles.list}
                numColumns={2}
                extraData={{ selected, colors }}
                renderItem={renderItems}
                removeClippedSubviews={true}
                keyExtractor={item => item.id}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    list: {
        paddingLeft: 25,
        paddingRight: 25
    },
    containerModalDescription: {
        flexDirection: 'row',
        padding: 15, 
        alignItems: 'center'
    },
    imageDescriptionModal: {
        width: 60, 
        height: 60
    },
    textDescriptionModal: {
        flex: 1, 
        marginLeft: 10, 
        fontWeight: 'bold', 
        fontSize: 16
    },
    textModalOptions: {
        padding: 15, 
        fontSize: 15
    }
});

export default connect(state => ({ app: state.App }))(Music);