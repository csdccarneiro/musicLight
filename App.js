import React from 'react';
import { View } from 'react-native';
import AppContainer from './navigation';
import Service from './service';

export default function App(){
  return (
    <View style={{ flex: 1 }}>
        <AppContainer />
    </View>
  );
}



/*

import React, { PureComponent } from 'react';
import { View, Dimensions, Animated, Easing, DeviceEventEmitter, StyleSheet, Text, TouchableHighlight, Modal, FlatList } from 'react-native';
import MusicFiles from 'react-native-get-music-files';
import { request, PERMISSIONS, check } from 'react-native-permissions';
import { ItemCard, ItemList, PlayerArea } from './components';
import controller from './controller';
import AppContainer from './navigation';
import Service from './service';


export default class App extends PureComponent{
    constructor(props){ super(props); }

    state = {
        listMusic: []
    };

    componentDidMount(){
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

        //RECEBENDO MÚSICAS 
        DeviceEventEmitter.addListener('onBatchReceived', async (songs) => {
            this.setState({ listMusic: songs.batch.map((item) => { item.select = false; return item; }) });
            DeviceEventEmitter.removeAllListeners('onBatchReceived');
        });

    }

    selectItem = (items) => {
      const selectedList = this.state.listMusic.map((item) => {
          if(items.id == item.id)
              item.select = true;
          return item;
      });
      this.setState({ listMusic: selectedList });
  }

  renderItens = ({ item, index }) => {
      if (1 == 4){ 
          return (
              <ItemList 
                  onPress={() => controller.musicController.initMusic(listMusic, item.id)} 
                  onOptionPress={() => setModalVisible(true)} 
                  title={item.fileName} 
                  subtitle={item.path} 
                  cover={item.cover}
              />
          );
      }    
      else {
          return (
              <ItemCard 
                  title={item.fileName} 
                  subtitle={item.path} 
                  cover={item.cover} 
                  width={110}
                  onPress={() => controller.musicController.initMusic(listMusic, item.id)}
                  onLongPressItem={() => this.selectItem(item)}
                  onOptionPress={() => alert("Testando")}
                  isSelect={item.select}  
              />
          );
      } 
  }





    render(){
       return(
        <View style={{ flex: 1 }}>
            <FlatList 
                data={this.state.listMusic}
                extraData={this.state}
                renderItem={this.renderItens}
                initialNumToRender={20}
                keyExtractor={item => item.id}
                windowSize={50}
                numColumns={3}
            />
        </View>
       );
    }
}






*/