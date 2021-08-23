import React, { FunctionComponent } from 'react';
import * as I from '../js/I'
import FormDialog from './FormDialog'
import jsstring from '../js/locale';

import ModalDialog from './ModalDialog'
import { Title } from '@material-ui/icons';

const FormDokDialog: FunctionComponent<I.IFieldFormDialog> = (props) => {

    const title: string | undefined = props.def.title == undefined ? undefined : jsstring(props.def.title);

    return <ModalDialog title={title} buttons={props.def.buttons}>
        <FormDialog {...props} > </FormDialog>
    </ModalDialog>

}

export default FormDokDialog;