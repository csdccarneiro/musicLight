import { takeEvery, put } from 'redux-saga/effects';
import controllers from '../../../controllers';

function* asyncDeleteFile(action) {

    const musics = yield controllers.AppController.deleteFile(action.payload.localListMusic, 
        action.payload.items);
    
    if (musics.ids) {        
        
        const tracks = yield controllers.MusicController.removeTrackQueue(musics.ids);

        yield put({ type: "DELETE_FILE", payload: { localListMusic: musics.localListMusic } });      

    }

} 

export default function* root() {
    yield takeEvery("ASYNC_DELETE_FILE", asyncDeleteFile);  
}

