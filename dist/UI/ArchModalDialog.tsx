// TODO: remove
import React, { ReactNode, forwardRef, ReactElement, useImperativeHandle } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { makeStyles} from '@mui/styles';
import { Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import * as II from '../js/II'
import ToolButton from './ToolButton'

const useStyles = makeStyles((theme: Theme)  => ({

    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

interface IPopUpDialog extends IModalDialog {
    getOpen: () => boolean
}

interface IModalDialog {
    title?: string;
    onClose?: () => void,
    buttons?: II.IClickButtonActionDef[]
    onClickButton: (i: II.IClickButtonActionDef) => void;
    children?: ReactNode
}

interface IRefCall {
    closeDialog: () => void;
}

const PopUpDialog = forwardRef<IRefCall, IPopUpDialog>((props, ref) => {

    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    if (props.getOpen() && !open) setOpen(true);

    const onCloseDial = () => {
        if (props.onClose !== undefined) props.onClose();
        setOpen(false);
    };

    useImperativeHandle(ref, () => ({
        closeDialog: () => { onCloseDial() }
    }));


    const buttonsDialog: ReactElement | null = props.buttons === undefined ? null :
        <DialogActions>
            {props.buttons.map(e => (<ToolButton i={e} onClick={props.onClickButton} ></ToolButton>))}
        </DialogActions>


    return (
        <Dialog className={classes.root} onClose={onCloseDial} aria-labelledby="simple-dialog-title" open={open} maxWidth='lg' fullWidth >
            <DialogTitle id="simple-dialog-title">{props.title}
                <IconButton aria-label="close" className={classes.closeButton} onClick={onCloseDial}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>

            {buttonsDialog}

        </Dialog>

    );
})


//const ModialDialog: ForwardRefRenderFunction<IRefCall, IModalDialog> = (props, ref) => {
const ModialDialog = forwardRef<IRefCall, IModalDialog>((props, ref) => {

    var open: boolean = true;

    const handleClose = () => {
        open = false;
        if (props.onClose !== undefined) props.onClose()
    }

    const getOpen = (): boolean => {
        return open;
    }

    return <PopUpDialog {...props} onClose={handleClose} getOpen={getOpen} ref={ref} />
});

//export default ModialDialog;