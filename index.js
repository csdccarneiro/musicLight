/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Service from './service'; 
import TrackPlayer from 'react-native-track-player';
TrackPlayer.registerPlaybackService(() => Service);
AppRegistry.registerComponent(appName, () => App);
