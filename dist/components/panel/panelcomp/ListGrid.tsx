import React, { FunctionComponent } from 'react';
import * as C from '../../../js/C';
import * as I from '../../../js/I';
import * as pactions from '../../../store/pushstring/actions'
import GridTable from '../../../UI/GridTable'
import ListDokDialog from '../../../UI/ListDokDialog'
import { useDispatch } from 'react-redux';
import InLine from '../../../UI/InLine'
import { GridCellParams } from '@material-ui/data-grid';
import * as lactions from '../../../store/getdata/actions'
import * as dactions from '../../../store/getlistres/actions'

interface IListGrid {
    listdata: I.IResourceResult;
    menuaction: pactions.IPushString;
    listdefdata: I.IResourceResult;
}

function findElem(click: I.TRowAction[], field: string): I.TRowAction | undefined {
    if (click == null) return undefined;
    return click.find(e => e.field == field)
}

const ListGrid: FunctionComponent<IListGrid> = ({ listdata, menuaction, listdefdata }) => {

    const dispatch = useDispatch();

    var actionid: string | null = menuaction.vals;

    if (listdata.restid != actionid) return null;

    if (listdefdata.restid != actionid) return null;

    C.log("Menu action name " + actionid);

    const datalist: any[] = listdata.data.res;
    const cols: I.ITableCol[] = listdefdata.data.columns;

    const jsAction = (clist: I.TRowAction[], param: GridCellParams): any => {
        const i = param.rowIndex;
        const row = datalist[i]
        const jsAction: string = (findElem(clist, param.field) as I.TRowAction).jsaction;
        const clickaction = new Function('p', "return " + jsAction + "(p)");
        return clickaction(row);
    }


    const onCellClick = (param: GridCellParams) => {
        const res: I.TDispatchRes = jsAction(click, param);
        C.verifyDispatcher(res)
        dispatch(pactions.pushstring(pactions.STRINGTYPE.LISTACTIONSPECID, res.restid));
        dispatch(lactions.resourceRead(I.RESOURCE.LISTRESSPEC, res.restid, res.pars));
        dispatch(dactions.resourceListDefRead(I.RESOURCE.LISTRESDEFSPEC, res.restid, res.restid));
    }

    const cellTitle = (param: GridCellParams): string => {
        const mess: I.TTitleParam = jsAction(title, param);
        C.verifyTitle(mess);
        return C.titleString(mess);
    }

    const click: I.TRowAction[] = listdefdata.data.click;
    const title: I.TRowAction[] = listdefdata.data.title;

    cols.forEach(e => {
        if (findElem(click, e.field)) e.onCellClick = onCellClick;
        if (findElem(title, e.field)) e.cellTitle = cellTitle;
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
