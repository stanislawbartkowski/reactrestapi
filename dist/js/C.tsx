import { GRID_STRING_COL_DEF, GRID_NUMERIC_COL_DEF, GRID_DATE_COL_DEF, GRID_DATETIME_COL_DEF } from '@mui/x-data-grid';

import * as I from './I'
import * as II from './II'
import reststring from './locale'
import axios from '../axios'
import { createCheckers, CheckerT } from "ts-interface-checker";
import IITypeChecker from './II-ti'

// `npm bin`/ts-interface-builder src/reactrestapi/dist/js/II.tsx

export { }

// ============================================
// type checkers
// ============================================


function isString(p: any): boolean {
    return typeof p === "string";
}

function isArray(p: any): boolean {
    return Array.isArray(p);
}

function isNumber(p: any): boolean {
    return typeof p === "number";
}

const IIChecker = createCheckers(IITypeChecker)


function TMessChecker(t: II.TMess): boolean {
    try {
        if (t == null) return true;
        IIChecker.TMess.strictCheck(t)
        if (isString(t)) return true;
        const p: II.TStringParam = t as II.TStringParam;
        if (!isString(p.messid) && p.localize) {
            internalinfoerrorlog("TMess", "messid is not string, localized should be false");
            return false;
        }

    } catch (e: any) {
        internalinfoerrorlog("TMess", e)
        return false;
    }
    return true;
}

function IDispatchFormResChecker(t: II.IDispatchFormRes): boolean {
    try {
        IIChecker.IDispatchFormRes.strictCheck(t)
    } catch (e: any) {
        internalinfoerrorlog("IDispatchFormRes", e)
        return false;
    }
    return true;
}


function IDispatchListResChecker(t: II.IDispatchListRes): boolean {
    try {
        IIChecker.IDispatchListRes.strictCheck(t)
    } catch (e: any) {
        internalinfoerrorlog("IDispatchListRes", e)
        return false;
    }
    return true;
}

function IClickButtonActionDefChecker(t: II.IClickButtonActionDef): boolean {
    try {
        IIChecker.IClickButtonActionDef.strictCheck(t)
    } catch (e: any) {
        internalinfoerrorlog("IClickButtonActionDef", e)
        return false;
    }
    return true;
}

// IRowAction

function IRowActionChecker(t: II.IRowAction): boolean {
    try {
        IIChecker.IRowAction.strictCheck(t)
    } catch (e: any) {
        internalinfoerrorlog("IRowAction", e)
        return false;
    }
    return true;
}

// ICallBackActionDef

function ICallBackActionDefChecker(t: II.ICallBackActionDef): boolean {
    try {
        IIChecker.ICallBackActionDef.strictCheck(t)
    } catch (e: any) {
        internalinfoerrorlog("ICallBackActionDef", e)
        return false;
    }
    return true;
}


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

export function internalinfoerrorlog(info: string, errmess: string, alert: boolean = true) {
    const emess: string = info + "   Internal error :" + errmess;
    log(emess);
    if (alert) erralert(emess);
}

