import React, { FunctionComponent } from 'react';
import ModalDialog from './ModalDialog'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import * as I from '../js/I';
import persstring from '../js/locale';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

interface FunctionComponentParam {
    spec: I.IFieldForm,
    value: any,
}

interface IFunctionComponentElem extends I.IFieldItem {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: any
}

const FormElem: FunctionComponent<IFunctionComponentElem> = ({ fieldname, fieldnamehelper, fieldtype, fieldrequired, handleChange, value }) => {

    const helper = fieldnamehelper == null ?
        null :
        <FormHelperText id="component-helper-text">{persstring(fieldnamehelper)}</FormHelperText>

    const ftype = (fieldtype == I.FieldType.INTEGER) ? "number" : "string";

    return <FormControl>
        <FormControl required={fieldrequired ? true : false} error >
            <InputLabel htmlFor="component-simple">{persstring(fieldname)} </InputLabel>
            <Input id="component-simple" value={value} type={ftype} onChange={handleChange} />
            {helper}
        </FormControl>

    </FormControl>

}


const FormDialog: FunctionComponent<FunctionComponentParam> = ({ spec, value }) => {
    const classes = useStyles();

    const [values, setName] = React.useState(value);

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

    const onClose  = () => {}

    return (
        <ModalDialog title={persstring(spec.title)} onClose={onClose}>

            <form className={classes.root} noValidate autoComplete="off">
                {spec.fields.map(e => (
                    <FormElem {...e} handleChange={createChangeValue(e.fieldid)} value={values[e.fieldid]} />
                ))
                }
            </form>
        </ModalDialog>

    );
}

export default FormDialog;