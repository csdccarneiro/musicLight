import React from 'react';
import TrackPlayer from 'react-native-track-player';
import MusicFiles from 'react-native-get-music-files';
import { request, PERMISSIONS, check } from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';



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

    shareFile = (listMusic) => {
        if (listMusic.size <= 10) {
            var list = [];
            listMusic.forEach((item, index) => list.push({path: index}));
            const files = list.map(item => RNFetchBlob.fs.readFile(item.path, 'base64').then(async data => "data:audio/mpeg;base64," + data));
            Promise.all(files).then(async data => {
                await Share.open({ title: "Músicas", urls: data }).then(() => {
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


    initMusic = async (listTrack, musicId) => {
        if (await TrackPlayer.getQueue() != "") {
            const list = await TrackPlayer.getQueue();
            if (list.length != listTrack.length) {
                await TrackPlayer.removeUpcomingTracks();
                this.addMusic(listTrack, musicId);
            }
            else{
                TrackPlayer.skip(String(musicId));
                TrackPlayer.play();
            }
        }
        else
            this.addMusic(listTrack, musicId);
    }
    
    addMusic = async (listTrack, musicId) => {
        TrackPlayer.setupPlayer().then(async () => {
            for (var i = 0; i < listTrack.length; i++){
                await TrackPlayer.add({
                    id: listTrack[i].id,
                    url: listTrack[i].path,
                    fileName: listTrack[i].fileName,
                    duration: listTrack[i].duration,
                    title: (listTrack[i].title) ? listTrack[i].title : "Título Desconhecido",
                    artist: (listTrack[i].artist) ? listTrack[i].artist : "Artista Desconhecido",
                    artwork: (String(listTrack[i].cover).indexOf('.jpg') >= 0) ? listTrack[i].cover : require('../../images/musical-note.png')
                });
            }
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
            TrackPlayer.skip(String(musicId));
        });
        TrackPlayer.play();
    } 
}

const musicController = new MusicController(); 
export default musicController;