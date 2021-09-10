import { GridColDef, GridCellParams, GridComponentProps } from '@material-ui/data-grid';
import { InputBaseProps } from '@material-ui/core/InputBase'
import { InputLabelProps } from '@material-ui/core/InputLabel'
import * as II from './II'

export { }

// important: enum different than any other enums
export enum RESOURCE {
    NOTHING, APPDATA, LEFTMENU, STRINGS,

    COMPRES, COMPRESDEF,
    COMPRESSLOT1, COMPRESDEFSLOT1,
    COMPRESSLOT2, COMPRESDEFSLOT2,
    COMPRESSLOT3, COMPRESDEFSLOT3,
}

// general data returned by REST/API resource call

export const STANDARDACTIONSHOW: string = "SHOW"
export const STANDARDACTIONADD: string = "ADD"
export const STANDARDACTIONDELETE: string = "DEL"
export const STANDARDACTIONMODIF: string = "MODIF"
export const STANDARDACTIONREFRESH: string = "REFRESH"

export const STANDARDOKBUTTON: string = "OK"
export const STANDARDACCEPTBUTTON: string = "ACCEPT"
export const STANDARDCANCELBUTTON: string = "CANCEL"
export const STANDARDDELETEBUTTON: string = "DELETE"


export interface IResourceAppData {
    readonly logo: string;
    readonly appname: string;
}

export interface IResourceListMenu {
    readonly menu: TMenuElem[];
}

export interface IResourceResult {
    readonly type: RESOURCE,
    readonly data: IRestTable | II.IResourceListData | IResourceListMenu | IResourceAppData | IFieldForm | null,
    readonly restid: string | null,
    readonly js: string | null,
    readonly vars?: object
}

// column/cell definition passed to GridTable
//   colTitle: column title
//   onCellClick: action after clicking the cell
//   identCol: column identation
//   valueCol : custom cell value

export interface ITableCol {
    field: string,
    coltitle?: string,
    clickTRow: II.IRowAction | null,
    onCellClick: ((jsaction: string, param: GridCellParams) => void) | null,
    isCellClickable: (param: GridCellParams) => boolean,
    cellTitle: ((param: GridCellParams) => string | null) | null,
    identCol: ((param: GridCellParams) => number) | null,
    valueCol: ((param: GridCellParams) => string | null) | null
    props?: GridColDef
}


// table list definition returned by rest/API getlist call
//   columns: list of columns
//   js : js code attached
//   ident: column to ident
//   style : style assigned to cell/column
//   value: custom get value

export interface IRestTable {
    readonly columns: ITableCol[],
    readonly js?: string,
    readonly ident?: II.IRowAction,
    readonly style?: II.IRowAction[],
    readonly value?: II.IRowAction[],
    readonly celltitle?: II.IRowAction[],
    readonly click?: II.IRowAction[],
    readonly jstitle?: string
    readonly tools: II.IClickButtonActionDef[] | null
    readonly props?: GridComponentProps
}

export type TMenuElem = {
    readonly id: string
    readonly messid?: string
    readonly restid: string
}


export const TDISPATCHPANEL: string = "PANEL"
export const TDISPATCHPOPUP: string = "POPUP"
export const TDISPATCHWARNING: string = "WARNING"
export const TDISPATCHYESNO: string = "YESNO"

// popup dialog identifier to generate next
export enum SLOT {
    SLOTPANEL, SLOTBASE, SLOT1, SLOT2, SLOT3
};


// dispatcher data


// GridTable attributes
export interface IGridTableSpec {
    readonly clickToolRow: (action: II.IClickButtonActionDef, row: any) => void;
    readonly className: string | null,
    readonly title?: string,
    readonly onClose: () => void,
    readonly tools: II.IClickButtonActionDef[] | null
}

export interface IGridTable {
    readonly list: any[],
    readonly coldef: ITableCol[],
    readonly spec: IGridTableSpec
    readonly props?: GridComponentProps
}

// GridForm attributes

export interface IGridForm {
    readonly data: any[],
    readonly fields: ITableCol[],
}

// Resource type
export enum RESOURCETYPE {
    LIST, FORM
}

// ----------------

export const BEFOREFIELD = "beforefield"
export const AFTERFIELD = "afterfield"

export const FORMACTIONOK = "OK"
export const FORMACTIONNO = "NO"
export const FORMATRESTGET = "RESTGET"
export const FORMATRESTPOST = "RESTPOST"

export const FIELDREQUIREDFIELD = "fieldrequired"

export class CActionData {

    private static FIELD: string = "FIELD"
    private static VALUE: string = "VALUE"
    private static ACTION: string = "ACTION"

    private field?: string
    private action?: string
    private value?: string
    private row: any
    private vars: any
    private emptyclose?: boolean

    constructor(row: any, vars?: any, field?: string, action?: string, value?: string) {
        this.field = field;
        this.action = action;
        this.value = value;
        this.row = row;
        this.vars = vars === undefined ? {} : vars;
    }

    setemptyClose() {
        this.emptyclose = true;
    }

    isemptyClose() {
        return this.emptyclose
    }

    setField(s: string) {
        this.field = s;
    }

    getField(): string {
        return this.field as string
    }

    getRow(): any {
        return this.row
    }

    getVars(): any {
        const cvars: any = { ...this.vars }
        if (this.field !== undefined) cvars[CActionData.FIELD] = this.field
        if (this.value !== undefined) cvars[CActionData.VALUE] = this.value
        if (this.action !== undefined) cvars[CActionData.ACTION] = this.action
        return cvars;
    }

    getData(): any {
        return { row: this.row, vars: this.getVars() }
    }

}

export interface IFormStateActions {
    focus?: string
    error?: II.IFieldMessage[]
}

export interface IActionCallBack {
    (t: II.ICallBackActionDef, c: CActionData): any
};

export interface IDispatchActionCallBack {
    (res: II.IDispatchFormRes, c: CActionData): void
};

export interface IOnClickButtonAction {
    (i: II.IClickButtonActionDef, c: CActionData): void
};

// =====================================
// form data definition
// =====================================

// single item

export interface IFieldItem {
    readonly field: string,
    readonly fieldname?: string,
    readonly fieldnamehelper?: II.TMess,
    readonly props?: InputBaseProps,
    readonly labelprops?: InputLabelProps,
    readonly beforefield?: II.ICallBackActionDef,
    readonly afterfield?: II.ICallBackActionDef,
}

// the whole form

export interface IFieldForm {
    readonly title?: string,
    readonly fields: IFieldItem[],
    readonly allreadonly?: boolean,
    readonly buttons?: II.IClickButtonActionDef[]
}


// =====================================