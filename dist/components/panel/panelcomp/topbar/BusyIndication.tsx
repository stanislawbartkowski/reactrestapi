import { FunctionComponent } from 'react';
import { useSelector } from "react-redux";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import * as C from '../../../../js/C'
import * as actions from '../../../../store/pushstring/actions'

const Circ: FunctionComponent = () => {
    return (
        <Box>
            <CircularProgress color="secondary" />
        </Box>
    );
}

const Linear: FunctionComponent = () => {
    return (
        <Stack sx={{ width: '2%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="secondary" />
            <LinearProgress color="success" />
            <LinearProgress color="inherit" />
        </Stack>
    );

}

const BusyIndication: FunctionComponent = () => {

    const menuaction: actions.IPushString = useSelector((state: any) => state.busyindicator);

    C.log("Busyinfocator " + menuaction.type);

    if (menuaction.type != actions.STRINGTYPE.BUSYINDICATOR) return null;
    const btype: string = menuaction.vals as string;


    if (btype == actions.BUSYSTART) {
        C.log("Start busy indicator");
        return (
            <Linear />
        )
    }
    else {
        C.log("Stop busy indicator");
        return null;
    }
}

export default BusyIndication;