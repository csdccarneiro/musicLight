/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player'; 
import App from './src/navigation';
import Service from './src/service';
import { name as appName } from './app.json';
//AppRegistry.registerHeadlessTask('Service', () => Service);
AppRegistry.registerComponent(appName, () => App); 
TrackPlayer.registerPlaybackService(() => Service);
