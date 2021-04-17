import * as I from './I'
import persstring from './locale'
import { GRID_STRING_COLUMN_TYPE, GRID_NUMBER_COLUMN_TYPE, GRID_DATE_COLUMN_TYPE, GRID_DATETIME_COLUMN_TYPE } from '@material-ui/data-grid';
import { ContactSupportOutlined } from '@material-ui/icons';
import { type } from 'node:os';


export { }

// ===================================
// Some simple command procedures
// ===================================
export function log(s: string) {
    console.log(s);
}

export function trace(module: string, mess: string) {
    console.log("[" + module + "] " + mess);
}

export function erralert(mess: string) {
    alert(mess);
}

export function tstoDate(ts: number): string {
    const date = new Date(ts);

    return date.toLocaleString()
}

export function internalerrorlog(mess: string) {
    const emess: string = "Internal error :" + mess;
    log(emess);
    erralert(emess);
}


// transform number to range

export function range(size: number): ReadonlyArray<number> {
    return Array.from({ length: size }, (value, key) => key);
}

export function cannotfindError(method: String, field: string) {
    internalerrorlog(method + ": Cannot find " + field);
}

export function randomString(): string {
    return "" + Math.random();
}

// ================================
// confirm dialog
// ================================

var confirm: any = null

export function setConfirm(pconfirm: any) { confirm = pconfirm }

export function confirmAlert(question: string, title: string = persstring('areyousure')) {
    return confirm({
        description: question,
        confirmationText: persstring('ok'),
        cancellationText: persstring('cancel'),
        title: title
    })
}

export function infoAlert(mess: string, title: string = "") {
    return confirm({
        description: mess,
        confirmationText: persstring('ok'),
        cancellationText: null,
        title: title
    })
}

// ======================
// find error in column
// ======================

export function verifyColumns(cols: I.ITableCol[]) {

    cols.forEach(e => {
        if (e.field == null) {
            internalerrorlog("field attribute empty");
        }
        const t = e.type;
        if (t != null) {
            if ((t != GRID_DATETIME_COLUMN_TYPE && t != GRID_DATE_COLUMN_TYPE && t != GRID_NUMBER_COLUMN_TYPE && t != GRID_STRING_COLUMN_TYPE)) {
                const mess = e.field + " type: " + t + " incorrect. Expected: " + GRID_DATETIME_COLUMN_TYPE + "," + GRID_DATE_COLUMN_TYPE + "," + GRID_NUMBER_COLUMN_TYPE + " or " + GRID_NUMBER_COLUMN_TYPE;
                internalerrorlog(mess);
            }
        }
    })
}

// =================================
// transform pars to query params
// =================================

export function partoQuery(pars: Object): string {
    var res = ""
    for (const [key, value] of Object.entries(pars)) {
        const p = key + "=" + value;
        if (res != "") res = res + "?";
        res = res + p;
    }
    return res;
}

// =======================
// verify dispatcher
// =======================

export function verifyDispatcher(t: I.TDispatchRes) {

    if (t.action != I.TDISPATCHLISTELEM) {
        internalerrorlog("action:" + t.action + " " + I.TDISPATCHLISTELEM + " expected")
        return
    }
    if (t.restid == null) {
        internalerrorlog("restid cannot be null");
        return;
    }
    if (t.pars == null) {
        internalerrorlog("pars cannot be null");
        return;
    }
}