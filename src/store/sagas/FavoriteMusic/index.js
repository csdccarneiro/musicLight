import { takeEvery, put } from 'redux-saga/effects';
import controllers from '../../../controllers';

function* asyncFavoriteMusic(action) {

    const { musicId } = action.payload;

    if (musicId) {
        
        const { rating } = yield controllers.MusicController.addTrackFavorite(musicId);

        if (rating != undefined) {
        
            yield put({ type: "TRACK_FAVORITE", payload: { rating } });
    
            yield put({ type: "ADD_FAVORITE", payload: { musicId } });  
    
        }

    }


} 

export default function* root() {
    yield takeEvery("ASYNC_FAVORITE_MUSIC", asyncFavoriteMusic);  
}

