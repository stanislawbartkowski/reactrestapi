import React, { FunctionComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from "react-redux";

import * as I from '../../../../js/I'
import * as C from '../../../../js/C'

const TopLabel: FunctionComponent = () => {

    const appdata : I.IResourceResult = useSelector((state : any ) => state.appdata);

    if (appdata.type != I.RESOURCE.APPDATA ) return null;

    const label : string = appdata.data['appname']

    C.log(label);

    return (
        <Typography variant="h6" noWrap display="inline">
            { label}
        </Typography>
    )
}


export default TopLabel;