export function noSec(starttime: number) {
    return Math.round((Date.now() - starttime) / 1000);
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

export function callJSRowFunction(jsAction: string, row: object, vars?: object): any {
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

function verifyNameOnList(mess: string, name: string, allowedlist: string[]) {
    if (!(allowedlist.includes(name))) {
        let listmess: string | null = null;
        allowedlist.forEach(s => { listmess = (listmess == null) ? s : listmess + "," + s });
        internalerrorlog(mess + " found: " + name + ". Expected " + listmess)
        return false;
    }
    return true
}


// ======================
// find error in column
// ======================

const typelist: string[] = [GRID_DATETIME_COL_DEF.type as string, GRID_DATE_COL_DEF.type as string, GRID_NUMERIC_COL_DEF.type as string, GRID_STRING_COL_DEF.type as string];


export function verifyColumns(cols: I.ITableCol[]) {


    cols.forEach(e => {
        if (e.field == null) {
            internalerrorlog("field attribute empty");
        }
        if (e.props != undefined) {
            const t = e.props.type;
            if (t != null) verifyNameOnList("Incorred column type", t,typelist);
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
        if (res != "") res = res + "&";
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
        return true;
    }
    return false;
}

// =======================
// verify dispatcher
// =======================

export function verifyDispatcherList(t: II.IDispatchListRes): boolean {

    if (t == undefined || t == null) {
        internalerrorlog("Return data cannot be null or undefined");
        return false;
    }
    if (!IDispatchListResChecker(t)) return false;
    switch (t.action) {
        case I.TDISPATCHWARNING:
        case I.TDISPATCHYESNO:
            if (notObjectProps(t.action, true, t, "messid")) return false;
            if (t.action == I.TDISPATCHYESNO) {
                if (notObjectProps(t.action, true, t, "confirm")) return false;
            }
            break;
        case I.TDISPATCHPOPUP:
            if (notObjectProps(t.action, true, t, "restid", "pars")) return false;
            break;
    }
    return true;
}

export function verifyFormDispatcher(t: II.IDispatchFormRes): boolean {

    if (!IDispatchFormResChecker(t)) return false
    switch (t.action) {
        case I.TDISPATCHWARNING:
        case I.TDISPATCHYESNO:
            if (notObjectProps(t.action, true, t, "confirm")) return false;
            break;
    }
    return true;
}

// ==========================
// expand title
// ==========================

function checkArray(mess: string, p: any, alert: boolean): boolean {
    if (isArray(p)) return true;
    internalerrorlog(mess, alert)
    return false;
}

export function verifyTRow(p: II.IRowAction) {
    return IRowActionChecker(p);
}

export function verifyString(p: II.TMess): boolean {
    return TMessChecker(p);
}

// ========================
// localized strings
// ========================

export function compString(compid: string, messid: string | undefined): string {
    if (messid != undefined) return reststring(messid)
    return reststring(compid);
}

export function getString(pp: II.TMess): string | null {
    if (pp == null) return null;
    if (isString(pp)) return reststring(pp as string);
    const p: II.TStringParam = pp as II.TStringParam;
    if (p.localize != null && !p.localize) return p.messid.toString();
    const pars: II.TMessParam[] = (p.params == null) ? [] : p.params;
    return reststring(p.messid as string, ...pars)
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

export type ModifDataUrl = (id: string | undefined, restid: string) => string;

let modifurlfun: ModifDataUrl = (id: string | undefined, restid: string) => { return restid; }

export function modifDataUrl(id: string | undefined, restid: string): string {
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

export function isStandardRefresh(actionid: string): boolean {
    return actionid == I.STANDARDACTIONREFRESH;
}

export function isStandardAdd(actionid: string): boolean {
    return actionid == I.STANDARDACTIONADD;
}

export function isReadOnly(t: II.IClickButtonActionDef): boolean {
    if (isStandardShow(t.actionid)) return true;
    return false;
}


// =============================
// form action
// =============================

export function ActionCallType(t: II.ICallBackActionDef): II.ActionType {
    if (isArray(t.jsaction)) return II.ActionType.CHOICE
    if (isString(t.jsaction)) return II.ActionType.JSACTION
    return II.ActionType.RES
}

export function ActionCallBack(t: II.ICallBackActionDef, c: I.CActionData): any {

    return callJSRowFunction(t.jsaction as string, c.getRow(), c.getVars())
}

export function callRest(i: II.IDispatchFormRes, c: I.CActionData, fun: I.IDispatchActionCallBack) {
    if (i.restid == undefined) {
        infoAlert("restid property is undefined")
        return;
    }
    let url = modifDataUrl(undefined, i.restid);
    if (i.pars != undefined) {
        const pars: string = partoQuery(i.pars)
        url = addQuery(url, pars)
    }
    switch (i.action) {

        case I.FORMATRESTGET:
            axios.get(url).then(res => {
                fun(res.data as II.IDispatchFormRes, c);
            });
            break;

        case I.FORMATRESTPOST:
            axios.post(url, c.getData()).then(res => {
                fun(res.data as II.IDispatchFormRes, c);
            })
            break;
    }
}

// ===============
// isempty
// ===============

export function isEmpty(f?: string): boolean {
    if (f == undefined || f == null) return true;
    if (f == "") return true;
    return false;
}

export function isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0;
}

// =========================
// verify Table and Form
// =========================

function verifyCallBackAction(t: II.ICallBackActionDef): boolean {
    if (!ICallBackActionDefChecker(t)) return false;
    return true;
}

function verifyClickButtonAction(t: II.IClickButtonActionDef, tools: boolean): boolean {
    if (!IClickButtonActionDefChecker(t)) return false;
    if (tools) return true;
    if (t.jsaction == undefined && !t.close) {
        internalinfoerrorlog("IClickButtonActionDef", t.actionid + " either close or jsaction should be defined")
        return false;
    }
    return true;
}


function checkPropArray(info: string, t: any, prop: string): any | undefined | null {
    if (!t.hasOwnProperty(prop)) return undefined
    const a = t[prop]
    if (!checkArray(info + " " + prop + " array expected", a, true)) return null
    return a
}

function verifyRowActionTable(info: string, t: any, prop: string): boolean {
    const a: any | null | undefined = checkPropArray(info, t, prop);
    if (a == undefined) return true;
    if (a == null) return false;
    const arow: II.IRowAction[] = a
    arow.forEach(e => { if (!verifyTRow(e)) return false; })
    return true;
}

function verifyRowAction(t: any, prop: string): boolean {
    if (!t.hasOwnProperty(prop)) return true;
    const a = t[prop] as II.IRowAction
    return verifyTRow(a);
}

function verifyButtonActionTable(info: string, t: any, prop: string, tools: boolean): boolean {
    const a: any | null | undefined = checkPropArray(info, t, prop);
    if (a == undefined) return true;
    if (a == null) return false;
    const arow: II.IClickButtonActionDef[] = a
    arow.forEach(e => {
        if (!verifyClickButtonAction(e, tools)) return false;
    })
    return true;
}

export function verifyITableDef(t: I.IRestTable): boolean {
    if (!verifyRowActionTable("IRestTable", t, "style")) return false;
    if (!verifyRowActionTable("IRestTable", t, "value")) return false;
    if (!verifyRowActionTable("IRestTable", t, "celltitle")) return false;
    if (!verifyRowActionTable("IRestTable", t, "click")) return false;
    if (!verifyRowAction(t, "ident")) return false;
    if (!verifyButtonActionTable("IRestTable", t, "tools", true)) return false;
    t.columns.forEach(e => {
        if (e.clickTRow != null)
            if (!verifyTRow(e.clickTRow)) return false;
    })
    return true;
}

export function verifyIFormDef(t: I.IFieldForm): boolean {
    if (!verifyButtonActionTable("IFieldForm", t, "buttons", false)) return false;
    t.fields.forEach(e => {
        if (e.afterfield != undefined && !verifyCallBackAction(e.afterfield)) return false;
        if (e.beforefield != undefined && !verifyCallBackAction(e.beforefield)) return false;
        if (e.fieldnamehelper != undefined && !verifyString(e.fieldnamehelper)) return false;
    })

    return true;
}