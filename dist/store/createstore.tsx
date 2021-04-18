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
const reducerGetListSpec: Reducer = createReducer(I.RESOURCE.LISTRESSPEC)
const reducerGetListDefSpec: Reducer = createReducer(I.RESOURCE.LISTRESDEFSPEC)

const reducerActionName: Reducer = createPushReducer(actions.STRINGTYPE.MENUACTIONNAME);
const reducerActionList: Reducer = createPushReducer(actions.STRINGTYPE.LISTACTIONID);
const reducerActionListSpec: Reducer = createPushReducer(actions.STRINGTYPE.LISTACTIONSPECID);

var store: Store;

export function makeStore() {
    const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    const rootStore = combineReducers({
        appdata: reducerAppData,
        leftmenu: reducerLeftMenu,
        strings: reducerStrings,
        menuactionname: reducerActionName,
        listactionid: reducerActionList,
        listactionspecid : reducerActionListSpec,
        readlistdata: reducerGetList,
        readlistdef: reducerGetListDef,
        readlistspec: reducerGetListSpec,
        readlistdefspec: reducerGetListDefSpec,
    })

    store = createStore(rootStore, composeEnhancer(applyMiddleware(thunk)));
    return store;
}
