import React from 'react';
import { PermissionsAndroid, BackHandler, Dimensions } from 'react-native';
import MusicFiles from "react-native-get-music-files";
import RNFetchBlob from 'rn-fetch-blob';
import Share from "react-native-share";

class AppController {

    async verifyOrSendPermission() {
        
        const check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

        if (check === PermissionsAndroid.RESULTS.GRANTED || response === PermissionsAndroid.RESULTS.GRANTED)
            return await this.getMusics();
        else 
            BackHandler.exitApp();
    
    }    

    shareFile(itemsSelected: Array) {

        const files = itemsSelected.map(async ({ path }) => "data:audio/mpeg;base64," + await RNFetchBlob.fs.readFile(path, 'base64'));

        Promise.all(files).then(data => {
            Share.open({ title: "Músicas", urls: data, type: "application/zip" }).then(() => {
                alert("Compartilhado com sucesso!");                
            }).catch(() => {

            });
        });

    }

    async deleteFile(listMusic: Array, itemsSelected: Array) {

        const promiseFiles = itemsSelected.map(item => RNFetchBlob.fs.unlink(item.path));
        
        await Promise.all(promiseFiles);

        var mapItems = new Map();

        var idsTracks = itemsSelected.map(item => { mapItems.set(item.id, true); return item.id; });

        var newListMusic = listMusic.filter(item => { 
            if (!mapItems.has(item.id))
                return item;
        });

        console.log(newListMusic.length);

        return { ids: idsTracks, localListMusic: newListMusic };

    }

    async getMusics() {

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

        return { localListMusic, widthItems: (Dimensions.get("window").width / 2) * 0.8 };

    }
    
}

export default new AppController();