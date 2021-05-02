
import React, { Dispatch } from 'react';

import * as I from '../../../../js/I';
import * as C from '../../../../js/C';
import * as lactions from '../../../../store/getdata/actions'
import * as dactions from '../../../../store/getlistres/actions'
import * as pactions from '../../../../store/pushstring/actions'

export { }

export function dAction(dispa: Dispatch<any>, slotid: I.SLOT, d: I.TDispatchRes) {
    C.verifyDispatcher(d)

    if (d.action == I.TDISPATCHWARNING) {
        const mess: string | null = C.getString(d.messid as I.TMess);
        C.infoAlert(mess as string);
        return;
    }
    if (d.action == I.TDISPATCHPOPUP) {
        switch (slotid) {
            case I.SLOT.SLOTBASE:
                dispa(pactions.pushstring(pactions.STRINGTYPE.LISTSLOT1ID, d.restid));
                dispa(lactions.resourceRead(I.RESOURCE.LISTRESSLOT1, d.restid, d.restid, d.pars));
                dispa(dactions.resourceListDefRead(I.RESOURCE.LISTRESDEFSLOT1, d.restid, d.restid, d.vars));
                break;
            case I.SLOT.SLOT1:
                dispa(pactions.pushstring(pactions.STRINGTYPE.LISTSLOT2ID, d.restid));
                dispa(lactions.resourceRead(I.RESOURCE.LISTRESSLOT2, d.restid, d.restid, d.pars));
                dispa(dactions.resourceListDefRead(I.RESOURCE.LISTRESDEFSLOT2, d.restid, d.restid, d.vars));
                break;
            case I.SLOT.SLOT2:
                C.infoAlert("Treshold reached, cannot popup next dialog");
                break;
        }
    }
}


