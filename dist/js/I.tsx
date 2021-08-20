import { GridColDef, GridCellParams } from '@material-ui/data-grid';


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
}

// general data returned by REST/API resource call

export const STANDARDACTIONSHOW: string = "SHOW"

export type TClickButtonAction = {
    readonly actionid: string
}

export interface IResourceAppData {
    readonly logo: string;
    readonly appname: string;
}

export interface IResourceListData {
    readonly res: any[];
}

export interface IResourceListMenu {
    readonly menu: TMenuElem[];
}

export interface IResourceResult {
    readonly type: RESOURCE,
    readonly data: IRestTable | IResourceListData | IResourceListMenu | IResourceAppData | null,
    readonly restid: string | null,
    readonly js: string | null,
    readonly vars: object | null,
}

// column/cell definition passed to GridTable
//   colTitle: column title
//   onCellClick: action after clicking the cell
//   identCol: column identation
//   valueCol : custom cell value

export interface ITableCol extends GridColDef {
    coltitle: string,
    clickTRow: TRowAction | null,
    onCellClick: ((jsaction: string, param: GridCellParams) => void) | null,
    isCellClickable: (param: GridCellParams) => boolean,
    cellTitle: ((param: GridCellParams) => string | null) | null,
    identCol: ((param: GridCellParams) => number) | null,
    valueCol: ((param: GridCellParams) => string | null) | null
}

// action related to a single column/cell
//   field: field identifier
//   jsaction : js function to call
//   isaction: actions is available for that cell

export type TRowClickChoice = {
    readonly messid: TMess,
    readonly jsaction: string
}

export type TRowAction = {
    readonly field: string,
    readonly jsaction: string | TRowClickChoice[]
    readonly isaction?: string
}


// table list definition returned by rest/API getlist call
//   columns: list of columns
//   js : js code attached
//   ident: column to ident
//   style : style assigned to cell/column
//   value: custom get value

export interface IRestTable {
    readonly columns: ITableCol[],
    readonly js?: TRowAction,
    readonly ident?: TRowAction,
    readonly style?: TRowAction[],
    readonly value?: TRowAction[],
    readonly celltitle?: TRowAction[],
    readonly click?: TRowAction[],
    readonly jstitle?: string
    readonly tools: TClickButtonAction[] | null
}

export type TMenuElem = {
    readonly id: string
    readonly restid: string
}


export const TDISPATCHPOPUP: string = "POPUP"
export const TDISPATCHWARNING: string = "WARNING"

// popup dialog identifier to generate next
export enum SLOT {
    SLOTBASE, SLOT1, SLOT2
};


// dispatcher dat

export type TDispatchRes = {
    readonly action: string,
    readonly restid: string,
    readonly pars: object,
    readonly messid?: TMess,
    readonly vars: object | null
    readonly tools: object | null
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
}

// Resource type
export enum RESOURCETYPE {
    LIST, FORM
}

// ----------------

export enum FieldType {
    STRING, INTEGER, DECIMAL
}

export interface IFieldItem {
    readonly fieldid: string,
    readonly fieldname: string,
    readonly fieldnamehelper?: string,
    readonly fieldtype?: FieldType,
    readonly fieldrequired?: boolean
}

export interface IFieldForm {
    readonly title: string,
    readonly fields: IFieldItem[],
}