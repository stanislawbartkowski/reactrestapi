import React, { FunctionComponent, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridCellValue, DataGrid, GridToolbar, GridCellParams, useGridSlotComponentProps, GridDensityTypes, GridColDef } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Tooltip from '@material-ui/core/Tooltip'

import * as C from '../js/C'
import * as I from '../js/I'

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

    const getCellTitle = (col: I.ITableCol, params: GridCellParams): null | string => {
        if (col == undefined || col.cellTitle == null) return null;
        return col.cellTitle(params);
    };

    const getCellValue = (col: I.ITableCol, params: GridCellParams): GridCellValue => {
        if (col.valueCol == null) return params.value;
        return col.valueCol(params);
    }

    //    const isCellClickable = (col: I.ITableCol, params: GridCellParams): boolean {
    //        if (col.onCellClick == undefined) return false;
    //
    //    }

    const constructRenderCell = (col: I.ITableCol) => {
        return (params: GridCellParams): ReactElement => {

            const cells: ReactElement = (!col.isCellClickable(params)) ? <div>{getCellValue(col, params)}</div> :
                <div className={classes.rendercell}>
                    {getCellValue(col, params)}
                    <ArrowDownwardIcon className={classes.downicon} fontSize="small" color="action" />
                </div>

            const ident: number = col.identCol == null ? 0 : col.identCol(params);
            const cell: ReactElement = col.identCol == null ? cells :
                <span style={{ paddingLeft: 12 * ident }}>{cells}</span>


            const title = getCellTitle(col, params);
            if (title == undefined) return <React.Fragment> {cell} </React.Fragment>
            else
                return <Tooltip title={title}>{cell}</Tooltip>

        }
    }

    const dlist: any[] =
        C.range(list.length).map(i => ({ id: i, ...list[i] }))

    const onCellClick = (param: GridCellParams) => {
        const e: I.ITableCol = coldef.find(e => e.field == param.field) as I.ITableCol;
        if (!e.isCellClickable(param)) return;
        if (e.onCellClick != null) e.onCellClick(param);
    }

    // should be a copy of coldef
    const columns: GridColDef[] = coldef;

    columns.forEach(ele => {
        const e: I.ITableCol = coldef.find(e => e.field == ele.field) as I.ITableCol;
        if (e.onCellClick != null || e.valueCol != null || e.cellTitle != null || e.identCol != null) ele.renderCell = constructRenderCell(e);
    })

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