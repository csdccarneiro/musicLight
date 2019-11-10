import React, { useState } from 'react';
import { View, Dimensions, FlatList, DeviceEventEmitter, Text, StyleSheet } from 'react-native';
import MusicFiles from 'react-native-get-music-files';
import { Avatar, Slider } from 'react-native-elements';
import { request, PERMISSIONS, check } from 'react-native-permissions';
import { ItemCard, ItemList } from '../../../components';

export default function Music({ navigation }) {
    const { width, height } = Dimensions.get('window');  
    const imageheight = 30;
    const widthItem = (Math.ceil(width) - imageheight) / (imageheight / 10);
    const [ listMusic, setListMusic ] = useState([]);

    StoreMusic = () => {
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

    //RENDERIZANDO ITEM
    renderitem = ({ item, index }) => {
        if (1 == 4) 
          return (<ItemList width={widthItem} height={imageheight} title={item.fileName} subtitle={item.path} cover={item.cover} />);
        else        
          return (<ItemCard width={widthItem} height={imageheight} title={item.fileName} subtitle={item.path} cover={item.cover} />);
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList 
              data={listMusic}
              renderItem={renderitem}
              keyExtractor={item => item.id}
              numColumns={3}
              contentContainerStyle={{ padding: 5 }}
              windowSize={50}
            />
            <View style={style.playerContainer}>
                <View style={style.playerContainerIcons}>
                    <Avatar icon={{ name: 'rotate-right', type: 'font-awesome', color: '#C7C7C7', size: 25 }} overlayContainerStyle={style.coverStyle} size={"medium"} />
                    <Avatar icon={{ name: 'backward', type: 'font-awesome', color: '#C7C7C7', size: 30 }} overlayContainerStyle={style.coverStyle} size={"medium"} />
                    <Avatar icon={{ name: 'pause', type: 'font-awesome', color: '#C7C7C7', size: 35 }} overlayContainerStyle={style.coverStyle}  size={"medium"} />
                    <Avatar icon={{ name: 'forward', type: 'font-awesome', color: '#C7C7C7', size: 30 }} overlayContainerStyle={style.coverStyle}  size={"medium"} />
                    <Avatar icon={{ name: 'random', type: 'font-awesome', color: '#C7C7C7', size: 25 }} overlayContainerStyle={style.coverStyle} size={"medium"} />
                </View>
                <View style={[style.playerContainerIcons, { marginTop: -7, paddingBottom: 2 }]}>
                    <View style={style.playerContainerTimer}>
                        <Text style={style.playerText} >00:00</Text>
                        <Slider style={style.playerSlider} />
                        <Text style={style.playerText} >00:00</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    playerContainer: {
        flexDirection: 'column', 
        backgroundColor: 'black'
    },
    playerContainerIcons: {
        flexDirection: 'row', 
        justifyContent: 'center',
    },
    playerContainerTimer: {
        width: '85%', 
        flexDirection: 'row'
    },
    playerText: {
        color: 'white',
        textAlign: 'center'
    },
    playerSlider: {
        flex: 1, 
        marginTop: -10, 
        marginBottom: -7, 
        marginLeft: 5, 
        marginRight: 5
    },
    coverStyle: {
        backgroundColor: 'transparent'
    }
});