import React, { useState, useEffect } from 'react';
import { View, Dimensions, Alert, Animated, Easing, BackHandler, DeviceEventEmitter, RefreshControl, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '../../store';
import { ItemCard, ItemList, PlayerArea, ModalOptions, BottomOptions, Toolbar } from '../../components';

export default function Music() {

    const music = useSelector(state => state.page_music);
    const dispatch = useDispatch();
    const [ itemOptions, setItemOptions ] = useState({ item: {}, path: new Map(), modalVisible: false, mode: null });
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
            dispatch({ type: "LOADED_LIST_MUSIC", refreshList: false, listMusic: songs.batch, 
                searchMusic: songs.batch, player: await store.getState().player });
            DeviceEventEmitter.removeAllListeners('onBatchReceived');
        });
    }, [music.refreshList]);

    useEffect(() => {
        BackHandler.removeEventListener('hardwareBackPress');
        BackHandler.addEventListener('hardwareBackPress', () => {
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

    function selectedItensClear (selected) {
        const newSelected = new Map(selected);
        newSelected.clear(); 
        return new Map(); 
    }

    //ITENS EM LISTA E CARDS
    function renderItens ({ item, index }) {
        if (music.modeList.activeCard == false) { 
            return (
                <ItemList 
                    title={item.fileName} 
                    subtitle={item.path} 
                    cover={item.cover}
                    onPress={() => { if(itemSelected.size > 0) { setItemSelected(selectedItem(itemSelected, item.path)) } else dispatch({ type: "ADD_OR_MODIFY_TRACK", musicId: item.id }) }} 
                    onOptionPress={() => setItemOptions({ item: item, path: itemOptions.path.set(item.path, true), modalVisible: true, mode: null })} 
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
                    onOptionPress={() => setItemOptions({ item: item, path: itemOptions.path.set(item.path, true), modalVisible: true, mode: null })}
                    isSelect={!!itemSelected.get(item.path)}
                    listSelection={itemSelected}  
                />
            );
        }   
    }

    function deleteItem(listFiles, listMusic, currentTrackId){
        var path = ""; 
        listFiles.forEach((item, index) => path = index);
        Alert.alert(
            'Excluir permanentemente ?',
            (listFiles.size > 1 ? listFiles.size + ' Músicas' : path),
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'Ok', onPress: () => { dispatch({ type: "DELETE_FILE", listSeleted: listFiles, listMusic: listMusic, currentTrackId: currentTrackId }); setItemSelected(new Map()); } }
            ], { cancelable: true }
        );
    }
    
    return (
        <View style={{ flex: 1 }}>
            <Toolbar 
                openModeListing={() => setItemOptions({ ...itemOptions, modalVisible: true,  mode: 'listing' })}
                openModeRate={() => setItemOptions({ ...itemOptions, modalVisible: true, mode: 'rate' })}
                searchMusic={music.searchMusic}
            />
            <ModalOptions 
                options={itemOptions}    
                widthModal={(width - 60)}
                itensOptions={music.modeList}
                onRequestClose={() => setItemOptions({ ...itemOptions, path: new Map(), modalVisible: false, mode: null })}
                onShare={() => dispatch({ type: "SHARE_FILE", listSeleted: itemOptions.path })}
                onDelete={async () => deleteItem(itemOptions.path, music.listMusic, await store.getState().player.id)}
                onDetails={() => setItemOptions({ ...itemOptions, mode: 'details' })} 
            />
            <Animated.FlatList 
                data={music.listMusic}
                renderItem={renderItens}
                initialNumToRender={20}
                keyExtractor={item => item.path}
                windowSize={50}
                extraData={itemSelected}
                key={music.modeList.activeCard ? 3 : 1}
                numColumns={music.modeList.activeCard ? 3 : 1}
                refreshControl={<RefreshControl refreshing={music.refreshList} onRefresh={() => dispatch({ type: "REFRESH_LIST", refreshList: true })} />}
                ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: 16 }}>Carregando...</Text>}
                onScroll={Animated.event([{nativeEvent: {contentOffset: { y: scrollY }}}])}
            />
            <BottomOptions
                onDeleteAll={async () => deleteItem(itemSelected, music.listMusic, await store.getState().player.id)} 
                itemSelected={itemSelected}
                onShareAll={() => dispatch({ type: "SHARE_FILE", listSeleted: itemSelected })}
            />
            <PlayerArea header={headerHeight} />
        </View>
    );
}

