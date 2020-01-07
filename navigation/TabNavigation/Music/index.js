import React, { useState, useEffect } from 'react';
import { View, Dimensions, Alert, Animated, Easing, BackHandler, DeviceEventEmitter, StyleSheet, Text, TouchableHighlight, Modal, RefreshControl } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { store, persistor } from '../../../store';
import { ItemCard, ItemList, PlayerArea } from '../../../components';

export default function Music({ navigation }) {

    const dispatch = useDispatch();
    const music = useSelector(state => state.page_music);
    const [ itemOptions, setItemOptions ] = useState({ path: new Map(), modalVisible: false });
    const [ itemSelected, setItemSelected ] = useState(new Map());
    
    const { width, height } = Dimensions.get('window');  
    const widthItem = (width - 20) / 3;
    const scrollY = new Animated.Value(0);

    //EFEITO INTERPOLADO
    const headerHeight = scrollY.interpolate({
        easing: Easing.cubic,
        inputRange: [(music.listMusic.length > 15 ? 0 : 100), 100],
        outputRange: [(music.listMusic.length > 15 ? 0 : 110), 110],
        extrapolate: 'clamp',
        useNativeDriver: true
    });

    //CARREGAMENTO E RECARREGAMENTO
    useEffect(() => {
        dispatch({ type: "VERIFY_PERMISSION" });
        //RECEBENDO MÚSICAS 
        DeviceEventEmitter.addListener('onBatchReceived', async (songs) => {
            const list = songs.batch.map((item) => { item.select = false; return item; });
            dispatch({ type: "LOADED_LIST_MUSIC", refreshList: false, listMusic: list, 
                searchMusic: list, currentTrackId: await store.getState().player.id, 
                position: await store.getState().player.position 
            });
            DeviceEventEmitter.removeAllListeners('onBatchReceived');
        });
    }, [music.refreshList]);

    useEffect(() => {
        BackHandler.removeEventListener('hardwareBackPress');
        BackHandler.addEventListener('hardwareBackPress', () => {
            if(navigation.isFocused()) {
                if (itemSelected.size > 0) {
                    setItemSelected(selectedItensClear(itemSelected));
                    return true;
                }
                else if (music.listMusic.length != music.searchMusic.length) {
                    dispatch({ type: "LOADED_LIST_MUSIC", searchMusic: music.searchMusic, listMusic: music.listMusic });
                    return true;
                }
                else 
                    BackHandler.exitApp();
            }
        });
    }, [itemSelected, music.listMusic]);

    function selectedItem (selected, path) {
        const newSelected = new Map(selected);
        if (selected.get(path))
            newSelected.delete(path);
        else
            newSelected.set(path, !selected.get(path));
        return newSelected;    
    }

    function selectedAllItens (listMusic, selected) {
        const newSelected = new Map(selected);
        if (selected.size != listMusic.length) 
            listMusic.map(item => newSelected.set(item.path, selected.has(item.path) ? true : !selected.get(item.path)));   
        return newSelected;      
    }

    function selectedItensClear (selected) {
        const newSelected = new Map(selected);
        newSelected.clear(); 
        return new Map(); 
    }

    //ITENS EM LISTA E CARDS
    function renderItens ({ item, index }) {
        if (1 == 1) { 
            return (
                <ItemList 
                    title={item.fileName} 
                    subtitle={item.path} 
                    cover={item.cover}
                    onPress={() => { if(itemSelected.size > 0) { setItemSelected(selectedItem(itemSelected, item.path)) } else dispatch({ type: "ADD_OR_MODIFY_TRACK", musicId: item.id }) }} 
                    onOptionPress={() => setItemOptions({ path: itemOptions.path.set(item.path, true), modalVisible: true })} 
                    onLongPressItem={() => setItemSelected(selectedItem(itemSelected, item.path))}
                    isSelect={!!itemSelected.get(item.path)}
                    listSelection={itemSelected} 
                />
            );
        }    
        else {
            return (
                <ItemCard 
                    title={item.fileName} 
                    subtitle={item.path} 
                    cover={item.cover} 
                    width={widthItem}
                    onPress={() => { if(itemSelected.size > 0) { setItemSelected(selectedItem(itemSelected, item.path)) } else dispatch({ type: "ADD_OR_MODIFY_TRACK", musicId: item.id }) }}
                    onLongPressItem={() => setItemSelected(selectedItem(itemSelected, item.path))}
                    onOptionPress={() => setItemOptions({ path: itemOptions.path.set(item.path, true), modalVisible: true })}
                    isSelect={!!itemSelected.get(item.path)}
                    listSelection={itemSelected}  
                />
            );
        }   
    }

    function deleteItem(listFiles, listMusic, currentTrackId){
        Alert.alert(
            (listFiles.size > 1 ? 'Excluir Arquivos' : 'Excluir Arquivo'),
            (listFiles.size > 1 ? listFiles.size + ' Arquivos para excluir' : listFiles.size + ' Arquivo para excluir'),
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { 
                text: 'Ok', 
                onPress: () => { 
                    dispatch({ type: "DELETE_FILE", listSeleted: listFiles, listMusic: listMusic, currentTrackId: currentTrackId }); 
                    setItemSelected(new Map()); 
                }
              }
            ], { cancelable: true }
        );
    }
    
    return (
        <View style={{ flex: 1 }}>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={itemOptions.modalVisible}
                hardwareAccelerated={true}
                onRequestClose={() => setItemOptions({ path: new Map(), modalVisible: false })} >
                <View style={style.containerFullOptions}>
                    <View style={[style.containerOptions, { width: (width - 60) }]}> 
                        <TouchableHighlight style={style.borderButtonOptions} underlayColor={"#C7C7C7"} onPress={() => alert("Testando")}><Text style={style.textOptions}>Adicionar a Playlist</Text></TouchableHighlight>
                        <TouchableHighlight style={style.borderButtonOptions} underlayColor={"#C7C7C7"} onPress={() => dispatch({ type: "SHARE_FILE", listSeleted: itemOptions.path })}><Text style={style.textOptions}>Compartilhar</Text></TouchableHighlight>
                        <TouchableHighlight style={style.borderButtonOptions} underlayColor={"#C7C7C7"} onPress={async () => deleteItem(itemOptions.path, music.listMusic, await store.getState().player.id)}><Text style={style.textOptions}>Excluir</Text></TouchableHighlight>
                        <TouchableHighlight underlayColor={"#C7C7C7"} onPress={() => alert("Testando")}><Text style={style.textOptions}>Detalhes</Text></TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <Animated.FlatList 
                data={music.listMusic}
                renderItem={renderItens}
                initialNumToRender={20}
                keyExtractor={item => item.path}
                windowSize={50}
                extraData={itemSelected}
                numColumns={1}
                refreshControl={<RefreshControl refreshing={music.refreshList} onRefresh={() => dispatch({ type: "REFRESH_LIST", refreshList: true })} />}
                onScroll={Animated.event([{nativeEvent: {contentOffset: { y: scrollY }}}])}
            />
            {
                (itemSelected.size > 0) ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: "#F89424" }}>
                    <Avatar icon={{ name: 'th', size: 30, color: 'black',  type: 'font-awesome' }} onPress={() => setItemSelected(selectedAllItens(music.listMusic, itemSelected)) } overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
                    <Avatar icon={{ name: 'trash', size: 30, color: 'black', type: 'font-awesome' }} onPress={async () => deleteItem(itemSelected, music.listMusic, await store.getState().player.id)} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
                    <Text style={{ fontSize: 20, color: 'white' }}>{itemSelected.size}</Text>
                    <Avatar icon={{ name: 'plus-circle', size: 30, color: 'black', type: 'font-awesome' }} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
                    <Avatar icon={{ name: 'share-alt', size: 30, color: 'black', type: 'font-awesome' }} onPress={() => dispatch({ type: "SHARE_FILE", listSeleted: itemSelected })} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
                </View> : 
                <></>
            }
            <PlayerArea header={headerHeight} />
        </View>
    );
}

const style = StyleSheet.create({
    containerFullOptions: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    containerOptions: { 
        flexDirection: "column",
        overflow: 'hidden', 
        backgroundColor: '#D8D8D8',
        borderRadius: 10,
    },
    borderButtonOptions:{
        borderBottomWidth: 0.2
    },
    textOptions: { 
        fontSize: 17, 
        marginLeft: 15, 
        padding: 10
    }
});
  