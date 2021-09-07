
import { Dispatch } from 'react';

import * as I from '../../../../js/I';
import * as II from '../../../../js/II';
import * as C from '../../../../js/C';
import * as lactions from '../../../../store/getdata/actions'
import * as dactions from '../../../../store/getcompres/actions'
import * as pactions from '../../../../store/pushstring/actions'


export interface IResourceData {
    readonly did: I.RESOURCE;
    readonly menuid: string;
    readonly restid: string;
    readonly dispa: Dispatch<any>;
    readonly pars: Object | undefined
}



interface ISLOTMAP {
    sid: pactions.STRINGTYPE,
    did: I.RESOURCE,
    fid: I.RESOURCE
}

const slotmap = new Map<I.SLOT, ISLOTMAP>([
    [I.SLOT.SLOTPANEL, { sid: pactions.STRINGTYPE.COMPACTIONID, did: I.RESOURCE.COMPRES, fid: I.RESOURCE.COMPRESDEF }],
    [I.SLOT.SLOTBASE, { sid: pactions.STRINGTYPE.COMPSLOT1ID, did: I.RESOURCE.COMPRESSLOT1, fid: I.RESOURCE.COMPRESDEFSLOT1 }],
    [I.SLOT.SLOT1, { sid: pactions.STRINGTYPE.COMPSLOT2ID, did: I.RESOURCE.COMPRESSLOT2, fid: I.RESOURCE.COMPRESDEFSLOT2 }],
    [I.SLOT.SLOT2, { sid: pactions.STRINGTYPE.COMPSLOT3ID, did: I.RESOURCE.COMPRESSLOT3, fid: I.RESOURCE.COMPRESDEFSLOT3 }]
])

const refreshSlot = new Map<I.SLOT, IResourceData | undefined>([
    [I.SLOT.SLOTBASE, undefined],
    [I.SLOT.SLOT1, undefined],
    [I.SLOT.SLOT2, undefined],
    [I.SLOT.SLOT3, undefined]
]);

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
    else {
        refreshSlot.set(slotid, { did: sl.did, menuid: d.restid, restid: d.restid, pars: d.pars, dispa: dispa });
        dispa(lactions.resourceRead(sl.did, d.restid, d.restid, d.pars));
    }
    dispa(dactions.resourceCompDefRead(sl.fid, d.restid, d.restid, d.vars));

}

export function decSlot(slotid: I.SLOT): I.SLOT | undefined {
    switch (slotid) {
        case I.SLOT.SLOT3: return I.SLOT.SLOT2;
        case I.SLOT.SLOT2: return I.SLOT.SLOT1;
        case I.SLOT.SLOT1: return I.SLOT.SLOTBASE;
        case I.SLOT.SLOTBASE: return I.SLOT.SLOTPANEL;
    }
    return undefined;
}

export function refreshTable(slotid: I.SLOT) {
    
    let ds: I.SLOT | undefined = decSlot(slotid)
    while (ds != undefined) {
        const d: IResourceData | undefined = refreshSlot.get(ds);
        if (d != undefined) {
            d.dispa(lactions.resourceRead(d.did, d.restid, d.restid, d.pars));
        }
        ds = decSlot(ds as I.SLOT);
    }
}

export default dAction;


