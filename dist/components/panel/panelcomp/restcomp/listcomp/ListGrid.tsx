import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { GridCellParams } from '@mui/x-data-grid';

import * as C from '../../../../../js/C';
import * as I from '../../../../../js/I';
import * as II from '../../../../../js/II';
import * as pactions from '../../../../../store/pushstring/actions'
import GridTable from '../../../../../UI/list/GridTable'
import ListDokDialog from '../../../../../UI/list/ListDokDialog'
import InLine from '../../../../../UI/InLine'
import D, { refreshTable } from '../D'
import DTool from '../DToolAction'


interface IListGrid {
    listdata: I.IResourceResult;
    menuaction: pactions.IPushString;
    listdefdata: I.IResourceResult;
    slotid: I.SLOT,
    vars?: object
}

function findElem(click: II.IRowAction[] | undefined, field: string): II.IRowAction | null {
    if (click == undefined) return null;
    const e: II.IRowAction | undefined = click.find(e => e.field == field)
    if (e == undefined) return null;
    C.verifyTRow(e);
    return e;
}


const ListGrid: FunctionComponent<IListGrid> = ({ listdata, menuaction, listdefdata, slotid, vars }) => {

    const dispatch = useDispatch();

    var actionid: string | undefined = menuaction.vals;

    if (actionid == null) return null;

    if (listdata.restid != actionid) return null;

    if (listdefdata.restid != actionid) return null;

    C.log("Menu action name " + actionid);

    const datalist: object[] = (listdata.data as II.IResourceListData).res as object[];
    const listres: I.IRestTable = listdefdata.data as I.IRestTable;
    const cols: I.ITableCol[] = listres.columns;
    const ident: II.IRowAction | undefined = listres.ident;
    const jstitle: string | undefined = listres.jstitle;
    const tools: II.IClickButtonActionDef[] | null = listres.tools;

    if (!C.verifyITableDef(listres)) return <div>Format error</div>

    const getRow = (param: GridCellParams): object => {
        const i = param.row.rowIndex;
        const row: object = param.row;
        if (row == null) {
            C.internalerrorlog("row:" + i + " cannot be null");
        }
        return row;
    }

    const jsColAction = (jsaction: string, param: GridCellParams): any => {
        const row = getRow(param);
        return C.callJSRowFunction(jsaction, row, vars);
    }

    const jsAction = (a: II.IRowAction, param: GridCellParams): any => {
        return jsColAction(a.jsaction as string, param);
    }

    // is cell clickable
    const produceCellClickable = (clist: II.IRowAction[] | undefined, col: I.ITableCol) => {
        const a: II.IRowAction | null = findElem(clist, col.field);
        return (param: GridCellParams) => {
            if (a == null) return false;
            if (a.jsaction == null) return false;
            if (a.isaction == null) return true;
            const row = getRow(param);
            const res = C.callJSRowFunction(a.isaction, row, vars);
            return res as boolean;
        }
    }

    // on cell click
    const produceOnCellClick = (clist: II.IRowAction[] | undefined, col: I.ITableCol) => {
        const a: II.IRowAction | null = findElem(clist, col.field);
        if (a == null) return null;
        return (jsaction: string, param: GridCellParams) => {
            const res: II.IDispatchListRes = jsColAction(jsaction, param);
            if (res != null) D(dispatch, slotid, res);
        }
    }


    // cellTitle
    const produceCellString = (clist: II.IRowAction[] | undefined, col: I.ITableCol) => {
        const a: II.IRowAction | null = findElem(clist, col.field);
        if (a == null) return null;
        return (param: GridCellParams): string | null => {
            const mess: II.TMess = jsAction(a, param);
            if (!C.verifyString(mess)) return "error";
            return C.getString(mess);
        }
    }

    // ident
    const getIdent = (param: GridCellParams): number => {
        const row = getRow(param);
        return C.callJSRowFunction((ident as II.IRowAction).jsaction as string, row, vars);
    }

    // cellStyle
    const produceCellStyle = (clist: II.IRowAction[] | undefined, col: I.ITableCol) => {
        const a: II.IRowAction | null = findElem(clist, col.field);
        if (a == null) return undefined;
        return (param: GridCellParams): string => {
            return jsAction(a, param);
        }
    }

    const click: II.IRowAction[] | undefined = listres.click;
    const celltitle: II.IRowAction[] | undefined = listres.celltitle;
    const cellstyles: II.IRowAction[] | undefined = listres.style;
    const values: II.IRowAction[] | undefined = listres.value;

    if (ident != null) C.verifyTRow(ident);

    cols.forEach(e => {
        if (e.props == undefined) e.props = { field: e.field }
        e.clickTRow = findElem(click, e.field);
        e.onCellClick = produceOnCellClick(click, e);
        e.isCellClickable = produceCellClickable(click, e);
        e.cellTitle = produceCellString(celltitle, e);
        if (ident != null && ident.field == e.field) e.identCol = getIdent
        e.props.cellClassName = produceCellStyle(cellstyles, e);
        e.valueCol = produceCellString(values, e);
        e.props.headerName = C.compString(e.field, e.coltitle);
    });

    const js = listdefdata.js;

    var dialtitle: string | undefined;

    if (jstitle != null) {
        const mtitle: II.TMess = C.callJSRowFunction(jstitle, vars as object, undefined);
        C.verifyString(mtitle);
        dialtitle = C.getString(mtitle) as string
    }

    const onClose = () => {
    }

    const toolOnRowAction = (action: II.IClickButtonActionDef, row: any) => {
        if (C.isStandardRefresh(action.actionid)) {
            refreshTable(slotid);
            return;
        }
        DTool(dispatch, slotid, actionid as string, cols, action, row);
    }

    const spec: I.IGridTableSpec = { title: dialtitle, onClose: onClose, className: null, clickToolRow: toolOnRowAction, tools: tools };
    const tabledef: I.IGridTable = { list: datalist, coldef: cols, spec: spec, props: listres.props }

    const component = (slotid == I.SLOT.SLOTBASE) ? <GridTable {...tabledef} />
        : <ListDokDialog {...tabledef} />

    if (js == null)
        return component;
    else
        return <React.Fragment>
            <InLine js={js} />
            {component}
        </React.Fragment>
}

export default ListGrid;
