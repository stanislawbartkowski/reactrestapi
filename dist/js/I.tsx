import { GridColDef, GridCellParams, GridComponentProps } from '@material-ui/data-grid';
import { InputBaseProps } from '@material-ui/core/InputBase'


export { }

// string: either string only which means localize id or object

export type TMess = string | TStringParam | null;

export type TStringParam = {
    readonly localize?: boolean,
    readonly messid: string,
    readonly params?: string[]
}

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


export const STANDARDOKBUTTON: string = "OK"
export const STANDARDACCEPTBUTTON: string = "ACCEPT"
export const STANDARDCANCELBUTTON: string = "CANCEL"


export type TClickButtonAction = {
    readonly actionid: string
    readonly rowchosen?: boolean
}

export interface IResourceAppData {
    readonly logo: string;
    readonly appname: string;
}

export interface IResourceListData {
    readonly res: object[];
}

export interface IResourceListMenu {
    readonly menu: TMenuElem[];
}

export interface IResourceResult {
    readonly type: RESOURCE,
    readonly data: IRestTable | IResourceListData | IResourceListMenu | IResourceAppData | IFieldForm | null,
    readonly restid: string | null,
    readonly js: string | null,
    readonly vars: object | null,
}

// column/cell definition passed to GridTable
//   colTitle: column title
//   onCellClick: action after clicking the cell
//   identCol: column identation
//   valueCol : custom cell value

export interface ITableCol {
    field: string,
    coltitle?: string,
    clickTRow: IRowAction | null,
    onCellClick: ((jsaction: string, param: GridCellParams) => void) | null,
    isCellClickable: (param: GridCellParams) => boolean,
    cellTitle: ((param: GridCellParams) => string | null) | null,
    identCol: ((param: GridCellParams) => number) | null,
    valueCol: ((param: GridCellParams) => string | null) | null
    props?: GridColDef
}

// action related to a single column/cell
//   field: field identifier
//   jsaction : js function to call
//   isaction: actions is available for that cell

export type ICallBackActionChoice = {
    readonly messid: TMess,
    readonly jsaction: string
}


export interface ICallBackAction {
    readonly jsaction: string | ICallBackActionChoice[]
    readonly isaction?: string
}

export interface IRowAction extends ICallBackAction {
    readonly field: string
}

// table list definition returned by rest/API getlist call
//   columns: list of columns
//   js : js code attached
//   ident: column to ident
//   style : style assigned to cell/column
//   value: custom get value

export interface IRestTable {
    readonly columns: ITableCol[],
    readonly js?: IRowAction,
    readonly ident?: IRowAction,
    readonly style?: IRowAction[],
    readonly value?: IRowAction[],
    readonly celltitle?: IRowAction[],
    readonly click?: IRowAction[],
    readonly jstitle?: string
    readonly tools: TClickButtonAction[] | null
    readonly props?: GridComponentProps
}

export type TMenuElem = {
    readonly id: string
    readonly messid?: string
    readonly restid: string
}


export const TDISPATCHPOPUP: string = "POPUP"
export const TDISPATCHWARNING: string = "WARNING"
export const TDISPATCHYESNO: string = "YESNO"
export const TDISPATCHFORMACTION: string = "FORM"

// popup dialog identifier to generate next
export enum SLOT {
    SLOTBASE, SLOT1, SLOT2, SLOT3
};


// dispatcher data

export interface IDispatchBase {
    readonly action: string,
    readonly restid: string,
    readonly pars: object | null,
    readonly messid?: TMess,
    readonly vars: object | null,
}

export interface IDispatchRes extends IDispatchBase {
    readonly datares?: IResourceListData
}

// GridTable attributes
export interface IGridTableSpec {
    readonly clickToolRow: (action: TClickButtonAction, row: any) => void;
    readonly className: string | null,
    readonly title?: string,
    readonly onClose: () => void,
    readonly tools: TClickButtonAction[] | null
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

export interface IFormStateActions {
    focus? : string
}

export interface IDispatchFormRes extends IDispatchBase {
    readonly formaction : string
    readonly confirm? : IDispatchFormRes
}

export interface ActionCallBack {
    (action: string, t: ICallBackAction, field: string, value: string, row: any, vars: any): any
};

export interface IFieldItem {
    readonly field: string,
    readonly fieldname?: string,
    readonly fieldnamehelper?: string,
    readonly props?: InputBaseProps,
    readonly beforefield?: ICallBackAction,
    readonly afterfield?: ICallBackAction,
}

export interface IFieldForm {
    readonly title?: string,
    readonly fields: IFieldItem[],
    readonly allreadonly?: boolean,
    readonly buttons?: TClickButtonAction[]
}

export interface IFieldFormDialog {
    def: IFieldForm,
    data: any,
}