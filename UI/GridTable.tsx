import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar, GridBaseComponentProps, GridCellParams, GridToolbarContainer, GridDensitySelector } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';

import * as C from '../js/C'
import * as I from '../js/I'
import lstring from '../js/locale'

import gridstrings from '../js/gridlocale';

//super-app-theme--cell

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
        height: 750, width: '100%'
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

function CustomPagination(props: GridBaseComponentProps) {
    const { state, api } = props;

    return (
        <Pagination
            color="primary"
            page={state.pagination.page + 1}
            count={state.pagination.pageCount}
            onChange={(event, value) =>
                api.current.setPage(value - 1)
            }
        />
    );
}


const GridTable: FunctionComponent<IGridTable> = ({ list, coldef, spec }) => {

    const classes = useStyles();

    C.verifyColumns(coldef);

    const getHeader = (e: I.ITableCol): string => {
        return lstring(e.coltitle == null ? e.field + "_col" : e.coltitle);
    };

    const dlist: any[] =
        C.range(list.length).map(i => ({ id: i, ...list[i] }))

    const columns: any[] = coldef.map(
        e => ({ headerName: getHeader(e), ...e })
    );

    const onCellClick = (param: GridCellParams) => {
        coldef.forEach(e => {
            if (e.onCellClick != null && e.field == param.field) e.onCellClick(param);
        })
    }


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
            localeText={gridstrings}
            pagination
            page={0}
            components={{
                Toolbar: GridToolbar,
                Pagination: CustomPagination
            }} />
    </div>

}

export default GridTable;