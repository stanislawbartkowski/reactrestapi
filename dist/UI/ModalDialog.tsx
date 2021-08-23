import React, { ReactElement, FunctionComponent } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import * as I from '../js/I'
import ToolButton from './ToolButton'

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

interface IPopUpDialog extends IModalDialog {
    getOpen: () => boolean
}

interface IModalDialog {
    title?: string;
    onClose?: () => void,
    buttons?: I.TClickButtonAction[]
}

const PopUpDialog: FunctionComponent<IPopUpDialog> = ({ buttons, onClose, getOpen, title, children }) => {

    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    if (getOpen() && !open) setOpen(true);

    const onCloseDial = () => {
        if (onClose != undefined) onClose();
        setOpen(false);
    };

    const onClick = () => { }

    const buttonsDialog: ReactElement | null = buttons == undefined ? null :
        <DialogActions>
            {buttons.map(e => (<ToolButton i={e} onClick={onClick}></ToolButton>))}
        </DialogActions>


    return (
        <Dialog className={classes.root} onClose={onCloseDial} aria-labelledby="simple-dialog-title" open={open} maxWidth='lg' fullWidth >
            <DialogTitle id="simple-dialog-title">{title}
                <IconButton aria-label="close" className={classes.closeButton} onClick={onCloseDial}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>

            {buttonsDialog}

        </Dialog>

    );
}


const ModialDialog: FunctionComponent<IModalDialog> = ({ buttons, title, children, onClose }) => {

    var open: boolean = true;

    const handleClose = () => {
        if (onClose != undefined) onClose()
        open = false;
    }

    const getOpen = (): boolean => {
        return open;
    }

    return <PopUpDialog buttons={buttons} title={title} onClose={handleClose} getOpen={getOpen} children={children} />

}

export default ModialDialog;