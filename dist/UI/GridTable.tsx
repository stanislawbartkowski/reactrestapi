import React, { FunctionComponent, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar, GridCellParams, useGridSlotComponentProps, GridDensityTypes, GridColDef } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Tooltip from '@material-ui/core/Tooltip'

import * as C from '../js/C'
import * as I from '../js/I'
import lstring from '../js/locale'

import gridstrings from '../js/gridlocale';

//super-app-theme--cell

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
        height: 750, width: '100%',
        '& .stylebold': {
            fontSize: theme.typography.fontSize * 1.3,
            fontWeight: theme.typography.fontWeightBold,
        },

    },
    rendercell: {
        width: '100%',
    },
    downicon: {
        float: 'right',
        paddingBottom: '0px'
    }
}
));


export interface IGridTable {
    list: any[],
    coldef: I.ITableCol[],
    spec?: I.ITableSpec,
}


//const ToolBar: FunctionComponent<BaseComponentProps> = (props: BaseComponentProps) => {
//    return <GridToolbarContainer>
//        <DensitySelector />
//    </GridToolbarContainer>

//}

function CustomPagination() {
    const { state, apiRef } = useGridSlotComponentProps();

    return (
        <Pagination
            color="primary"
            count={state.pagination.pageCount}
            page={state.pagination.page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}

const GridTable: FunctionComponent<IGridTable> = ({ list, coldef, spec }) => {

    const classes = useStyles();

    C.verifyColumns(coldef);

    const getHeader = (e: I.ITableCol): string => {
        return lstring(e.coltitle == null ? e.field + "_col" : e.coltitle);
    };

    const getCellTitle = (params: GridCellParams): null | string => {
        const col: I.ITableCol | undefined = coldef.find(e => e.field == params.field);
        if (col == undefined || col.cellTitle == null) return null;
        return col.cellTitle(params);
    };

    const renderTitleCell = (params: GridCellParams) => {
        const title = getCellTitle(params) as string;
        return <Tooltip title={title}>
            <div>{params.value}</div>
        </Tooltip>
    }

    const renderCell = (params: GridCellParams): ReactElement => {
        const cell: ReactElement = <div className={classes.rendercell}>
            {params.value}
            <ArrowDownwardIcon className={classes.downicon} fontSize="small" color="action" />
        </div>
        const title = getCellTitle(params)
        if (title == null) return <React.Fragment> {cell} </React.Fragment>
        else
            return <Tooltip title={title}>{cell}</Tooltip>
    }


    function createidentRenderCell(fun: (param: GridCellParams) => number): (params: GridCellParams) => ReactElement {

        return (params: GridCellParams): ReactElement => {
            const ident: number = fun(params);
            return <span style={{ paddingLeft: 12 * ident }}>{params.value}</span>
        }
    }

    const dlist: any[] =
        C.range(list.length).map(i => ({ id: i, ...list[i] }))

    const columns: GridColDef[] = coldef.map(
        e => ({ headerName: getHeader(e), ...e })
    );

    const onCellClick = (param: GridCellParams) => {
        coldef.forEach(e => {
            if (e.onCellClick != null && e.field == param.field) e.onCellClick(param);
        })
    }


    columns.forEach(ele => {
        coldef.forEach(e => {
            if (e.onCellClick != null && e.field == ele.field) ele.renderCell = renderCell;
            if (e.onCellClick == null && e.cellTitle != null && e.field == ele.field) ele.renderCell = renderTitleCell;
            if (e.identCol != null && e.field == ele.field) ele.renderCell = createidentRenderCell(e.identCol);
        })
    })


    //    const onCellOver = (param: GridCellParams,event: React.MouseEvent) => {
    //        coldef.forEach(e => {
    //            if (e.onCellClick != null && e.field == param.field) C.log("over")
    //        })

    //    }


    //    export function setCellClick(listc: I.ITableCol[], field: string, onCellClick: (param: GridCellParams) => void) {
    //        const c: I.ITableCol | undefined = listc.find(e => e.field == field);
    //        if (c == undefined) {
    //            cannotfindError(setCellClick.name, field);
    //            return;
    //        }
    //        c.onCellClick = onCellClick;
    //    }


    return <div className={classes.table + ' ' + (spec != null ? spec.className : "")} >
        <DataGrid rows={dlist} columns={columns} autoPageSize disableSelectionOnClick
            onCellClick={onCellClick}
            //            onCellOver={onCellOver}
            localeText={gridstrings}
            density={GridDensityTypes.Compact}
            pagination
            page={0}
            components={{
                Toolbar: GridToolbar,
                Pagination: CustomPagination
            }} />
    </div>

}

export default GridTable;