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

interface IFunctionComponentElem extends I.IFieldItem {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    def: I.IFieldForm;
    value: any
}

const FormElem: FunctionComponent<IFunctionComponentElem> = ({ def, field, fieldname, fieldnamehelper, type, fieldrequired, fieldreadonly, handleChange, value }) => {

    const helper = fieldnamehelper == null ?
        null :
        <FormHelperText id="component-helper-text">{jsstring(fieldnamehelper)}</FormHelperText>

    return <FormControl>
        <FormControl required={fieldrequired ? true : false} error disabled={fieldreadonly || def.allreadonly ? true : false} >
            <InputLabel htmlFor="component-simple">{C.compString(field, fieldname)} </InputLabel>
            <Input id="component-simple" value={value} type={type} onChange={handleChange} />
            {helper}
        </FormControl>

    </FormControl>

}


const FormDialog: FunctionComponent<I.IFieldFormDialog> = ({ def, data }) => {
    const classes = useStyles();

    const [values, setName] = React.useState(data);

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
            {def.fields.map(e => (
                <FormElem def={def} {...e} handleChange={createChangeValue(e.field)} value={values[e.field]} />
            ))
            }
        </form>

    );
}

export default FormDialog;