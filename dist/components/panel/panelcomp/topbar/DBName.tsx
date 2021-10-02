import React, { FunctionComponent } from 'react';
import { useSelector } from "react-redux";

import Typography from '@mui/material/Typography';

import * as C from '../../../../js/C'
import * as actions from '../../../../store/pushstring/actions'

const DBName: FunctionComponent = () => {

    const dbname: actions.IPushString = useSelector((state: any) => state.dbname);

    if (dbname.type != actions.STRINGTYPE.DBNAME) return null;

    const name: string = dbname.vals as string;

    C.log("Db name " + name);

    return (
        <Typography variant="h6" noWrap display="inline" align="center">
            {name}
        </Typography>
    )

}


export default DBName;