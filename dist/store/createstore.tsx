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
const reducerGetList: Reducer = createReducer(I.RESOURCE.COMPRES)
const reducerGetListDef: Reducer = createReducer(I.RESOURCE.COMPRESDEF)
const reducerGetListSlot1: Reducer = createReducer(I.RESOURCE.COMPRESSLOT1)
const reducerGetListDefSlot1: Reducer = createReducer(I.RESOURCE.COMPRESDEFSLOT1)
const reducerGetListSlot2: Reducer = createReducer(I.RESOURCE.COMPRESSLOT2)
const reducerGetListDefSlot2: Reducer = createReducer(I.RESOURCE.COMPRESDEFSLOT2)
const reducerGetListSlot3: Reducer = createReducer(I.RESOURCE.COMPRESSLOT3)
const reducerGetListDefSlot3: Reducer = createReducer(I.RESOURCE.COMPRESDEFSLOT3)

const reducerActionName: Reducer = createPushReducer(actions.STRINGTYPE.MENUACTIONNAME);
const reducerActionList: Reducer = createPushReducer(actions.STRINGTYPE.COMPACTIONID);
const reducerActionListSlot1: Reducer = createPushReducer(actions.STRINGTYPE.COMPSLOT1ID);
const reducerActionListSlot2: Reducer = createPushReducer(actions.STRINGTYPE.COMPSLOT2ID);
const reducerActionListSlot3: Reducer = createPushReducer(actions.STRINGTYPE.COMPSLOT3ID);
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
        listactionslot3: reducerActionListSlot3,
        readlistdata: reducerGetList,
        readlistdef: reducerGetListDef,
        readlistdataslot1: reducerGetListSlot1,
        readlistdefslot1: reducerGetListDefSlot1,
        readlistdataslot2: reducerGetListSlot2,
        readlistdefslot2: reducerGetListDefSlot2,
        readlistdataslot3: reducerGetListSlot3,
        readlistdefslot3: reducerGetListDefSlot3,
    })

    store = createStore(rootStore, composeEnhancer(applyMiddleware(thunk)));
    return store;
}
