import TrackPlayer from 'react-native-track-player';


class MusicController {

    //INICIANDO MÚSICA
    async initMusic(localMusics, player) {

        var listMusic = await TrackPlayer.getQueue();
        
        if (await TrackPlayer.getState() == TrackPlayer.STATE_STOPPED 
            || await TrackPlayer.getState() == TrackPlayer.STATE_NONE) {
            if (listMusic.length != localMusics.length) {
                await TrackPlayer.reset();
                this.addMusic(localMusics, player);
            }
        }

    }

    async selectTrack(musicId) {

        var currentIdTrack = await TrackPlayer.getCurrentTrack();

        if (currentIdTrack == musicId)
            this.togglePlayAndPause();
        else {
            await TrackPlayer.skip(musicId);
            await TrackPlayer.play();
        }

    }

    //ADICIONANDO MÚSICAS
    addMusic(localMusics, player) {
        
        if (localMusics.length > 0) {
            
            TrackPlayer.setupPlayer().then(() => {

                localMusics = localMusics.map(music => ({
                    id: music.id,
                    url: music.path,
                    fileName: music.fileName,
                    duration: music.duration,
                    title: music.fileName,
                    artist: music.title,
                    artwork: music.cover
                }));

                TrackPlayer.updateOptions({
                    stopWithApp: true,
                    compactCapabilities: [
                        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                        TrackPlayer.CAPABILITY_PAUSE,
                        TrackPlayer.CAPABILITY_PLAY,
                        TrackPlayer.CAPABILITY_SKIP_TO_NEXT
                    ],
                    capabilities: [
                       TrackPlayer.CAPABILITY_JUMP_BACKWARD,
                       TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                       TrackPlayer.CAPABILITY_PAUSE,
                       TrackPlayer.CAPABILITY_PLAY,
                       TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                       TrackPlayer.CAPABILITY_JUMP_FORWARD
                    ]
                });
                
                TrackPlayer.add(localMusics);
                
                if (player.id) {
                    TrackPlayer.skip(player.id);
                    TrackPlayer.seekTo(player.position);
                    TrackPlayer.setVolume(Number(player.volume));   
                }

            });

        }

    }

    async removeTrackQueue(listIds: Array) {

        const currentIdTrack = await TrackPlayer.getCurrentTrack(); 

        var isIdInList = false;

        listIds.map(item => {
            if(String(currentIdTrack) == String(item))
               isIdInList = true;
        });

        if (isIdInList) 
            await TrackPlayer.skipToNext();

        await TrackPlayer.remove(listIds);
        
        return true;

    };

    //PLAY E PAUSE
    async togglePlayAndPause() {

        if (await TrackPlayer.getState() == TrackPlayer.STATE_PLAYING)
            await TrackPlayer.pause();
        else if (await TrackPlayer.getState() == TrackPlayer.STATE_PAUSED) 
            await TrackPlayer.play();
    
    }

    //MÚSICA ANTERIOR
    async previousTrack() {
        
        var currentIdTrack = await TrackPlayer.getCurrentTrack(); 
        var listMusic = await TrackPlayer.getQueue();
        
        if (listMusic[0].id == currentIdTrack) 
            await TrackPlayer.skip(listMusic[listMusic.length - 1].id);
        else
            await TrackPlayer.skipToPrevious();
        
    }

    //PRÓXIMA MÚSICA
    async nextTrack() {

        var currentIdTrack = await TrackPlayer.getCurrentTrack(); 
        var listMusic = await TrackPlayer.getQueue();

        if (listMusic[listMusic.length - 1].id == currentIdTrack) 
            await TrackPlayer.skip(listMusic[0].id);
        else
            await TrackPlayer.skipToNext();

    }

    //SETANDO PROGRESSÃO DA MÚSICA
    async seekTrack(progress) {

        await TrackPlayer.seekTo(progress);

    }

    //VOLUME DA MÚSICA
    async volumeTrack(volume) {

        await TrackPlayer.setVolume(volume);

    }

}

export default new MusicController();