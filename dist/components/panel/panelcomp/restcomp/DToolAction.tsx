import { Dispatch } from 'react';

import * as I from '../../../../js/I';
import * as C from '../../../../js/C';
import D from './D'


function dToolAction(dispa: Dispatch<any>, slotid: I.SLOT, listactionid: string, cols: I.ITableCol[], action: I.IClickButtonActionDef, row: any) {

    const datares: I.IResourceListData = C.isStandardAdd(action.actionid) ? { res: {} } : { res: row };
    const dispatchres: I.IDispatchRes = { action: I.TDISPATCHPOPUP, restid: listactionid + "_" + action.actionid.toLocaleLowerCase(), pars: null, vars: null, datares: datares }
    D(dispa, slotid, dispatchres);
}

export default dToolAction;
