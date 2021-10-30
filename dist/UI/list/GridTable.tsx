import React, { FunctionComponent, ReactElement } from 'react';

//import { makeStyles } from '@mui/styles';
import { GridCellValue, DataGrid, GridCellParams, useGridApiContext, GridDensityTypes, GridColDef, useGridSelector,gridPaginationSelector, GridPaginationState } from '@mui/x-data-grid';
import { GridToolbarContainer, GridToolbarDensitySelector, GridComponentProps, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
import { MuiEvent } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DetailsIcon from '@mui/icons-material/Details';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles'

import * as C from '../../js/C'
import * as I from '../../js/I'
import * as II from '../../js/II'
import lstring from '../../js/locale'

import gridstrings from '../../js/gridlocale';
import ToolButton from '../ToolButton'

interface ICellClickable {
    readonly col: I.ITableCol,
    readonly params: GridCellParams
}

interface IToolParams {
    row?: object;
    readonly spec: I.IGridTableSpec,
}


interface ICustomTool {
    readonly toolparams: IToolParams,
    readonly toolspec: II.IClickButtonActionDef
}

const rowchosenRequired = (p: II.IClickButtonActionDef): boolean => {

    if (C.isStandardShow(p.actionid)) return true;
    if (C.isStandardAdd(p.actionid)) return false;
    if (C.isStandardRefresh(p.actionid)) return false;
    if (p.rowchosen == undefined) return true;
    return p.rowchosen;
}

const CustomTool: FunctionComponent<ICustomTool> = (props: ICustomTool) => {

    const onCellClick = (p: ICustomTool) => {
        if (p.toolparams.row == undefined && rowchosenRequired(p.toolspec)) {
            C.infoAlert(lstring("pickrowalert"));
            return;
        }
        p.toolparams.spec.clickToolRow(props.toolspec, p.toolparams.row);
    };

    return <ToolButton i={props.toolspec} onClick={() => onCellClick(props)} ></ToolButton>

}

const ToolBar: FunctionComponent<GridComponentProps> = (props: GridComponentProps) => {
    const t: IToolParams = (props as any).specprop;

    const customtool = (t.spec.tools == null) ? null :
        t.spec.tools.map(e => (
            <CustomTool toolparams={t} toolspec={e} />
        ))

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            {customtool}

        </GridToolbarContainer>
    )
}

/*
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
*/

function CustomPagination() {
    const apiRef = useGridApiContext();
//    apiRef.current.state
    const state : GridPaginationState = gridPaginationSelector(apiRef.current.state);
//    const paginationState = useGridSelector(apiRef, state);
  
    return (
      <Pagination
        count={state.pageCount}
        page={state.page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

const getCellValue = (col: I.ITableCol, params: GridCellParams): GridCellValue => {
    if (col.valueCol == null) return params.value;
    return col.valueCol(params);
}

const ListOfChoices: FunctionComponent<ICellClickable> = ({ col, params }) => {

    const onCellClick = (e: II.ICallBackActionChoice) => {
        if (col.onCellClick != null) col.onCellClick(e.jsaction, params);
    }

    return <List component="nav" > {
        ((col.clickTRow as II.IRowAction).jsaction as II.ICallBackActionChoice[]).map(e => (
            <ListItem button key={e.jsaction} onClick={(event) => onCellClick(e)}>
                <ListItemIcon>
                    <DetailsIcon />
                </ListItemIcon>
                <ListItemText>
                    {C.getString(e.messid)}
                </ListItemText>
            </ListItem>
        )
        )
    }
    </List>
}

const CellClickable: FunctionComponent<ICellClickable> = ({ col, params }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const onCellClick = () => {
        if (col.onCellClick != null) col.onCellClick((col.clickTRow as II.IRowAction).jsaction as string, params);
    }

    const handleClick = (event: any) => {
        if (C.ActionCallType(col.clickTRow as II.IRowAction) == II.ActionType.JSACTION) onCellClick()
        else setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <React.Fragment><Button variant="outlined" sx={{ width: '110%' }} onClick={handleClick} >
        {getCellValue(col, params)}
    </Button>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <ListOfChoices col={col} params={params} />
        </Popover>
    </React.Fragment>

}

const GridTable: FunctionComponent<I.IGridTable> = ({ list, coldef, spec, props }) => {

    C.verifyColumns(coldef);

    const getCellTitle = (col: I.ITableCol, params: GridCellParams): null | string => {
        if (col == null || col.cellTitle == null) return null;
        return col.cellTitle(params);
    };

    const constructRenderCell = (col: I.ITableCol) => {
        return (params: GridCellParams): ReactElement => {

            const cells: ReactElement = (!col.isCellClickable(params)) ? <div>{getCellValue(col, params)}</div> :
                <span><CellClickable col={col} params={params} /></span>

            const ident: number = col.identCol == null ? 0 : col.identCol(params);
            const cell: ReactElement = col.identCol == null ? cells :
                <span style={{ paddingLeft: 12 * ident }}>{cells}</span>


            const title = getCellTitle(col, params);
            if (title == null) return <React.Fragment> {cell} </React.Fragment>
            return <Tooltip title={title}>{cell}</Tooltip>
        }
    }

    const dlist: any[] =
        C.range(list.length).map(i => ({ id: i, ...list[i] }))

    // should be a copy of coldef
    const columns: GridColDef[] = coldef.map(e => ({ field: e.field, ...e.props }))

    columns.forEach(ele => {
        const e: I.ITableCol = coldef.find(e => e.field == ele.field) as I.ITableCol;
        if (e.onCellClick != null || e.valueCol != null || e.cellTitle != null || e.identCol != null) ele.renderCell = constructRenderCell(e);
    })

    const toolprop: IToolParams = { spec: spec };

    return <div style={{ minWidth: 650, height: 750, width: '100%' }}>
        <DataGrid {...props} rows={dlist} columns={columns} autoPageSize disableSelectionOnClick
            onCellClick={(params: GridCellParams, event: MuiEvent<React.MouseEvent>) => { toolprop.row = params.row }}
            // onCellOver={onCellOver}
            localeText={gridstrings}
            density={GridDensityTypes.Compact}
            pagination
            //            page={1}
            componentsProps={{ toolbar: { specprop: toolprop } }}
            components={{
                Toolbar: ToolBar,
                Pagination: CustomPagination
            }} />
    </div>

}

export default GridTable;