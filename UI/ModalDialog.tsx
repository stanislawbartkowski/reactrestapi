import React, { FunctionComponent } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

interface IPopUpDialog {
    handleClose: () => void,
    getOpen: () => boolean,
    title?: string
}

interface IModalDialog {
    title?: string
}

const PopUpDialog: FunctionComponent<IPopUpDialog> = ({ handleClose, getOpen, title, children }) => {

    const [open, setOpen] = React.useState(false);

    if (getOpen() && !open) setOpen(true);

    const handleCloseDial = () => {
        handleClose();
        setOpen(false);
    };

    return (
        <Dialog onClose={handleCloseDial} aria-labelledby="simple-dialog-title" open={open} >
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            { children}
        </Dialog>
    );
}


const ModialDialog: FunctionComponent<IModalDialog> = ({ title, children }) => {

    var open: boolean = true;

    const handleClose = () => {
        open = false;
    }

    const getOpen = (): boolean => {
        return open;
    }

    return <PopUpDialog title={title} handleClose={handleClose} getOpen={getOpen} children={children} />

}

export default ModialDialog;