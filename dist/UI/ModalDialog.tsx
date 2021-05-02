import React, { FunctionComponent } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as I from '../js/I'

const useStyles = makeStyles(theme => ({

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

interface IPopUpDialog {
    onClose: () => void,
    getOpen: () => boolean,
    title?: string
}

interface IModalDialog {
    title?: string;
    onClose: () => void,
}

const PopUpDialog: FunctionComponent<IPopUpDialog> = ({ onClose, getOpen, title, children }) => {

    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    if (getOpen() && !open) setOpen(true);

    const onCloseDial = () => {
        onClose();
        setOpen(false);
    };

    return (
        <Dialog className={classes.root} onClose={onCloseDial} aria-labelledby="simple-dialog-title" open={open} maxWidth='lg' fullWidth >
            <DialogTitle id="simple-dialog-title">{title}
                <IconButton aria-label="close" className={classes.closeButton} onClick={onCloseDial}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {children}
        </Dialog>

    );
}


const ModialDialog: FunctionComponent<IModalDialog> = ({ title, children, onClose }) => {

    var open: boolean = true;

    const handleClose = () => {
        onClose()
        open = false;
    }

    const getOpen = (): boolean => {
        return open;
    }

    return <PopUpDialog title={title} onClose={handleClose} getOpen={getOpen} children={children} />

}

export default ModialDialog;