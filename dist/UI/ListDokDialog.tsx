import { FunctionComponent } from 'react';
import GridTable, { IGridTable } from './GridTable'

import ModalDialog from './ModalDialog'

const ListDokDialog: FunctionComponent<IGridTable> = ({ list, coldef, spec }) => {
    const title: string | undefined = (spec != null ? spec.title : undefined);

    return <ModalDialog title={title}>
        <GridTable list={list} coldef={coldef} spec={spec} />
    </ModalDialog>

}

export default ListDokDialog;