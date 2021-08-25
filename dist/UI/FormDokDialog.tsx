import { FunctionComponent, useState } from 'react';
import * as I from '../js/I'
import * as C from '../js/C'
import FormDialog from './FormDialog'
import jsstring from '../js/locale';

import ModalDialog from './ModalDialog'


const FormDokDialog: FunctionComponent<I.IFieldFormDialog> = (props) => {

    const title: string | undefined = props.def.title == undefined ? undefined : jsstring(props.def.title);

    const [istate, setIState] = useState({})

    const dispatch = (field: string, res: I.IDispatchFormRes) => {
        C.verifyFormDispatcher(res)
        const mess: string | null = res.messid != undefined ? C.getString(res.messid as I.TMess) as string : null;
        if (res.action == I.TDISPATCHWARNING) {
            C.infoAlert(mess as string).then((prop: any) => {
                if (res.confirm != undefined) dispatch(field, res.confirm)
                return;
            });
        }
        if (res.action == I.TDISPATCHYESNO) {
            C.confirmAlert(mess as string).then((prop: any) => {
                if (res.confirm != undefined) dispatch(field, res.confirm)
            });
            return;
        }
        if (res.formaction == I.FORMACTIONNO) {
            setIState({ focus: field })
        }
    }

    const actioncall: I.ActionCallBack = (...args) => {
        const res: I.IDispatchFormRes = C.ActionCallBack(...args);
        const field: string = args[2]
        dispatch(field, res);
    }

    return <ModalDialog title={title} buttons={props.def.buttons}>
        <FormDialog {...props} actioncallback={actioncall} istate={istate}> </FormDialog>
    </ModalDialog>

}

export default FormDokDialog;