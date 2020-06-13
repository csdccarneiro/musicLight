import React from 'react';
import { PermissionsAndroid, BackHandler, Dimensions } from 'react-native';
import MusicFiles from "react-native-get-music-files";


class AppController {

    async verifyOrSendPermission() {

        const check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

        if (check === PermissionsAndroid.RESULTS.GRANTED || response === PermissionsAndroid.RESULTS.GRANTED)
            return await this.getMusics();
        else 
            BackHandler.exitApp();
    
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

        localListMusic = localListMusic.map(track => {
            track.fileName = track.fileName.replace(/\.[^/.]+$/, "");
            track.title = (track.title ? track.title : "Artista desconhecido");
            return track;
        });

        return { localListMusic, widthItems: (Dimensions.get("window").width / 2) * 0.8 };

    }
    
}

module.exports = new AppController();