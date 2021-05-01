import React, { Dispatch, FunctionComponent } from 'react';
import * as C from '../../../../js/C';
import * as I from '../../../../js/I';
import * as pactions from '../../../../store/pushstring/actions'
import GridTable from '../../../../UI/GridTable'
import ListDokDialog from '../../../../UI/ListDokDialog'
import { useDispatch } from 'react-redux';
import InLine from '../../../../UI/InLine'
import { GridCellParams, GridCellClassParams } from '@material-ui/data-grid';
import * as lactions from '../../../../store/getdata/actions'
import * as dactions from '../../../../store/getlistres/actions'
import lstring from '../../../../js/locale';
import * as D from './D'


interface IListGrid {
    listdata: I.IResourceResult;
    menuaction: pactions.IPushString;
    listdefdata: I.IResourceResult;
}

function findElem(click: I.TRowAction[] | undefined, field: string): I.TRowAction | undefined {
    if (click == null) return undefined;
    const e: I.TRowAction | undefined = click.find(e => e.field == field)
    if (e == undefined) return undefined;
    C.verifyTRow(e);
    return e;
}


const ListGrid: FunctionComponent<IListGrid> = ({ listdata, menuaction, listdefdata }) => {

    const dispatch = useDispatch();

    var actionid: string | null = menuaction.vals;

    if (listdata.restid != actionid) return null;

    if (listdefdata.restid != actionid) return null;

    C.log("Menu action name " + actionid);

    const datalist: any[] = listdata.data.res;
    const listres: I.IRestTable = listdefdata.data;
    const cols: I.ITableCol[] = listres.columns;
    const ident: I.TRowAction | undefined = listres.ident;

    const getRow = (param: GridCellParams): any => {
        const i = param.rowIndex;
        return datalist[i];
    }

    const jsColAction = (a: I.TRowAction, param: GridCellParams): any => {
        const row = getRow(param);
        const jsAction: string = a.jsaction;
        return C.callJSRowFunction(jsAction, row);
    }

    // is cell clickable
    const produceCellClickable = (clist: I.TRowAction[] | undefined, col: I.ITableCol) => {
        const a: I.TRowAction | undefined = findElem(clist, col.field);
        return (param: GridCellParams) => {
            if (a == undefined) return false;
            if (a.jsaction == undefined) return false;
            if (a.isaction == undefined) return true;
            const row = getRow(param);
            const res = C.callJSRowFunction(a.isaction, row);
            return res as boolean;
        }
    }

    // on cell click
    const produceOnCellClick = (clist: I.TRowAction[] | undefined, col: I.ITableCol) => {
        const a: I.TRowAction | undefined = findElem(clist, col.field);
        if (a == undefined) return undefined;
        return (param: GridCellParams) => {
            const res: I.TDispatchRes = jsColAction(a, param);
            D.dAction(dispatch, res);
        }
    }


    // cellTitle
    const produceCellString = (clist: I.TRowAction[] | undefined, col: I.ITableCol) => {
        const a: I.TRowAction | undefined = findElem(clist, col.field);
        if (a == undefined) return undefined;
        return (param: GridCellClassParams): string | null => {
            const mess: I.TMess = jsColAction(a, param);
            if (!C.verifyString(mess)) return "error";
            return C.getString(mess);
        }
    }

    // ident
    const getIdent = (param: GridCellParams): number => {
        const row = getRow(param);
        return C.callJSRowFunction((ident as I.TRowAction).jsaction, row);
    }

    // cellStyle
    const produceCellStyle = (clist: I.TRowAction[] | undefined, col: I.ITableCol) => {
        const a: I.TRowAction | undefined = findElem(clist, col.field);
        if (a == undefined) return undefined;
        return (param: GridCellClassParams): string => {
            return jsColAction(a, param);
        }
    }

    const click: I.TRowAction[] | undefined = listres.click;
    const celltitle: I.TRowAction[] | undefined = listres.celltitle;
    const cellstyles: I.TRowAction[] | undefined = listres.style;
    const values: I.TRowAction[] | undefined = listres.value;

    if (ident != null) C.verifyTRow(ident);

    cols.forEach(e => {
        e.onCellClick = produceOnCellClick(click, e);
        e.isCellClickable = produceCellClickable(click, e);
        e.cellTitle = produceCellString(celltitle, e);
        if (ident != null && ident.field == e.field) e.identCol = getIdent
        e.cellClassName = produceCellStyle(cellstyles, e);
        e.valueCol = produceCellString(values, e);
        e.headerName = (e.coltitle == null ? lstring(e.field + "_col") : C.getString(e.coltitle)) as string;
    });

    const js = listdefdata.js;

    const listtype = listdata.type

    const component = (listtype == I.RESOURCE.LISTRES) ? <GridTable list={datalist} coldef={cols} />
        : <ListDokDialog list={datalist} coldef={cols} />

    if (js == null)
        return component;
    else
        return <React.Fragment>
            <InLine js={js} />
            {component}
        </React.Fragment>
}

export default ListGrid;
