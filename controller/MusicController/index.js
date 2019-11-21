import React from 'react';
import TrackPlayer from 'react-native-track-player';

class MusicController { 

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