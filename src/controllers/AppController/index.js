import React from 'react';
import { PermissionsAndroid, BackHandler, Dimensions, ToastAndroid } from 'react-native';
import { RNAndroidAudioStore } from "react-native-get-music-files";
import Share from "react-native-share";

class AppController {

    async verifyOrSendPermission(appState) {
        
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ]);
            
        if((granted["android.permission.READ_EXTERNAL_STORAGE"] && 
            granted["android.permission.WRITE_EXTERNAL_STORAGE"]) === PermissionsAndroid.RESULTS.GRANTED)
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

    addFavorite(localListMusic: Array, musicId: String) {

        return localListMusic.map(item => {
            if(item.id == musicId)
               item.rating = !item.rating;
            return item;
        });

    }

    async getMusics(appState) {

        let localListMusic = await RNAndroidAudioStore.getAll({
            id: true,
            artist: true,
            duration: true, 
            title: true,
            cover: true,
            fileName: true,
            path: true,
            minimumSongDuration: 60000
        });

        let widthItems = (Dimensions.get("window").width / 2) * 0.8;

        if (appState.localListMusic.length != localListMusic.length) {
            
            let trackIds = appState.localListMusic.map(track => track.id);

            let trackNoList = localListMusic.filter(track => !trackIds.includes(track.id));

            trackNoList = trackNoList.map(track => ({ 
                ...track,  
                fileName: track.fileName.replace(/\.[^/.]+$/, ""),
                title: (track.title ? track.title : "Artista desconhecido"),
                album: (track.album ? track.album : "Album desconhecido"),
                author: (track.author ? track.author : "Autor desconhecido"),
                rating: false,
                cover: (track.cover ? track.cover : appState.icon_music)
            }))

            localListMusic = appState.localListMusic.concat(trackNoList);
        
        }
        else 
            localListMusic = appState.localListMusic;
    
        return { localListMusic, widthItems };

    }
    
}

export default new AppController();