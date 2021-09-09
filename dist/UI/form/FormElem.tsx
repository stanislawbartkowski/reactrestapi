import { FunctionComponent } from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import * as I from '../../js/I';
import * as II from '../../js/II';
import * as C from '../../js/C';
import * as F from './F'

const FormElem: FunctionComponent<F.IFormElem> = (props) => {

    const error: II.IFieldMessage | undefined = props.istate.error == undefined ? undefined : props.istate.error.find(e => e.field == props.field);

    const helper = props.fieldnamehelper == null && error == undefined ?
        null :
        <FormHelperText id="component-helper-text">{C.getString(error != undefined ? error.mess : props.fieldnamehelper as II.TMess)}</FormHelperText>

    const beforeafterfield = (props: F.IFormElem, action: string, i: II.ICallBackActionDef) => {
        if (i.notempty && C.isEmpty(props.value)) return;
        props.actionelemcallback(i, props.field, action, props.value);
    }


    return <FormControl
        onFocus={props.beforefield == undefined ? undefined : () => beforeafterfield(props, I.BEFOREFIELD, props.beforefield as II.ICallBackActionDef)}
        onBlur={props.afterfield == undefined ? undefined : () => beforeafterfield(props, I.AFTERFIELD, props.afterfield as II.ICallBackActionDef)}
    >
        <InputLabel htmlFor={props.field} {...props.labelprops} error={error != undefined}>{C.compString(props.field, props.fieldname)}</InputLabel>
        <Input
            error={error != undefined}
            inputRef={(input) => { if (input != null && props.istate.focus == props.field) input.focus(); }}
            id={props.field}
            value={props.value}
            readOnly={props.readOnly ? true : undefined}
            {...props.props}
            onChange={props.handleChange} />
        {helper}
    </FormControl>
}

export default FormElem;
