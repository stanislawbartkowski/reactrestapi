import { createStore, applyMiddleware, compose, combineReducers, Store } from 'redux';
import { Reducer } from 'redux';
import thunk from 'redux-thunk';
import * as I from '../js/I'

import createReducer from './getresource/reducer'
import createPushReducer from '../store/pushstring/reducer'
import * as actions from './pushstring/actions'

const reducerAppData: Reducer = createReducer(I.RESOURCE.APPDATA)
const reducerLeftMenu: Reducer = createReducer(I.RESOURCE.LEFTMENU)
const reducerStrings: Reducer = createReducer(I.RESOURCE.STRINGS)
const reducerGetList: Reducer = createReducer(I.RESOURCE.LISTRES)
const reducerGetListDef: Reducer = createReducer(I.RESOURCE.LISTRESDEF)
const reducerGetListSlot1: Reducer = createReducer(I.RESOURCE.LISTRESSLOT1)
const reducerGetListDefSlot1: Reducer = createReducer(I.RESOURCE.LISTRESDEFSLOT1)
const reducerGetListSlot2: Reducer = createReducer(I.RESOURCE.LISTRESSLOT2)
const reducerGetListDefSlot2: Reducer = createReducer(I.RESOURCE.LISTRESDEFSLOT2)

const reducerActionName: Reducer = createPushReducer(actions.STRINGTYPE.MENUACTIONNAME);
const reducerActionList: Reducer = createPushReducer(actions.STRINGTYPE.LISTACTIONID);
const reducerActionListSlot1: Reducer = createPushReducer(actions.STRINGTYPE.LISTSLOT1ID);
const reducerActionListSlot2: Reducer = createPushReducer(actions.STRINGTYPE.LISTSLOT2ID);
const reducerForceMenu: Reducer = createPushReducer(actions.STRINGTYPE.FORCEMENU);
const reducerDBName: Reducer = createPushReducer(actions.STRINGTYPE.DBNAME);

var store: Store;

export function makeStore() {
    const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    const rootStore = combineReducers({
        appdata: reducerAppData,
        leftmenu: reducerLeftMenu,
        strings: reducerStrings,
        menuactionname: reducerActionName,
        forcemenu: reducerForceMenu,
        dbname: reducerDBName,
        listactionid: reducerActionList,
        listactionslot1: reducerActionListSlot1,
        listactionslot2: reducerActionListSlot2,
        readlistdata: reducerGetList,
        readlistdef: reducerGetListDef,
        readlistdataslot1: reducerGetListSlot1,
        readlistdefslot1: reducerGetListDefSlot1,
        readlistdataslot2: reducerGetListSlot2,
        readlistdefslot2: reducerGetListDefSlot2,
    })

    store = createStore(rootStore, composeEnhancer(applyMiddleware(thunk)));
    return store;
}
