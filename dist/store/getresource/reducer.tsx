import { Reducer } from 'redux';

import * as I from '../../js/I'

export const startAction: I.IResourceResult = {
    type: I.RESOURCE.NOTHING,
    data: null,
    restid: null,
    js: null
};

function createReducer(act: I.RESOURCE): Reducer {
    return (state = startAction, action): I.IResourceResult => {
        switch (action.type) {
            case act:
                return {
                    type: action.type,
                    data: action.data,
                    restid: action.restid,
                    js: action.js
                };
            case I.RESOURCE.NOTHING: return {
                type: action.type,
                data: null,
                restid: null,
                js: null
            };

            default: return state;
        }
    }

}

export default createReducer;