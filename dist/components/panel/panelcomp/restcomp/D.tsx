
import { Dispatch } from 'react';

import * as I from '../../../../js/I';
import * as II from '../../../../js/II';
import * as C from '../../../../js/C';
import * as lactions from '../../../../store/getdata/actions'
import * as dactions from '../../../../store/getcompres/actions'
import * as pactions from '../../../../store/pushstring/actions'

interface ISLOTMAP {
    sid: pactions.STRINGTYPE,
    did: I.RESOURCE,
    fid: I.RESOURCE
}

const slotmap = new Map<I.SLOT, ISLOTMAP>([
    [I.SLOT.SLOTBASE, { sid: pactions.STRINGTYPE.COMPSLOT1ID, did: I.RESOURCE.COMPRESSLOT1, fid: I.RESOURCE.COMPRESDEFSLOT1 }],
    [I.SLOT.SLOT1, { sid: pactions.STRINGTYPE.COMPSLOT2ID, did: I.RESOURCE.COMPRESSLOT2, fid: I.RESOURCE.COMPRESDEFSLOT2 }],
    [I.SLOT.SLOT2, { sid: pactions.STRINGTYPE.COMPSLOT3ID, did: I.RESOURCE.COMPRESSLOT3, fid: I.RESOURCE.COMPRESDEFSLOT3 }]
])

function dAction(dispa: Dispatch<any>, slotid: I.SLOT, d: II.IDispatchListRes) {
    C.verifyDispatcherList(d)

    if (d.action == I.TDISPATCHWARNING) {
        const mess: string | null = C.getString(d.messid as II.TMess);
        C.infoAlert(mess as string);
        return;
    }

    const sl: ISLOTMAP | undefined = slotmap.get(slotid);

    if (sl == undefined) {
        C.infoAlert("Treshold reached, cannot popup next dialog");
        return;
    }

    if (d.restid == undefined) {
        C.internalerrorlog("Property restid is undefined")
        return;
    }

    dispa(pactions.pushstring(sl.sid, d.restid));

    if (d.datares != undefined) dispa(lactions.resourceReadReady(sl.did, d.restid, d.datares))
    else dispa(lactions.resourceRead(sl.did, d.restid, d.restid, d.pars));

    dispa(dactions.resourceCompDefRead(sl.fid, d.restid, d.restid, d.vars));

}

export default dAction;


