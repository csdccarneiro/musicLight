import React, { useState } from 'react';
import { View, Dimensions, Animated, Easing, DeviceEventEmitter, StyleSheet, Text, TouchableHighlight, Modal } from 'react-native';
import MusicFiles from 'react-native-get-music-files';
import { Avatar } from 'react-native-elements';
import { request, PERMISSIONS, check } from 'react-native-permissions';
import { ItemCard, ItemList, PlayerArea } from '../../../components';
import controller from '../../../controller';

export default function Music({ navigation }) {
    const [ listMusic, setListMusic ] = useState([]);
    const [selected, setSelected] = useState(new Map());
    const [ modalVisible, setModalVisible ] = useState(false);

    const { width, height } = Dimensions.get('window');  
    const widthItem = (width - 20) / 3;
    const scrollY = new Animated.Value(0);

    const MAX_HEIGHT = 100;
    const MIN_HEIGHT = 0;

    //EFEITO INTERPOLADO
    const headerHeight = scrollY.interpolate({
        easing: Easing.cubic,
        inputRange: [0, MAX_HEIGHT],
        outputRange: [MIN_HEIGHT, MAX_HEIGHT],
        extrapolate: 'clamp',
        useNativeDriver: true
    });

    //PEGANDO AS MÚSICAS
    function StoreMusic () {
        MusicFiles.getAll({
            id: true,
            artist: true,
            duration: true, 
            title: true,
            cover: true,
            fileName: true,
            path: true,
            batchNumber: 5, 
            delay: 0,
            minimumSongDuration: 1000, 
            fields: ['title','artwork','duration','artist','genre','lyrics','albumTitle']
        });
    }
    
    //VERIFICANDO SE O APLICATIVO TEM PERMISSÃO
    check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(response => {
        if(response == "granted")
            StoreMusic();
        else{
            request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(response => {
                if(response == "granted")  
                   StoreMusic();
            });
        }
    }); 
   
    //RECEBENDO MÚSICAS 
    DeviceEventEmitter.addListener('onBatchReceived', async (songs) => {
        setListMusic(songs.batch.map((item) => { item.select = false; return item; }));
        DeviceEventEmitter.removeAllListeners('onBatchReceived');
    });

    function selectedItem(id){
        const newSelected = new Map(selected);
        if (selected.get(id))
            newSelected.delete(id);
        else
            newSelected.set(id, !selected.get(id));
        setSelected(newSelected);
    }

    function selectedAllItens(){
        const newSelected = new Map(selected);
        if (selected.size != listMusic.length) {
            listMusic.map(item => {
                newSelected.set(item.id, selected.has(item.id) ? true : !selected.get(item.id));    
            });   
        }
        else
            newSelected.clear();    
        setSelected(newSelected);
    }
    

    function renderItens ({ item, index }) {
        if (1 == 4){ 
            return (
                <ItemList 
                    onPress={() => { if(selected.size > 0) {selectedItem(item.id)} else controller.musicController.initMusic(listMusic, item.id)  }} 
                    onOptionPress={() => setModalVisible(true)} 
                    title={item.fileName} 
                    subtitle={item.path} 
                    cover={item.cover}
                    onLongPressItem={() => selectedItem(item.id)}
                    isSelect={!!selected.get(item.id)}
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
                    onPress={() => { if(selected.size > 0) {selectedItem(item.id)} else controller.musicController.initMusic(listMusic, item.id)  }}
                    onLongPressItem={() => selectedItem(item.id)}
                    onOptionPress={() => setModalVisible(true)}
                    isSelect={!!selected.get(item.id)}  
                />
            );
        }   
    }

    return (
        <View style={{ flex: 1 }}>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={modalVisible}
                hardwareAccelerated={true}
                onRequestClose={() => setModalVisible(false)} >
                <View style={style.containerFullOptions}>
                    <View style={[style.containerOptions, { width: (width - 60) }]}>
                        <TouchableHighlight style={style.borderButtonOptions} underlayColor={"#C7C7C7"} onPress={() => alert("Testando")}><Text style={style.textOptions}>Adicionar a Playlist</Text></TouchableHighlight>
                        <TouchableHighlight style={style.borderButtonOptions} underlayColor={"#C7C7C7"} onPress={() => alert("Testando")}><Text style={style.textOptions}>Compartilhar</Text></TouchableHighlight>
                        <TouchableHighlight style={style.borderButtonOptions} underlayColor={"#C7C7C7"} onPress={() => alert("Testando")}><Text style={style.textOptions}>Excluir</Text></TouchableHighlight>
                        <TouchableHighlight underlayColor={"#C7C7C7"} onPress={() => alert("Testando")}><Text style={style.textOptions}>Detalhes</Text></TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <Animated.FlatList 
                data={listMusic}
                renderItem={renderItens}
                initialNumToRender={20}
                keyExtractor={item => item.id}
                windowSize={50}
                extraData={selected}
                numColumns={3}
                onScroll={Animated.event([{nativeEvent: {contentOffset: { y: scrollY }}}])}
            />
            {
                (selected.size > 0) ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: "#F89424" }}>
                    <Avatar icon={{ name: 'th', size: 30, color: 'black',  type: 'font-awesome' }} onPress={() => selectedAllItens()} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
                    <Avatar icon={{ name: 'trash', size: 30, color: 'black', type: 'font-awesome' }} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
                    <Text style={{ fontSize: 20, color: 'white' }}>{selected.size}</Text>
                    <Avatar icon={{ name: 'plus-circle', size: 30, color: 'black', type: 'font-awesome' }} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
                    <Avatar icon={{ name: 'share-alt', size: 30, color: 'black', type: 'font-awesome' }} overlayContainerStyle={{ backgroundColor: 'transparent' }} size={"medium"} />
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
  