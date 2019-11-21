import React, { useState } from 'react';
import { View, Dimensions, Animated, Easing, DeviceEventEmitter, StyleSheet, Text, TouchableHighlight, Modal } from 'react-native';
import MusicFiles from 'react-native-get-music-files';
import { request, PERMISSIONS, check } from 'react-native-permissions';
import { ItemCard, ItemList, PlayerArea } from '../../../components';
import controller from '../../../controller';

export default function Music({ navigation }) {
    const { width, height } = Dimensions.get('window');  
    const widthItem = (width - 20) / 3;
    const [ listMusic, setListMusic ] = useState([]);
    const [ modalVisible, setModalVisible ] = useState(false);
    const scrollY = new Animated.Value(0);

    const MAX_HEIGHT = 85;
    const MIN_HEIGHT = 0;
    
    //EFEITO INTERPOLADO
    const headerHeight = scrollY.interpolate({
        easing: Easing.cubic,
        inputRange: [40, MAX_HEIGHT],
        outputRange: [MIN_HEIGHT, MAX_HEIGHT],
        extrapolate: 'clamp',
        useNativeDrive: true
    });

    //PEGANDO AS MÚSICAS
    function StoreMusic() {
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
        setListMusic(songs.batch);
        DeviceEventEmitter.removeAllListeners('onBatchReceived');
    });

    function renderItens({ item, index }){
        if (1 == 4) 
            return (<ItemList onPress={() => controller.musicController.initMusic(listMusic, item.id)} onOptionPress={() => setModalVisible(true)} title={item.fileName} subtitle={item.path} cover={item.cover} />);
        else        
            return (<ItemCard width={widthItem} title={item.fileName} onOptionPress={() => setModalVisible(true)} onPress={() => controller.musicController.initMusic(listMusic, item.id)} subtitle={item.path} cover={item.cover} />);
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
                keyExtractor={item => item.path}
                windowSize={50}
                numColumns={3}
                onScroll={Animated.event([{nativeEvent: {contentOffset: { y: scrollY }}}])}
            />
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
