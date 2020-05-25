import { takeEvery, put } from 'redux-saga/effects';
import controllers from '../../controllers';

function* asyncGetMusics() {
    const musics = yield controllers.AppController.verifyOrSendPermission();
    yield put({ type: "GET_MUSICS", payload: { localListMusic: musics } });
} 

export default function* root() {
    yield takeEvery("ASYNC_GET_MUSICS", asyncGetMusics);  
}

