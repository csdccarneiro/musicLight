import controller from '../../../../controller';

const DATA_PAGE_MUSIC = {
    listMusic: [],
    searchMusic: [],
    refreshList: false,
    selected: new Map()
};

const page_music = (state = DATA_PAGE_MUSIC, action) => {
    switch (action.type) {

        case "VERIFY_PERMISSION":
            controller.musicController.verifyPermission();
            return state;
        break;
        case "LOADED_LIST_MUSIC":
            if (action.searchMusic.length == action.listMusic.length)
                return {...state, refreshList: action.refreshList, listMusic: action.listMusic, searchMusic: action.searchMusic };
            else
                return {...state, listMusic: action.searchMusic };
        break;
        case "REFRESH_LIST":
            return {...state, refreshList: action.refreshList };
        break;
        case "SHARE_FILE":
            controller.musicController.shareFile(action.listSeleted);
            return state;
        break;
        case "DELETE_FILE":
            if(state.selected.size > 0)
                return { ...state, selected: new Map(), listMusic: controller.musicController.deleteFile(action.listSeleted, action.listMusic) };
            else
                return { ...state, listMusic: controller.musicController.deleteFile(action.listSeleted, action.listMusic) };
        break;
        case "SELECT_ITEM":
            return { ...state, selected: controller.musicController.selectedItem(action.selected, action.path) };
        break;
        case "SELECT_ALL_ITEMS":
            return { ...state, selected: controller.musicController.selectedAllItens(action.listMusic, action.selected) };
        break;
        case "SELECT_ITENS_CLEAR":
            return { ...state, selected: controller.musicController.selectedItensClear(action.selected) };
        break;
        case "SEARCH_MUSIC":
            return { ...state, listMusic: action.listSearchMusic.filter(item => item.fileName.toLowerCase().indexOf(action.searchMusic.toLowerCase()) > -1)};
        break;
            
        default: return state;
        break;
    }
}

export default page_music; 