
import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';
import App from './src/navigation';
import Service from './src/service'; 

AppRegistry.registerComponent(appName, () => App); 
TrackPlayer.registerPlaybackService(() => Service);