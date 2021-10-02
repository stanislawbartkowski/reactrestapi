import * as actions from './actions';
import { Reducer } from 'redux';

const startAction: actions.IPushString = {
    type: actions.STRINGTYPE.STRINGEMPTY,
    vals: undefined
};

function createPushReducer(act: actions.STRINGTYPE): Reducer {
    return (state = startAction, action): actions.IPushString => {
        switch (action.type) {
            case act:
                return {
                    type: action.type, vals: action.vals
                };
            case actions.STRINGTYPE.STRINGEMPTY:
                return {
                    type: action.type,
                    vals: undefined
                };

            default: return state;
        }
    }

}

export default createPushReducer;