import React from 'react';
import { PermissionsAndroid, BackHandler, Dimensions, ToastAndroid } from 'react-native';
import MusicFiles from "react-native-get-music-files";
import RNFetchBlob from 'rn-fetch-blob';
import Share from "react-native-share";

class AppController {

    async verifyOrSendPermission(appState) {
        
        const check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

        if (check === PermissionsAndroid.RESULTS.GRANTED || response === PermissionsAndroid.RESULTS.GRANTED)
            return await this.getMusics(appState);
        else 
            BackHandler.exitApp();
    
    }    

    shareFile(itemsSelected: Array) {

        let files = itemsSelected.map(item => "file://" + item.path);
        
        Share.open({ title: "Músicas", urls: files, type: "application/zip" })
        .then(() => ToastAndroid.show("Compartilhado com sucesso!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50))
        .catch(() => ToastAndroid.show("Não foi possível a compartilhar.", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50));
    
    }

    async deleteFile(localListMusic: Array, itemsSelected: Array) {
        
        let promiseFiles = await Promise.all(itemsSelected.map(item => RNFetchBlob.fs.unlink(item.path)));

        let mapItems = new Map();

        let idsTracks = itemsSelected.map(item => { mapItems.set(item.id, true); return item.id; });

        let newListMusic = localListMusic.filter(item => { 
            if (!mapItems.has(item.id))
                return item;
        });

        return { ids: idsTracks, newListMusic };

    }

    addFavorite(localListMusic: Array, musicId: String) {

        return localListMusic.map(item => {
            if(item.id == musicId)
               item.rating = !item.rating;
            return item;
        });

    }

    async getMusics(appState) {

        let localListMusic = await MusicFiles.getAll({
            artist: true,
            duration: true,
            id: true,
            cover: true,
            path: true,
            title: true,
            minimumSongDuration : 1000, 
            fields: ['title','artwork','duration','artist','genre','lyrics','albumTitle']
        });

        let widthItems = (Dimensions.get("window").width / 2) * 0.8;

        if (appState.localListMusic.length != localListMusic.length) {
            
            let trackIds = new Map();

            appState.localListMusic.map(track => trackIds.set(track.id, true));

            let trackNoList = localListMusic.filter(track => {
                if(!trackIds.has(track.id)) {
                    track.fileName = track.fileName.replace(/\.[^/.]+$/, "");
                    track.title = (track.title ? track.title : "Artista desconhecido");
                    track.album = (track.album ? track.album : "Album desconhecido");
                    track.author = (track.author ? track.author : "Autor desconhecido");
                    track.rating = false;
                    track.cover = (track.cover ? track.cover : appState.icon_music);
                    return track;
                }
            });

            localListMusic = appState.localListMusic.concat(trackNoList);
            
            return { localListMusic, widthItems };
            
        }

    }
    
}

export default new AppController();