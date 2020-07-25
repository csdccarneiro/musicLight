import { Alert } from 'react-native';
import { takeEvery, put, call } from 'redux-saga/effects';
import controllers from '../../../controllers';

function* asyncDeleteFile(action) {
    
    const response = yield call(alertDelete);

    if (response) {
        
        const musics = yield controllers.AppController.deleteFile(action.payload.localListMusic, action.payload.items);
        
        if (musics.ids) {        

            const tracks = yield controllers.MusicController.removeTrackQueue(musics.ids);
            
            yield put({ type: "DELETE_FILE", payload: { localListMusic: musics.newListMusic } });      

        }

    }

} 

function alertDelete() {

    return new Promise(resolve => {
        Alert.alert("Excluir", "Deseja mesmo remover?", 
        [ 
            { text: "Não", style: "cancel" }, 
            { text: "Sim", onPress: () => resolve(true) }
        ], { cancelable: true });
    });

}

export default function* root() {
    yield takeEvery("ASYNC_DELETE_FILE", asyncDeleteFile);  
}

