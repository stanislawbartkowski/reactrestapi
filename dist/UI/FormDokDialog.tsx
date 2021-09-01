import { FunctionComponent, useState, useRef } from 'react';
import { MutableRefObject } from 'react';
import * as I from '../js/I'
import * as C from '../js/C'
import FormDialog from './FormDialog'
import jsstring from '../js/locale';

import ModalDialog from './ModalDialog'


const FormDokDialog: FunctionComponent<I.IFieldFormDialog> = (props) => {

    const title: string | undefined = props.def.title == undefined ? undefined : jsstring(props.def.title);

    const [istate, setIState]: [I.IFormStateActions, React.Dispatch<I.IFormStateActions>] = useState({})

    const ref: MutableRefObject<any> = useRef({});

    //    let values = { ...props.data };

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

                if (res.formaction == undefined) return

                if (res.error != undefined) {
                    setIState({ error: res.error })
                    return
                }

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
        const res: I.IDispatchFormRes = C.ActionCallType(t) == I.ActionType.JSACTION ? C.ActionCallBack(t, c) : t.jsaction as I.IDispatchFormRes
        dispatch(res, c);
    }

    const verifyRequired = (c: I.CActionData): I.IDispatchFormRes | null => {
        const errorlist: I.IFieldMessage[] = [];
        props.def.fields.forEach(f => {
            if (f.props?.required) {
                const value: string = c.getRow()[f.field]
                if (C.isEmpty(value)) {
                    errorlist.push({ field: f.field, mess: { messid: I.FIELDREQUIREDFIELD } })
                }
            }
        })
        if (errorlist.length == 0) return null;
        c.setField(errorlist[0].field);
        return {
            action: I.TDISPATCHFORMACTION,
            error: errorlist,
            formaction: I.FORMACTIONNO,
            vars: c.getVars(),
            restid: "",
            pars: null
        }
    }

    const onClickButton = (i: I.IClickButtonActionDef) => {
        const c: I.CActionData = new I.CActionData(ref.current);
        if (i.checkrequired) {
            const res: I.IDispatchFormRes | null = verifyRequired(c);
            if (res != null) {
                dispatch(res, c);
                return;
            }
        }
        actioncall(i, c);
    }

    const onClose = () => {
        // nothing
    }

    const changeValues = () => {
        setIState({});
    }

    return <ModalDialog title={title} buttons={props.def.buttons} onClickButton={onClickButton} onClose={onClose}>
        <FormDialog changeValues={changeValues} refe={ref} {...props} actioncallback={actioncall} istate={istate}> </FormDialog>
    </ModalDialog>

}

export default FormDokDialog;