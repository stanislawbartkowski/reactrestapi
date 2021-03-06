import React, { ReactNode, forwardRef, ReactElement, useImperativeHandle } from 'react';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import * as II from '../js/II'
import ToolButton from './ToolButton'

interface IModalDialog {
    title?: string;
    onClose?: () => void;
    buttons?: II.IClickButtonActionDef[];
    onClickButton: (i: II.IClickButtonActionDef) => void;
    children?: ReactNode
}

interface IRefCall {
    closeDialog: () => void;
}

interface IPopUpDialog extends IModalDialog {
    getOpen: () => boolean
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const PopUpDialog = forwardRef<IRefCall, IPopUpDialog>((props, ref) => {

    const [open, setOpen] = React.useState(false);

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
        <BootstrapDialog onClose={onCloseDial} aria-labelledby="simple-dialog-title" open={open} maxWidth='lg' fullWidth >
            < BootstrapDialogTitle id="simple-dialog-title" onClose={onCloseDial}>
                {props.title}
            </ BootstrapDialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>

            {buttonsDialog}

        </BootstrapDialog>

    );
})

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

export default ModialDialog;