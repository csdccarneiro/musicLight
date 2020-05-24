/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import App from './src/navigation';
import { name as appName } from './app.json';
//import Service from './service'; 
//import TrackPlayer from 'react-native-track-player'; 
//TrackPlayer.registerPlaybackService(() => Service);
//AppRegistry.registerHeadlessTask('Service', () => Service);
AppRegistry.registerComponent(appName, () => App); 
