import { Dispatch } from 'react';

import * as I from '../../../../js/I';
import * as C from '../../../../js/C';
import * as lactions from '../../../../store/getdata/actions'
import * as dactions from '../../../../store/getcompres/actions'
import * as pactions from '../../../../store/pushstring/actions'
import D from './D'


function dToolAction(dispa: Dispatch<any>, slotid: I.SLOT, listactionid: string, cols: I.ITableCol[], action: I.TClickButtonAction, row: any) {

    const datares: I.IResourceListData = C.isStandardAdd(action.actionid) ? { res: {} } : { res: row };
    const dispatchres: I.TDispatchRes = { action: I.TDISPATCHPOPUP, restid: listactionid + "_" + action.actionid.toLocaleLowerCase(), pars: null, vars: null, datares: datares }
    D(dispa, slotid, dispatchres);
}

export default dToolAction;
