import React, { forwardRef, useImperativeHandle } from 'react';

import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

import FormElem from './FormElem';
import * as F from './F'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);


interface IRefCall {
    getVars: () => any;
}

const FormDialog = forwardRef<IRefCall, F.IFormDialog>((props, ref) => {
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
                <FormElem
                    {...e}
                    istate={props.istate}
                    actionelemcallback={props.actioncallback}
                    handleChange={createChangeValue(e.field)}
                    value={values[e.field]}
                    readOnly={props.def.allreadonly ? true : undefined}
                />
            ))
            }
        </form>

    );
})

export default FormDialog;