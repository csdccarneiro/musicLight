import TrackPlayer from 'react-native-track-player';

class MusicController {

    async initMusic (localMusics, musicId) {

        const listMusic = await TrackPlayer.getQueue();
        if (listMusic.length != localMusics.length) {
            await TrackPlayer.destroy();
            this.addOrInitMusic(localMusics, musicId);
        }
        else 
            TrackPlayer.skip(musicId);
        
    }

    addOrInitMusic(localMusics, musicId) {

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
                    capabilities: [
                      TrackPlayer.CAPABILITY_JUMP_FORWARD,
                      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                      TrackPlayer.CAPABILITY_PAUSE,
                      TrackPlayer.CAPABILITY_PLAY,
                      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                      TrackPlayer.CAPABILITY_JUMP_BACKWARD
                    ]
                });

                TrackPlayer.add(localMusics);
                TrackPlayer.skip(musicId);
                TrackPlayer.play();

            });

        }

    }

}

export default new MusicController();