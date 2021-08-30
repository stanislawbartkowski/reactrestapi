import React, { FunctionComponent } from 'react';
import * as C from '../../../../../js/C';
import * as I from '../../../../../js/I';
import * as pactions from '../../../../../store/pushstring/actions'
import GridTable from '../../../../../UI/GridTable'
import ListDokDialog from '../../../../../UI/ListDokDialog'
import { useDispatch } from 'react-redux';
import InLine from '../../../../../UI/InLine'
import { GridCellParams } from '@material-ui/data-grid';
import D from '../D'
import DTool from '../DToolAction'


interface IListGrid {
    listdata: I.IResourceResult;
    menuaction: pactions.IPushString;
    listdefdata: I.IResourceResult;
    slotid: I.SLOT,
    vars: object | null
}

function findElem(click: I.IRowAction[] | undefined, field: string): I.IRowAction | null {
    if (click == undefined) return null;
    const e: I.IRowAction | undefined = click.find(e => e.field == field)
    if (e == undefined) return null;
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
    const ident: I.IRowAction | undefined = listres.ident;
    const jstitle: string | undefined = listres.jstitle;
    const tools: I.IClickButtonActionDef[] | null = listres.tools;

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

    const jsAction = (a: I.IRowAction, param: GridCellParams): any => {
        return jsColAction(a.jsaction as string, param);
    }

    // is cell clickable
    const produceCellClickable = (clist: I.IRowAction[] | undefined, col: I.ITableCol) => {
        const a: I.IRowAction | null = findElem(clist, col.field);
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
    const produceOnCellClick = (clist: I.IRowAction[] | undefined, col: I.ITableCol) => {
        const a: I.IRowAction | null = findElem(clist, col.field);
        if (a == null) return null;
        return (jsaction: string, param: GridCellParams) => {
            const res: I.IDispatchRes = jsColAction(jsaction, param);
            if (res != null) D(dispatch, slotid, res);
        }
    }


    // cellTitle
    const produceCellString = (clist: I.IRowAction[] | undefined, col: I.ITableCol) => {
        const a: I.IRowAction | null = findElem(clist, col.field);
        if (a == null) return null;
        return (param: GridCellParams): string | null => {
            const mess: I.TMess = jsAction(a, param);
            if (!C.verifyString(mess)) return "error";
            return C.getString(mess);
        }
    }

    // ident
    const getIdent = (param: GridCellParams): number => {
        const row = getRow(param);
        return C.callJSRowFunction((ident as I.IRowAction).jsaction as string, row, vars);
    }

    // cellStyle
    const produceCellStyle = (clist: I.IRowAction[] | undefined, col: I.ITableCol) => {
        const a: I.IRowAction | null = findElem(clist, col.field);
        if (a == null) return undefined;
        return (param: GridCellParams): string => {
            return jsAction(a, param);
        }
    }

    const click: I.IRowAction[] | undefined = listres.click;
    const celltitle: I.IRowAction[] | undefined = listres.celltitle;
    const cellstyles: I.IRowAction[] | undefined = listres.style;
    const values: I.IRowAction[] | undefined = listres.value;

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
        const mtitle: I.TMess = C.callJSRowFunction(jstitle, vars as object, null);
        C.verifyString(mtitle);
        dialtitle = C.getString(mtitle) as string
    }

    const onClose = () => {
    }

    const toolOnRowAction = (action: I.IClickButtonActionDef, row: any) => {
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
