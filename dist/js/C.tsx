import * as I from './I'
import reststring from './locale'
import { GRID_STRING_COLUMN_TYPE, GRID_NUMBER_COLUMN_TYPE, GRID_DATE_COLUMN_TYPE, GRID_DATETIME_COLUMN_TYPE } from '@material-ui/data-grid';


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

export function internalerrorlog(mess: string, alert: boolean = true) {
    const emess: string = "Internal error :" + mess;
    log(emess);
    if (alert) erralert(emess);
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

export function callJSRowFunction(jsAction: string, row: any): any {
    const clickaction = new Function('p', "return " + jsAction + "(p)");
    return clickaction(row);
}

// ================================
// confirm dialog
// ================================

var confirm: any = null

export function setConfirm(pconfirm: any) { confirm = pconfirm }

export function confirmAlert(question: string, title: string = reststring('areyousure')) {
    return confirm({
        description: question,
        confirmationText: reststring('ok'),
        cancellationText: reststring('cancel'),
        title: title
    })
}

export function infoAlert(mess: string, title: string = "") {
    return confirm({
        description: mess,
        confirmationText: reststring('ok'),
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

export function addQuery(url: string, query: string): string {
    if (url.indexOf('?')) return url + '&' + query;
    return url + '?' + query;
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
    if (t.title != null) {
        if (t.title.messid == null) {
            internalerrorlog("title.messid cannot be null");
            return;
        }
    }
}

// ==========================
// expand title
// ==========================

export function verifyTRow(p: I.TRowAction) {
    if (p.field == null) {
        internalerrorlog("ident p.field cannot be null");
        return;
    }
    if (p.jsaction == null) {
        internalerrorlog("ident p.json cannot be null");
        return;
    }
}

export function verifyTitle(p: I.TTitleParam) {
    if (p.messid == null) {
        internalerrorlog("p.messid cannot be null", false);
        return;
    }
}

export function titleString(p: I.TTitleParam): string {
    const pars: string[] = (p.params == null) ? [] : p.params;
    return reststring(p.messid, ...pars)
}

// ====================================
// custom function regarding menu
// ====================================

export type CanMenu = ((id: string) => boolean) | undefined;

let canfun: CanMenu = undefined;

export function setCanMenu(fun: CanMenu) {
    canfun = fun;
}

export function CanCallMenu(id: string): boolean {
    if (canfun == undefined) return true;
    return canfun(id);
}

// ====================================
// customer modifiers for getting data
// ====================================

export type ModifDataUrl = (id: string, restid: string) => string;

let modifurlfun: ModifDataUrl = (id: string, restid: string) => { return restid; }

export function modifDataUrl(id: string, restid: string): string {
    return modifurlfun(id, restid);
}

export function setModifUrl(fun: ModifDataUrl) {
    modifurlfun = fun;
}