import { FunctionComponent } from 'react';
import { useSelector } from "react-redux";

import Typography from '@mui/material/Typography';

import * as I from '../../../../js/I'
import * as C from '../../../../js/C'

const TopLabel: FunctionComponent = () => {

    const appdata: I.IResourceResult = useSelector((state: any) => state.appdata);

    if (appdata.type != I.RESOURCE.APPDATA) return null;

    const label: string = (appdata.data as I.IResourceAppData).appname;

    C.log(label);

    return (
        <Typography variant="h6" noWrap display="inline">
            {label}
        </Typography>
    )
}


export default TopLabel;