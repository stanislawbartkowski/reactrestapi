import { FunctionComponent } from 'react';
import { useSelector } from "react-redux";

import CircularProgress from '@mui/material/CircularProgress';

import * as C from '../../../../js/C'
import * as actions from '../../../../store/pushstring/actions'

const BusyIndication: FunctionComponent = () => {

    const menuaction: actions.IPushString = useSelector((state: any) => state.busyindicator);

    C.log("Busyinfocator " + menuaction.type);

    if (menuaction.type != actions.STRINGTYPE.BUSYINDICATOR) return (<div>aaaaa</div>);
    const btype: string = menuaction.vals as string;


    if (btype == actions.BUSYSTART) {
        C.log("Start busy indicator");
        return (
            <CircularProgress />
        )
    }
    else {
        C.log("Stop busy indicator");
        return null;
    }
}

export default BusyIndication;