import React from 'react';
import MusicFiles from 'react-native-get-music-files';
import { request, PERMISSIONS, check } from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import TrackPlayer from 'react-native-track-player';

class MusicController { 

    //VERIFICANDO SE O APLICATIVO TEM PERMISSÃO
    verifyPermission = () => {
        check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(response => {
            if(response == "granted")
                this.StoreMusic();
            else{
                request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(response => {
                    if(response == "granted")  
                       this.StoreMusic();
                });
            }
        });
    }

    deleteFile = (listFiles, listMusic, currentTrackId) => {
        var list = [];
        listFiles.forEach((item, index) => list.push({ path: index }));
        const files = list.map(item => RNFetchBlob.fs.unlink(item.path));
        Promise.all(files).then(() => {
            alert("Excluído com Sucesso!");
        }).catch(() => {
            alert("Erro ao excluir músicas!");
        });
        return listMusic.filter(item => { 
            if (listFiles.has(item.path)) {
                if (item.id == currentTrackId)
                    TrackPlayer.skipToNext();
                TrackPlayer.remove(item.id);
            }
            else    
                return item; 
        });
    }

    shareFile = (listMusic) => {
        if (listMusic.size <= 10) {
            var list = [];
            listMusic.forEach((item, index) => list.push({path: index}));
            const files = list.map(item => RNFetchBlob.fs.readFile(item.path, 'base64').then(async data => "data:audio/mpeg;base64," + data));
            Promise.all(files).then(async data => {
                await Share.open({ title: "Músicas", urls: data, type: "application/zip" }).then(() => {
                    alert("Compartilhado com sucesso!");                
                }).catch(() => {
                    console.log("Não foi possível compartilhar os " + listMusic.length + " arquivos");
                });
            });   
        }
        else
            alert("Não é possível compartilhar mais de 10 arquivos");
    }

    //PEGANDO AS MÚSICAS
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
            minimumSongDuration: 500, 
            fields: ['title','artwork','duration','artist','genre','lyrics','albumTitle']
        });
    }

    initMusic = async (listTrack, player) => {
        if (await TrackPlayer.getQueue() != "" && listTrack != []) {
            const list = await TrackPlayer.getQueue();
            if (list.length != listTrack.length) {
                await TrackPlayer.destroy();
                this.addMusic(listTrack, player);
            }
        }
        else 
            this.addMusic(listTrack, player);
    }
    
    addMusic = (listTrack, player) => {
        
        if (listTrack.length > 0) {
            TrackPlayer.setupPlayer().then(() => {
                var list = [];
                listTrack.map(item => {
                    list.push({
                        id: item.id,
                        url: item.path,
                        fileName: item.fileName.substring(0, item.fileName.length - 4),
                        duration: item.duration,
                        title: (item.title ? item.title : "Título Desconhecido") ,
                        artist: (item.artist  ? item.artist : "Artista Desconhecido"),
                        artwork: (String(item.cover).indexOf('.jpg') >= 0 ? item.cover : require('../../images/musical-note.png'))
                    });
                });
    
                TrackPlayer.updateOptions({
                    capabilities: [
                      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                      TrackPlayer.CAPABILITY_PAUSE,
                      TrackPlayer.CAPABILITY_PLAY,
                      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                      TrackPlayer.CAPABILITY_JUMP_FORWARD,
                      TrackPlayer.CAPABILITY_JUMP_BACKWARD
                    ]
                });
                TrackPlayer.add(list);
                if (player.id != null) {
                    TrackPlayer.skip(player.id);
                    TrackPlayer.seekTo(player.position);
                }   
                TrackPlayer.setRate(player.velocity);
                TrackPlayer.setVolume(player.volume);
            });    
        }

    } 
}

const musicController = new MusicController(); 
export default musicController;