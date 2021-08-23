import * as I from './I'
import reststring from './locale'
import { GRID_STRING_COLUMN_TYPE, GRID_NUMBER_COLUMN_TYPE, GRID_DATE_COLUMN_TYPE, GRID_DATETIME_COLUMN_TYPE } from '@material-ui/data-grid';
import { isJSDocReadonlyTag } from 'typescript';


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

export function callJSRowFunction(jsAction: string, row: object, vars: object | null): any {
    const clickaction = new Function('p,vars', "return " + jsAction + "(p,vars)");
    const res = clickaction(row, vars);
    return res;
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
    if (url.indexOf('?') >= 0) return url + '&' + query;
    return url + '?' + query;
}

function notObjectProps(mess: string, alert: boolean, o: object, ...args: string[]) {
    let errmess: string | null = null;
    args.forEach(s => {
        if (!o.hasOwnProperty(s)) {
            if (errmess == null) errmess = mess + " properties cannot be null: " + s;
            else errmess = errmess + "," + s;
        }
    })
    if (errmess != null) {
        internalerrorlog(errmess, alert);
        return false;
    }
    return true;
}

// =======================
// verify dispatcher
// =======================

const actionlist: string[] = [I.TDISPATCHPOPUP, I.TDISPATCHWARNING]

export function verifyDispatcher(t: I.TDispatchRes) {

    if (!(actionlist.includes(t.action))) {
        let listmess: string | null = null;
        actionlist.forEach(s => { listmess = (listmess == null) ? s : listmess + "," + s });
        internalerrorlog("action:" + t.action + " " + listmess + " expected")
        return false;
    }
    if (t.action == I.TDISPATCHWARNING) {
        if (notObjectProps(t.action, true, t, "title")) return false;
    } else {
        if (notObjectProps(t.action, true, t, "restid", "pars")) return false;
    }
    if (t.messid != null) return verifyString(t.messid as I.TMess);
    return true;
}

// ==========================
// expand title
// ==========================

function isString(p: any): boolean {
    return typeof p === "string";
}

export function isArray(p: any): boolean {
    return Array.isArray(p);
}

function checkArray(mess: string, p: any, alert: boolean): boolean {
    if (isArray(p)) return true;
    internalerrorlog(mess, alert)
    return false;
}

export function verifyTRow(p: I.TRowAction) {
    if (!notObjectProps("TRowAction", false, p, "field", "jsaction")) return false;
    if (isString(p.jsaction)) return true;
    if (!checkArray("TRowAction, attribute jsaction, array or string is expected", p.jsaction, false)) return false;
    return true;
}

export function isSingleCallTRow(p: I.TRowAction): boolean {
    return isString(p.jsaction);
}

export function verifyString(p: I.TMess): boolean {
    if (p == null) return true;
    if (isString(p)) return true;
    const pp: I.TStringParam = p as I.TStringParam;
    if (pp.messid == null) {
        internalerrorlog("p.messid cannot be null", false);
        return false;
    }
    if (pp.params == null) return true;
    var isnull: boolean = false;
    pp.params.forEach(s => { if (s == null) isnull = true; });
    if (isnull) {
        internalerrorlog("p.params element cannot be null", false);
        return false;
    }
    return true;
}

// ========================
// localized strings
// ========================

export function compString(compid: string, messid: string | undefined): string {
    if (messid != undefined) return reststring(messid)
    return reststring(compid);
}

export function getString(pp: I.TMess): string | null {
    if (pp == null) return null;
    if (isString(pp)) return reststring(pp as string);
    const p: I.TStringParam = pp as I.TStringParam;
    if (p.localize != null && !p.localize) return p.messid;
    const pars: string[] = (p.params == null) ? [] : p.params;
    return reststring(p.messid, ...pars)
}

// ====================================
// custom function regarding menu
// ====================================

export type CanMenu = ((id: string) => boolean) | null;

let canfun: CanMenu = null;

export function setCanMenu(fun: CanMenu) {
    canfun = fun;
}

export function CanCallMenu(id: string): boolean {
    if (canfun == null) return true;
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

// ============================
// recognize resource
// ============================

export function ResourceDefType(res: any): I.RESOURCETYPE | null {
    const data = res.data;
    if (data != undefined) {
        if (data.columns != undefined) return I.RESOURCETYPE.LIST;
        if (data.fields != undefined) return I.RESOURCETYPE.FORM;
    }
    erralert("Unrecognized resource")
    return null;
}

// =============================
// tool actions
// =============================

export function isStandardShow(actionid: string): boolean {
    return actionid == I.STANDARDACTIONSHOW;
}

export function isStandardAdd(actionid: string): boolean {
    return actionid == I.STANDARDACTIONADD;
}

export function isReadOnly(t: I.TClickButtonAction): boolean {
    if (isStandardShow(t.actionid)) return true;
    return false;
}
