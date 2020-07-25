import { takeEvery, put } from 'redux-saga/effects';
import controllers from '../../../controllers';

function* asyncGetMusics(action) {

    if (action.payload.localListMusic.length > 0) 
        yield put({ type: "INIT_MUSICS", payload: { localListMusic: action.payload.localListMusic } });

    const musics = yield controllers.AppController.verifyOrSendPermission(action.payload);
    
    if (musics) {

        if (action.payload.localListMusic.length != musics.localListMusic.length) 
            yield put({ type: "INIT_MUSICS", payload: { localListMusic: musics.localListMusic } });
        
        yield put({ type: "GET_MUSICS", payload: { localListMusic: musics.localListMusic, 
            widthItems: musics.widthItems } });     
               
    }

} 

export default function* root() {
    yield takeEvery("ASYNC_GET_MUSICS", asyncGetMusics);  
}

