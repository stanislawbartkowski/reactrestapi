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

export interface IResourceAppData {
    logo: string;
    appname: string;
}

export interface IResourceListData {
    res: any[];
}

export interface IResourceListMenu {
    menu: TMenuElem[];
}

export interface IResourceResult {
    type: RESOURCE,
    data: IRestTable | IResourceListData | IResourceListMenu | IResourceAppData | null,
    restid: string | null,
    js: string | null,
    vars: object | null
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
    click?: TRowAction[],
    jstitle?: string
}

export type TMenuElem = {
    id: string
    restid: string
}


export const TDISPATCHPOPUP: string = "POPUP"
export const TDISPATCHWARNING: string = "WARNING"

// popup dialog identifier to generate next
export enum SLOT {
    SLOTBASE, SLOT1, SLOT2
};


// string: either string only which means localize id or object

export type TMess = string | TStringParam | null;

export type TStringParam = {
    localize?: boolean,
    messid: string,
    params?: string[]
}

// dispatcher dat

export type TDispatchRes = {
    action: string,
    restid: string,
    pars: object,
    messid?: TMess,
    vars: object | null
}

// GridTable attributes
export interface IGridTableSpec {
    className?: string,
    title?: string,
    onClose? : () => void;
}

export interface IGridTable {
    list: any[],
    coldef: ITableCol[],
    spec?: IGridTableSpec
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