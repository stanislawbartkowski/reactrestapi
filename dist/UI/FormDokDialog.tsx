import { FunctionComponent, useState } from 'react';
import * as I from '../js/I'
import * as C from '../js/C'
import FormDialog from './FormDialog'
import jsstring from '../js/locale';

import ModalDialog from './ModalDialog'


const FormDokDialog: FunctionComponent<I.IFieldFormDialog> = (props) => {

    const title: string | undefined = props.def.title == undefined ? undefined : jsstring(props.def.title);

    const [istate, setIState] = useState({})

    let values = { ...props.data };

    const dispatch: I.IDispatchActionCallBack = (res: I.IDispatchFormRes, c: I.CActionData) => {

        // empty object, do nothing
        if (C.isEmptyObject(res)) return;

        C.verifyFormDispatcher(res)
        const mess: string | null = res.messid != undefined ? C.getString(res.messid as I.TMess) as string : null;
        switch (res.action) {

            case I.TDISPATCHWARNING:
                C.infoAlert(mess as string).then((prop: any) => {
                    if (res.confirm != undefined) dispatch(res.confirm, c)
                    return;
                })
                break;

            case I.TDISPATCHYESNO:
                C.confirmAlert(mess as string).then((prop: any) => {
                    if (res.confirm != undefined) dispatch(res.confirm, c)
                });
                break;

            case I.TDISPATCHFORMACTION:

                switch (res.formaction) {
                    case I.FORMACTIONNO:
                        setIState({ focus: c.getField() })
                        break;
                    case I.FORMATRESTGET:
                    case I.FORMATRESTPOST:
                        C.callRest(res, c, dispatch);
                        break;
                }
        }
    }

    const actioncall: I.IActionCallBack = (t: I.ICallBackActionDef, c: I.CActionData) => {
        const res: I.IDispatchFormRes = C.ActionCallBack(t, c);
        dispatch(res, c);
    }

    const onClickButton = (i: I.IClickButtonActionDef) => {
        actioncall(i, new I.CActionData(values));
    }

    return <ModalDialog title={title} buttons={props.def.buttons} onClickButton={onClickButton}>
        <FormDialog setvalues={(v) => { values = v }} {...props} actioncallback={actioncall} istate={istate}> se </FormDialog>
    </ModalDialog>

}

export default FormDokDialog;