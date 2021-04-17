import { GridColDef, GridCellParams } from '@material-ui/data-grid';


export { }

// important: enum different than any other enums
export enum RESOURCE {
    NOTHING,APPDATA,LEFTMENU, STRINGS,

    LISTRES, LISTRESDEF,
    LISTRESSPEC,LISTRESDEFSPEC
}

export interface IResourceResult {
    type: RESOURCE,
    data: object | null | any,
    restid : string | null,
    js : string | null
}

export interface ITableCol extends GridColDef {
    coltitle?: string,
    onCellClick?: (param: GridCellParams) => void
}

export interface ITableSpec {
    className?: string,
    title?: string
}

export type TMenuElem = {
    id: string
    restid: string
}

export const TDISPATCHLISTELEM : string = "LISTSPEC"

export type TDispatchRes = {
    action : string,
    restid : string,
    pars : Object
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