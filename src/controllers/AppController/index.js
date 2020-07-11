import React from 'react';
import { PermissionsAndroid, BackHandler, Dimensions } from 'react-native';
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

        const files = itemsSelected.map(async ({ path }) => "data:audio/mpeg;base64," + await RNFetchBlob.fs.readFile(path, 'base64'));

        Promise.all(files).then(data => {
            Share.open({ title: "Músicas", urls: data, type: "application/zip" })
            .then(() => alert("Compartilhado com sucesso!"))
            .catch(() => {});
        });

    }

    async deleteFile(appState: Object) {
        
        const { localListMusic, items } = appState;
        
        const promiseFiles = items.map(item => RNFetchBlob.fs.unlink(item.path));
        
        await Promise.all(promiseFiles);

        var mapItems = new Map();

        var idsTracks = items.map(item => { mapItems.set(item.id, true); return item.id; });

        var newListMusic = localListMusic.filter(item => { 
            if (!mapItems.has(item.id))
                return item;
        });

        return { ids: idsTracks, newListMusic };

    }

    async getMusics(appState) {

        var localListMusic = await MusicFiles.getAll({
            artist: true,
            duration: true,
            id: true,
            cover: true,
            path: true,
            title: true,
            minimumSongDuration : 1000, 
            fields: ['title','artwork','duration','artist','genre','lyrics','albumTitle']
        });

        var widthItems = (Dimensions.get("window").width / 2) * 0.8;

        if (appState.localListMusic.length != localListMusic.length) {
            
            var trackIds = new Map();

            appState.localListMusic.map(track => trackIds.set(track.id, true));

            var trackNoList = localListMusic.filter(track => {
                if(!trackIds.has(track.id)) {
                    track.fileName = track.fileName.replace(/\.[^/.]+$/, "");
                    track.title = (track.title ? track.title : "Artista desconhecido");
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