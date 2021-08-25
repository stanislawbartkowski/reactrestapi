import React, { FunctionComponent } from 'react';
import ModalDialog from './ModalDialog'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import * as I from '../js/I';
import * as C from '../js/C';
import jsstring from '../js/locale';


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
    actioncallback: I.ActionCallBack,
    istate: I.IFormStateActions

}

const FormElem: FunctionComponent<IFormElem> = (props) => {

    const helper = props.fieldnamehelper == null ?
        null :
        <FormHelperText id="component-helper-text">{jsstring(props.fieldnamehelper)}</FormHelperText>

    const beforeafterfield = (props: IFormElem, action: string, i: I.ICallBackAction) => {
        props.def.actioncallback(action, i, props.field, props.value, props.values, {})
    }

    return <FormControl
        onFocus={props.beforefield == undefined ? undefined : () => beforeafterfield(props, I.BEFOREFIELD, props.beforefield as I.ICallBackAction)}
        onBlur={props.afterfield == undefined ? undefined : () => beforeafterfield(props, I.AFTERFIELD, props.afterfield as I.ICallBackAction)}
    >
        <InputLabel htmlFor={props.field}>{C.compString(props.field, props.fieldname)} </InputLabel>
        <Input
            inputRef={(input) => { if (input != null && props.def.istate.focus == props.field) input.focus(); }}
            id={props.field}
            value={props.value}
            readOnly={props.def.def.allreadonly ? true : props.props?.readOnly}
            {...props.props}
            onChange={props.handleChange} />
        {helper}
    </FormControl>
}

const FormDialog: FunctionComponent<IFormDialog> = (props) => {
    const classes = useStyles();

    const [values, setName] = React.useState(props.data);

    function createChangeValue(id: string): (event: React.ChangeEvent<HTMLInputElement>) => void {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const nvalues = { ...values };
            nvalues[id] = event.target.value;
            setName(nvalues);
        }

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(values);
    };

    const onClose = () => { }

    const title: string = "title"

    return (

        <form className={classes.root} noValidate autoComplete="off">
            {props.def.fields.map(e => (
                <FormElem def={props} {...e} handleChange={createChangeValue(e.field)} value={values[e.field]} values={values} />
            ))
            }
        </form>

    );
}

export default FormDialog;