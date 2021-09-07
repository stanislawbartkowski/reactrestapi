import React, { FunctionComponent, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridCellValue, DataGrid, GridCellParams, useGridSlotComponentProps, GridDensityTypes, GridColDef } from '@material-ui/data-grid';
import { GridToolbarContainer, GridToolbarDensitySelector, GridComponentProps, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from '@material-ui/data-grid';
import { MuiEvent } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import Tooltip from '@material-ui/core/Tooltip'
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DetailsIcon from '@material-ui/icons/Details';
import Button from '@material-ui/core/Button';

import * as C from '../js/C'
import * as I from '../js/I'
import * as II from '../js/II'
import lstring from '../js/locale'

import gridstrings from '../js/gridlocale';
import ToolButton from './ToolButton'

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
        width: '110%',
    },
    downicon: {
        float: 'right',
        paddingBottom: '0px'
    }
}
));

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
    const classes = useStyles();
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

    return <React.Fragment><Button variant="outlined" className={classes.rendercell} onClick={handleClick} >
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

    const classes = useStyles();

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

    return <div className={classes.table + ' ' + (spec != null ? spec.className : "")} >
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