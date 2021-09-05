import { Dispatch } from 'react';

import * as I from '../../../../js/I';
import * as II from '../../../../js/II';
import * as C from '../../../../js/C';
import D from './D'


function dToolAction(dispa: Dispatch<any>, slotid: I.SLOT, listactionid: string, cols: I.ITableCol[], action: II.IClickButtonActionDef, row: any) {

    const datares: II.IResourceListData = C.isStandardAdd(action.actionid) ? { res: {} } : { res: row };
    const dispatchres: II.IDispatchListRes = { action: I.TDISPATCHPOPUP, restid: listactionid + "_" + action.actionid.toLocaleLowerCase(), pars: undefined, vars: undefined, datares: datares }
    D(dispa, slotid, dispatchres);
}

export default dToolAction;
