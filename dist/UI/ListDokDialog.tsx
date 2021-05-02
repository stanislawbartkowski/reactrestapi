import React, { FunctionComponent } from 'react';
import GridTable from './GridTable'
import * as I from '../js/I'


import ModalDialog from './ModalDialog'

const ListDokDialog: FunctionComponent<I.IGridTable> = ({ list, coldef, spec }) => {

    const onClose = () => {
        if (spec != null && spec.onClose != null) spec.onClose()
    }

    const title: string | undefined = (spec != null ? spec.title : undefined);

    return <ModalDialog title={title} onClose={onClose} >
        <GridTable list={list} coldef={coldef} spec={spec} />
    </ModalDialog>

}

export default ListDokDialog;