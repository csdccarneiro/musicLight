import controller from '../../../../controller';

const DATA_PAGE_MUSIC = {
    listMusic: [],
    searchMusic: [],
    refreshList: false
};

const page_music = (state = DATA_PAGE_MUSIC, action) => {
    switch (action.type) {

        case "VERIFY_PERMISSION":
            controller.musicController.verifyPermission();
            return state;
        break;
        case "LOADED_LIST_MUSIC":
            if (action.searchMusic.length == action.listMusic.length){
                controller.musicController.initMusic(action.listMusic, action.currentTrackId, action.position);
                return { ...state, refreshList: action.refreshList, listMusic: action.listMusic, searchMusic: action.searchMusic };
            }
            else
                return { ...state, listMusic: action.searchMusic };
        break;
        case "REFRESH_LIST":
            return { ...state, refreshList: action.refreshList };
        break;
        case "SHARE_FILE":
            controller.musicController.shareFile(action.listSeleted);
            return state;
        break;
        case "DELETE_FILE":
            var newList = controller.musicController.deleteFile(action.listSeleted, action.listMusic, action.currentTrackId);
            return { ...state, listMusic: newList, searchMusic: newList };
        break;
        case "SEARCH_MUSIC":
            if(action.searchMusic != "")
                 return { ...state, listMusic: action.listSearchMusic.filter(item => item.fileName.toLowerCase().indexOf(action.searchMusic.toLowerCase()) > -1)};
            else
                return { ...state, listMusic: action.listSearchMusic };
        break;
        default: return state;
        break;
    }
}

export default page_music; 