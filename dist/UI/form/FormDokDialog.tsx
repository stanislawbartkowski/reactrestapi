import { FunctionComponent, useState, useRef } from 'react';
import { MutableRefObject } from 'react';
import * as I from '../../js/I'
import * as II from '../../js/II'
import * as C from '../../js/C'
import * as F from './F'
import FormDialog from './FormDialog'
import jsstring from '../../js/locale';

import ModalDialog from '../ModalDialog'

const resclose: II.IDispatchFormRes = {
    action: I.FORMACTIONNO,
    vars: {},
    close: true
}

const FormDokDialog: FunctionComponent<F.IFieldFormDialog> = (props) => {

    const title: string | undefined = props.def.title === undefined ? undefined : jsstring(props.def.title);

    const [istate, setIState]: [I.IFormStateActions, React.Dispatch<I.IFormStateActions>] = useState({})

    const ref: MutableRefObject<any> = useRef();
    const modalref: MutableRefObject<any> = useRef();

    const dispatch: I.IDispatchActionCallBack = (res: II.IDispatchFormRes, c: I.CActionData) => {

        if (res.refresh) props.refresh();

        // empty object, do nothing
        if (C.isEmptyObject(res)) {
            if (!c.isemptyClose()) return;
            res = resclose;
            // RISKY, requires attention, refresh every time is close as empty
            props.refresh();
        }

        C.verifyFormDispatcher(res)
        const mess: string | null = res.messid !== undefined ? C.getString(res.messid as II.TMess) as string : null;
        switch (res.action) {

            case I.TDISPATCHWARNING:
                C.infoAlert(mess as string).then((prop: any) => {
                    if (res.confirm !== undefined) dispatch(res.confirm, c)
                    return;
                })
                break;

            case I.TDISPATCHYESNO:
                C.confirmAlert(mess as string).then((prop: any) => {
                    if (res.confirm !== undefined) dispatch(res.confirm, c)
                });
                break;

            case I.FORMACTIONNO:
            case I.FORMATRESTGET:
            case I.FORMATRESTPOST:

                let state: I.IFormStateActions = {}

                if (res.error !== undefined) state = { ...state, error: res.error }
                if (res.focus !== undefined) state = { ...state, focus: res.focus }

                if (res.close) {
                    modalref.current.closeDialog();
                    return
                }

                switch (res.action) {
                    case I.FORMACTIONNO:
                        if (res.focus === undefined) state = { ...state, focus: c.getField() }
                        setIState(state)
                        break;
                    case I.FORMATRESTGET:
                    case I.FORMATRESTPOST:
                        C.callRest(res, c, dispatch);
                        break;
                }
        }
    }

    const actioncall = (t: II.ICallBackActionDef, c: I.CActionData) => {
        const res: II.IDispatchFormRes = C.ActionCallType(t) == II.ActionType.JSACTION ? C.ActionCallBack(t, c) : t.jsaction as II.IDispatchFormRes
        dispatch(res, c);
    }

    const actionelembackcall: F.ICallBackFormElem = (t: II.ICallBackActionDef, field: string, action: string, value: any) => {
        const c: I.CActionData = new I.CActionData(ref.current.getVars(), undefined, field, action, value);
        actioncall(t, c);
    }

    const verifyRequired = (c: I.CActionData): II.IDispatchFormRes | null => {
        const errorlist: II.IFieldMessage[] = [];
        props.def.fields.forEach(f => {
            if (f.props?.required) {
                const value: string = c.getRow()[f.field]
                if (C.isEmpty(value)) {
                    errorlist.push({ field: f.field, mess: I.FIELDREQUIREDFIELD })
                }
            }
        })
        if (errorlist.length === 0) return null;
        c.setField(errorlist[0].field);
        return {
            action: I.FORMACTIONNO,
            error: errorlist,
            vars: c.getVars()
        }
    }

    const onClickButton = (i: II.IClickButtonActionDef) => {
        const c: I.CActionData = new I.CActionData(ref.current.getVars());
        if (i.checkrequired) {
            const res: II.IDispatchFormRes | null = verifyRequired(c);
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
        <FormDialog
            ref={ref}
            changeValues={changeValues}
            {...props}
            actioncallback={actionelembackcall}
            istate={istate}>
        </FormDialog>
    </ModalDialog>

}

export default FormDokDialog;