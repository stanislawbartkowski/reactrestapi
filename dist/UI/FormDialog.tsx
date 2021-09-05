import React, { FunctionComponent,forwardRef, useImperativeHandle } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import * as I from '../js/I';
import * as II from '../js/II';
import * as C from '../js/C';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

interface IFormElem extends I.IFieldItem {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    def: IFormDialog
    value: any
    values: any
}

interface IFormDialog extends I.IFieldFormDialog {
    actioncallback: I.IActionCallBack,
    istate: I.IFormStateActions
    changeValues: () => void
    children?: React.ReactNode
}

const FormElem: FunctionComponent<IFormElem> = (props) => {

    const error: II.IFieldMessage | undefined = props.def.istate.error == undefined ? undefined : props.def.istate.error.find(e => e.field == props.field);

    const helper = props.fieldnamehelper == null && error == undefined ?
        null :
        <FormHelperText id="component-helper-text">{C.getString(error != undefined ? error.mess : props.fieldnamehelper as II.TMess)}</FormHelperText>

    const beforeafterfield = (props: IFormElem, action: string, i: II.ICallBackActionDef) => {
        if (i.notempty && C.isEmpty(props.value)) return;
        props.def.actioncallback(i, new I.CActionData(props.values, undefined, props.field, action, props.value));
    }


    return <FormControl
        onFocus={props.beforefield == undefined ? undefined : () => beforeafterfield(props, I.BEFOREFIELD, props.beforefield as II.ICallBackActionDef)}
        onBlur={props.afterfield == undefined ? undefined : () => beforeafterfield(props, I.AFTERFIELD, props.afterfield as II.ICallBackActionDef)}
    >
        <InputLabel htmlFor={props.field} {...props.labelprops} error={error != undefined}>{C.compString(props.field, props.fieldname)}</InputLabel>
        <Input
            error={error != undefined}
            inputRef={(input) => { if (input != null && props.def.istate.focus == props.field) input.focus(); }}
            id={props.field}
            value={props.value}
            readOnly={props.def.def.allreadonly ? true : props.props?.readOnly}
            {...props.props}
            onChange={props.handleChange} />
        {helper}
    </FormControl>
}

interface IRefCall {
    getVars: () => any;
}



//const FormDialog: FunctionComponent<IFormDialog> = (props) => {

 const FormDialog = forwardRef<IRefCall,IFormDialog> ((props,ref) => {
        const classes = useStyles();

    const [values, setValues]: [any, React.Dispatch<any>] = React.useState(props.data);

    function createChangeValue(id: string): (event: React.ChangeEvent<HTMLInputElement>) => void {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const nvalues = { ...values };
            nvalues[id] = event.target.value;
            setValues(nvalues);
            props.changeValues();
        }
    }
    const title: string = "title"

    useImperativeHandle(ref, () => ({
        getVars: () => { return values }
    }));


    return (

        <form className={classes.root} noValidate autoComplete="off">
            {props.def.fields.map(e => (
                <FormElem def={props} {...e} handleChange={createChangeValue(e.field)} value={values[e.field]} values={values} />
            ))
            }
        </form>

    );
})

export default FormDialog;