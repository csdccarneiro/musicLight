import TrackPlayer from 'react-native-track-player';

export default async function service(){    

    TrackPlayer.addEventListener('remote-play', async () => {
        TrackPlayer.play();
    });
    TrackPlayer.addEventListener('remote-pause', async () => {
        TrackPlayer.pause();
    });
    TrackPlayer.addEventListener('remote-previous', async () => {
        TrackPlayer.skipToPrevious();
    });
    TrackPlayer.addEventListener('remote-next', async () => {
      TrackPlayer.skipToNext();
    });
    TrackPlayer.addEventListener('remote-duck', async (data) => {
          if (data.paused || data.permanent) {
              TrackPlayer.pause();
          }
    });
    TrackPlayer.addEventListener('remote-jump-backward', async (data) => {
        TrackPlayer.getPosition().then((position) => {
            TrackPlayer.seekTo(position - data.interval);
        });
    });
    TrackPlayer.addEventListener('remote-jump-forward', async (data) => {
        TrackPlayer.getPosition().then((position) => {
            TrackPlayer.seekTo(position + data.interval);
        });
    });
    TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
        if (data.track != null) {
            TrackPlayer.add(await TrackPlayer.getQueue());
            TrackPlayer.play();
        }
    });

} 