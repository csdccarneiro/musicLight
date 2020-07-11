import { takeEvery, put } from 'redux-saga/effects';
import controllers from '../../../controllers';

function* asyncGetMusics(action) {

    const musics = yield controllers.AppController.verifyOrSendPermission(action.payload);

    if (musics) {
        yield put({ type: "GET_MUSICS", payload: { localListMusic: musics.localListMusic, 
            widthItems: musics.widthItems } });        
    }

} 

export default function* root() {
    yield takeEvery("ASYNC_GET_MUSICS", asyncGetMusics);  
}

