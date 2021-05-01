import { GridColDef, GridCellParams } from '@material-ui/data-grid';


export { }

// important: enum different than any other enums
export enum RESOURCE {
    NOTHING, APPDATA, LEFTMENU, STRINGS,

    LISTRES, LISTRESDEF,
    LISTRESSLOT1, LISTRESDEFSLOT1,
    LISTRESSLOT2, LISTRESDEFSLOT2,
}

// general data returned by REST/API resource call

export interface IResourceResult {
    type: RESOURCE,
    data: IRestTable | object | null | any,
    restid: string | null,
    js: string | null
}

// column/cell definition passed to GridTable
//   colTitle: column title
//   onCellClick: action after clicking the cell
//   identCol: column identation
//   valueCol : custom cell value

export interface ITableCol extends GridColDef {
    coltitle?: string,
    onCellClick?: (param: GridCellParams) => void,
    isCellClickable: (param: GridCellParams) => boolean,
    cellTitle?: (param: GridCellParams) => string | null,
    identCol?: (param: GridCellParams) => number,
    valueCol?: (param: GridCellParams) => string | null
}

// action related to a single column/cell
//   field: field identifier
//   jsaction : js function to call
//   isaction: actions is available for that cell

export type TRowAction = {
    field: string,
    jsaction: string,
    isaction?: string
}


// table list definition returned by rest/API getlist call
//   columns: list of columns
//   js : js code attached
//   ident: column to ident
//   style : style assigned to cell/column
//   value: custom get value

export interface IRestTable {
    columns: ITableCol[],
    js?: TRowAction,
    ident?: TRowAction,
    style?: TRowAction[],
    value?: TRowAction[],
    celltitle?: TRowAction[],
    click?: TRowAction[]
}

export interface ITableSpec {
    className?: string,
    title?: string
}

export type TMenuElem = {
    id: string
    restid: string
}


export const TDISPATCHLISTSLOT1: string = "LISTSLOT1"
export const TDISPATCHLISTSLOT2: string = "LISTSLOT2"
export const TDISPATCHWARNING: string = "WARNING"


// string: either string only which means localize id or object

export type TMess = string | TStringParam | null;

export type TStringParam = {
    localize?: boolean,
    messid: string,
    params?: string[]
}

export type TDispatchRes = {
    action: string,
    restid: string,
    pars: Object,
    title?: TMess
}

// ----------------

export enum FieldType {
    STRING, INTEGER, DECIMAL
}

export interface IFieldItem {
    fieldid: string,
    fieldname: string,
    fieldnamehelper?: string,
    fieldtype?: FieldType,
    fieldrequired?: boolean
}

export interface IFieldForm {
    title: string,
    fields: IFieldItem[],
}