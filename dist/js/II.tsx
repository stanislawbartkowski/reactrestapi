export {}

// ===============
// MESS
// ===============

export type TMess = string | TStringParam | null;

export type TMessParam = string | number | boolean

export type TStringParam = {
    readonly localize?: boolean,
    readonly messid: string | number | boolean,
    readonly params?: TMessParam[]
}

// ================
// Dispatch
// ================

export interface IResourceListData {
    readonly res: object[] | object
}

interface IDispatchBase {
    readonly action: string,
    readonly restid?: string,
    readonly pars?: object
    readonly messid?: TMess,
    readonly vars?: object
}

export interface IFieldMessage {
    field: string,
    mess: TMess
}

export interface IFormStateActions {
    focus?: string
    error?: IFieldMessage[]
}

export interface IDispatchFormRes extends IDispatchBase {
    readonly confirm?: IDispatchFormRes
    readonly error?: IFieldMessage[]
    readonly close?: boolean
    readonly focus?: string
    readonly refresh?: boolean
}

export interface IDispatchListRes extends IDispatchBase {
    readonly datares?: IResourceListData
}

// =====================================
// actions definition
// =====================================


// choice on column, more then one action

export type ICallBackActionChoice = {
    readonly messid: TMess,
    readonly jsaction: string
}

// action related to a single column/cell
//   field: field identifier
//   jsaction : js function to call
//   isaction: actions is available for that cell

export enum ActionType {
    JSACTION, CHOICE, RES
}


export interface ICallBackActionDef {
    readonly jsaction?: string | ICallBackActionChoice[] | IDispatchFormRes
    readonly isaction?: string
    readonly notempty?: boolean
}

export interface IRowAction extends ICallBackActionDef {
    readonly field: string
}

export interface IClickButtonActionDef extends ICallBackActionDef {
    readonly actionid: string
    readonly rowchosen?: boolean
    readonly close?: boolean
    readonly checkrequired?: boolean
}

