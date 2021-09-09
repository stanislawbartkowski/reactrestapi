import * as I from '../../js/I';
import * as II from '../../js/II';

export { }

// form and current data

export interface IFieldFormDialog {
    def: I.IFieldForm,
    data: any,
    refresh: () => void
}


export interface ICallBackFormElem {
    (t: II.ICallBackActionDef, field: string, action: string, value: any): void 
}

export interface IFormDialog extends IFieldFormDialog {
    actioncallback: ICallBackFormElem;
    istate: I.IFormStateActions;
    changeValues: () => void;
    children?: React.ReactNode;
}

export interface IFormElem extends I.IFieldItem {
    readonly readOnly? : boolean;
    readonly handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    readonly istate: I.IFormStateActions
    readonly value: any
    readonly actionelemcallback : ICallBackFormElem
}


