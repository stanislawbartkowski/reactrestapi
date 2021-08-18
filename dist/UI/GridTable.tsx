import React, { FunctionComponent, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridCellValue, DataGrid, GridToolbar, GridCellParams, useGridSlotComponentProps, GridDensityTypes, GridColDef } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Tooltip from '@material-ui/core/Tooltip'
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DetailsIcon from '@material-ui/icons/Details';

import * as C from '../js/C'
import * as I from '../js/I'

import gridstrings from '../js/gridlocale';

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

interface ICellClickable {
    readonly col: I.ITableCol,
    readonly params: GridCellParams
}

const getCellValue = (col: I.ITableCol, params: GridCellParams): GridCellValue => {
    if (col.valueCol == null) return params.value;
    return col.valueCol(params);
}

const ListOfChoices: FunctionComponent<ICellClickable> = ({ col, params }) => {

    const onCellClick = (e: I.TRowClickChoice) => {
        if (col.onCellClick != null) col.onCellClick(e.jsaction, params);
    }

    return <List component="nav" > {
        ((col.clickTRow as I.TRowAction).jsaction as I.TRowClickChoice[]).map(e => (
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
        if (col.onCellClick != null) col.onCellClick((col.clickTRow as I.TRowAction).jsaction as string, params);
    }

    const handleClick = (event: any) => {
        if (C.isSingleCallTRow(col.clickTRow as I.TRowAction)) onCellClick()
        else setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <div><Button variant="outlined" className={classes.rendercell} onClick={handleClick} >
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
    </div>
}

const GridTable: FunctionComponent<I.IGridTable> = ({ list, coldef, spec }) => {

    const classes = useStyles();

    C.verifyColumns(coldef);

    const getCellTitle = (col: I.ITableCol, params: GridCellParams): null | string => {
        if (col == null || col.cellTitle == null) return null;
        return col.cellTitle(params);
    };

    const constructRenderCell = (col: I.ITableCol) => {
        return (params: GridCellParams): ReactElement => {

            const cells: ReactElement = (!col.isCellClickable(params)) ? <div>{getCellValue(col, params)}</div> :
                <CellClickable col={col} params={params} />

            const ident: number = col.identCol == null ? 0 : col.identCol(params);
            const cell: ReactElement = col.identCol == null ? cells :
                <span style={{ paddingLeft: 12 * ident }}>{cells}</span>


            const title = getCellTitle(col, params);
            if (title == null) return <React.Fragment> {cell} </React.Fragment>
            else
                return <Tooltip title={title}>{cell}</Tooltip>

        }
    }

    const dlist: any[] =
        C.range(list.length).map(i => ({ id: i, ...list[i] }))

    // should be a copy of coldef
    const columns: GridColDef[] = coldef;

    columns.forEach(ele => {
        const e: I.ITableCol = coldef.find(e => e.field == ele.field) as I.ITableCol;
        if (e.onCellClick != null || e.valueCol != null || e.cellTitle != null || e.identCol != null) ele.renderCell = constructRenderCell(e);
    })

    return <div className={classes.table + ' ' + (spec != null ? spec.className : "")} >
        <DataGrid rows={dlist} columns={columns} autoPageSize disableSelectionOnClick
            // onCellClick={onCellClick}
            // onCellOver={onCellOver}
            localeText={gridstrings}
            density={GridDensityTypes.Compact}
            pagination
            //            page={1}
            components={{
                Toolbar: GridToolbar,
                Pagination: CustomPagination
            }} />
    </div>

}

export default GridTable;