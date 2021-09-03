import { FunctionComponent, useState, useRef } from 'react';
import { MutableRefObject } from 'react';
import * as I from '../js/I'
import * as C from '../js/C'
import FormDialog from './FormDialog'
import jsstring from '../js/locale';

import ModalDialog from './ModalDialog'

const resclose: I.IDispatchFormRes = {
    action: I.TDISPATCHFORMACTION,
    formaction: I.FORMACTIONOK,
    vars: {},
    restid: "",
    pars: null,
    close: true
}

const FormDokDialog: FunctionComponent<I.IFieldFormDialog> = (props) => {

    const title: string | undefined = props.def.title == undefined ? undefined : jsstring(props.def.title);

    const [istate, setIState]: [I.IFormStateActions, React.Dispatch<I.IFormStateActions>] = useState({})

    const ref: MutableRefObject<any> = useRef();
    const modalref: MutableRefObject<any> = useRef();

    const dispatch: I.IDispatchActionCallBack = (res: I.IDispatchFormRes, c: I.CActionData) => {

        // empty object, do nothing
        if (C.isEmptyObject(res)) {
            if (!c.isemptyClose()) return;
            res = resclose;
        }

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

                let state: I.IFormStateActions = {}

                if (res.error != undefined) state = { ...state, error: res.error }
                if (res.focus != undefined) state = { ...state, focus: res.focus }

                if (res.close) {
                    modalref.current.closeDialog();
                    return
                }

                switch (res.formaction) {
                    case I.FORMACTIONNO:
                        if (res.focus == undefined) state = { ...state, focus: c.getField() }
                        setIState(state)
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
                    errorlist.push({ field: f.field, mess: I.FIELDREQUIREDFIELD })
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
        const c: I.CActionData = new I.CActionData(ref.current.getVars());
        if (i.checkrequired) {
            const res: I.IDispatchFormRes | null = verifyRequired(c);
            if (res != null) {
                dispatch(res, c);
                return;
            }
        }
        if (i.close) {
            dispatch(resclose, c);
            return;
        }
        c.setemptyClose();
        actioncall(i, c);
    }

    const onClose = () => {
    }

    const changeValues = () => {
        setIState({});
    }

    return <ModalDialog ref={modalref} title={title} buttons={props.def.buttons} onClickButton={onClickButton} onClose={onClose}>
        <FormDialog ref={ref} changeValues={changeValues} {...props} actioncallback={actioncall} istate={istate}> </FormDialog>
    </ModalDialog>

}

export default FormDokDialog;