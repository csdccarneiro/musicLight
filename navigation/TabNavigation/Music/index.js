import React, { useState, useEffect } from 'react';
import { View, Dimensions, Animated, Easing, DeviceEventEmitter, StyleSheet, Text, TouchableHighlight, Modal, RefreshControl } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ItemCard, ItemList, PlayerArea } from '../../../components';
import controller from '../../../controller';

export default function Music({ navigation }) {

    const [ listMusic, setListMusic ] = useState([]);
    const [selected, setSelected] = useState(new Map());
    const [ itemOptions, setItemOptions ] = useState({ path: new Map(), modalVisible: false });
    const [ refreshList, setRefreshList ] = useState(false);

    const { width, height } = Dimensions.get('window');  
    const widthItem = (width - 20) / 3;
    const scrollY = new Animated.Value(0);

    //EFEITO INTERPOLADO
    const headerHeight = scrollY.interpolate({
        easing: Easing.cubic,
        inputRange: [0, 100],
        outputRange: [0, 100],
        extrapolate: 'clamp',
        useNativeDriver: true
    });

    //CARREGAMENTO E RECARREGAMENTO
    useEffect(() => {
        controller.musicController.verifyPermission();
        //RECEBENDO MÚSICAS 
        DeviceEventEmitter.addListener('onBatchReceived', async (songs) => {
            setListMusic(songs.batch.map((item) => { item.select = false; return item; }));
            setRefreshList(false);
            DeviceEventEmitter.removeAllListeners('onBatchReceived');
        });
    }, [refreshList]);

    //SELECIONANDO ITENS
    function selectedItem(path){
        const newSelected = new Map(selected);
        if (selected.get(path))
            newSelected.delete(path);
        else
            newSelected.set(path, !selected.get(path));
        setSelected(newSelected);
    }

    //SELECIONANDO TODOS OS ITENS
    function selectedAllItens(){
        const newSelected = new Map(selected);
        if (selected.size != listMusic.length) {
            listMusic.map(item => {
                newSelected.set(item.path, selected.has(item.path) ? true : !selected.get(item.path));    
            });   
        }
        else
            newSelected.clear();    
        setSelected(newSelected);
    }
    
    //ITENS EM LISTA E CARDS
    function renderItens ({ item, index }) {
        if (1 == 4){ 
            return (
                <ItemList 
                    title={item.fileName} 
                    subtitle={item.path} 
                    cover={item.cover}
                    onPress={() => { if(selected.size > 0) {selectedItem(item.path)} else controller.musicController.initMusic(listMusic, item.id)  }} 
                    onOptionPress={() => setItemOptions({ path: itemOptions.path.set(item.path, true), modalVisible: true })} 
                    onLongPressItem={() => selectedItem(item.path)}
                    isSelect={!!selected.get(item.path)}
                    listSelection={selected}
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
                    onPress={() => { if(selected.size > 0) {selectedItem(item.path)} else controller.musicController.initMusic(listMusic, item.id)  }}
                    onLongPressItem={() => selectedItem(item.path)}
                    onOptionPress={() => setItemOptions({ path: itemOptions.path.set(item.path, true), modalVisible: true })}
                    isSelect={!!selected.get(item.path)}
                    listSelection={selected}  
                />
            );
        }   
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
                        <TouchableHighlight style={style.borderButtonOptions} underlayColor={"#C7C7C7"} onPress={() => controller.musicController.shareFile(itemOptions.path)}><Text style={style.textOptions}>Compartilhar</Text></TouchableHighlight>
                        <TouchableHighlight style={style.borderButtonOptions} underlayColor={"#C7C7C7"} onPress={() => alert("Testando")}><Text style={style.textOptions}>Excluir</Text></TouchableHighlight>
                        <TouchableHighlight underlayColor={"#C7C7C7"} onPress={() => alert("Testando")}><Text style={style.textOptions}>Detalhes</Text></TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <Animated.FlatList 
                data={listMusic}
                renderItem={renderItens}
                initialNumToRender={20}
                keyExtractor={item => item.path}
                windowSize={50}
                extraData={selected}
                numColumns={3}
                refreshControl={<RefreshControl refreshing={refreshList} onRefresh={() => setRefreshList(true)} />}
                onScroll={Animated.event([{nativeEvent: {contentOffset: { y: scrollY }}}])}
            />
            {
                (selected.size > 0) ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: "#F89424" }}>
                    <Avatar icon={{ name: 'th', size: 30, color: 'black',  type: 'font-awesome' }} onPress={() => selectedAllItens()} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
                    <Avatar icon={{ name: 'trash', size: 30, color: 'black', type: 'font-awesome' }} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
                    <Text style={{ fontSize: 20, color: 'white' }}>{selected.size}</Text>
                    <Avatar icon={{ name: 'plus-circle', size: 30, color: 'black', type: 'font-awesome' }} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
                    <Avatar icon={{ name: 'share-alt', size: 30, color: 'black', type: 'font-awesome' }} onPress={() => controller.musicController.shareFile(selected)} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
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
  