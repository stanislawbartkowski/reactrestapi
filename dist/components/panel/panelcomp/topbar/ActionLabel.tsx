import { FunctionComponent } from 'react';
import { useSelector } from "react-redux";

import Typography from '@mui/material/Typography';

import * as C from '../../../../js/C'
import * as actions from '../../../../store/pushstring/actions'

const ActionLabel: FunctionComponent = () => {

    const menuaction: actions.IPushString = useSelector((state: any) => state.menuactionname);

    if (menuaction.type != actions.STRINGTYPE.MENUACTIONNAME) return null;

    const menuname: string | undefined = menuaction.vals;

    C.log("Menu action name " + menuname);

    return (
        <Typography variant="h6" noWrap display="inline" align="center">
            {menuname}
        </Typography>
    )

}

export default ActionLabel;