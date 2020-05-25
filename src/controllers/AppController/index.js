import React from 'react';
import { PermissionsAndroid, BackHandler } from 'react-native';
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

        const allMusic = await MusicFiles.getAll({
            artist: false,
            duration: false,
            album: false,
            genre: false,
            id: true,
            cover: true,
            path: true,
            title: true,
            minimumSongDuration : 1000, 
            fields: ['title','albumTitle','genre','lyrics','artwork','duration']
        });

        return allMusic.map(track => {
            track.fileName = track.fileName.replace(/\.[^/.]+$/, "");
            track.title = (track.title ? track.title : "Artista desconhecido");
            return track;
        });

    }
    
}

module.exports = new AppController();