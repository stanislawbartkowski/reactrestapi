import React, { Dispatch, FunctionComponent } from 'react';
import * as C from '../../../../js/C';
import * as I from '../../../../js/I';
import * as pactions from '../../../../store/pushstring/actions'
import GridTable from '../../../../UI/GridTable'
import ListDokDialog from '../../../../UI/ListDokDialog'
import { useDispatch } from 'react-redux';
import InLine from '../../../../UI/InLine'
import { GridCellParams, GridCellClassParams } from '@material-ui/data-grid';
import lstring from '../../../../js/locale';
import * as D from './D'


interface IListGrid {
    listdata: I.IResourceResult;
    menuaction: pactions.IPushString;
    listdefdata: I.IResourceResult;
    slotid: I.SLOT,
    vars: object | null
}

function findElem(click: I.TRowAction[] | undefined, field: string): I.TRowAction | undefined {
    if (click == null) return undefined;
    const e: I.TRowAction | undefined = click.find(e => e.field == field)
    if (e == undefined) return undefined;
    C.verifyTRow(e);
    return e;
}


const ListGrid: FunctionComponent<IListGrid> = ({ listdata, menuaction, listdefdata, slotid, vars }) => {

    const dispatch = useDispatch();

    var actionid: string | null = menuaction.vals;

    if (actionid == null) return null;

    if (listdata.restid != actionid) return null;

    if (listdefdata.restid != actionid) return null;

    C.log("Menu action name " + actionid);

    const datalist: any[] = (listdata.data as I.IResourceListData).res;
    const listres: I.IRestTable = listdefdata.data as I.IRestTable;
    const cols: I.ITableCol[] = listres.columns;
    const ident: I.TRowAction | undefined = listres.ident;
    const jstitle: string | undefined = listres.jstitle

    const getRow = (param: GridCellParams): object => {
        const i = param.rowIndex;
//        const row: object = datalist[i];
        const row: object = param.row;
        if (row == null) {
            C.internalerrorlog("row:" + i + " cannot be null");
        }
        return row;
    }

    const jsColAction = (a: I.TRowAction, param: GridCellParams): any => {
        const row = getRow(param);
        const jsAction: string = a.jsaction;
        return C.callJSRowFunction(jsAction, row, vars);
    }

    // is cell clickable
    const produceCellClickable = (clist: I.TRowAction[] | undefined, col: I.ITableCol) => {
        const a: I.TRowAction | undefined = findElem(clist, col.field);
        return (param: GridCellParams) => {
            if (a == undefined) return false;
            if (a.jsaction == undefined) return false;
            if (a.isaction == undefined) return true;
            const row = getRow(param);
            const res = C.callJSRowFunction(a.isaction, row, vars);
            return res as boolean;
        }
    }

    // on cell click
    const produceOnCellClick = (clist: I.TRowAction[] | undefined, col: I.ITableCol) => {
        const a: I.TRowAction | undefined = findElem(clist, col.field);
        if (a == undefined) return undefined;
        return (param: GridCellParams) => {
            const res: I.TDispatchRes = jsColAction(a, param);
            D.dAction(dispatch, slotid, res);
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
        return C.callJSRowFunction((ident as I.TRowAction).jsaction, row, vars);
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

    var dialtitle: string | undefined = undefined;

    if (jstitle != undefined) {
        const mtitle: I.TMess = C.callJSRowFunction(jstitle, vars as object, null);
        C.verifyString(mtitle);
        dialtitle = C.getString(mtitle) as string
    }

    const onClose = () => {
    }

    const spec: I.IGridTableSpec = { title: dialtitle, onClose: onClose };

    const component = (slotid == I.SLOT.SLOTBASE) ? <GridTable list={datalist} coldef={cols} />
        : <ListDokDialog list={datalist} coldef={cols} spec={spec} />

    if (js == null)
        return component;
    else
        return <React.Fragment>
            <InLine js={js} />
            {component}
        </React.Fragment>
}

export default ListGrid;
