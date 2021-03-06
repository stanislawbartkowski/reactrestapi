import { FunctionComponent, ReactElement } from 'react';

import DetailsIcon from '@mui/icons-material/Details';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';


import * as I from '../js/I';
import * as II from '../js/II';
import * as C from '../js/C';
import lstring from '../js/locale'

type StandardTool = {
    desc: string,
    icon?: FunctionComponent
}


const mapTool = new Map<string, StandardTool>([
    [I.STANDARDACTIONSHOW, { desc: "showdatabutton", icon: DetailsIcon }],
    [I.STANDARDACTIONADD, { desc: "adddatabutton", icon: AddIcon }],
    [I.STANDARDACTIONDELETE, { desc: "deletedatabutton", icon: DeleteIcon }],
    [I.STANDARDACTIONMODIF, { desc: "changedatabutton", icon: CreateIcon }],
    [I.STANDARDACTIONREFRESH, { desc: "refreshbutton", icon: RefreshIcon }],
    [I.STANDARDOKBUTTON, { desc: "ok" }],
    [I.STANDARDCANCELBUTTON, { desc: "cancel" }],
    [I.STANDARDACCEPTBUTTON, { desc: "accept" }],
])


type TToolButton = {
    i: II.IClickButtonActionDef,
    onClick: (i: II.IClickButtonActionDef) => void;
}


export const ToolButton: FunctionComponent<TToolButton> = ({ i, onClick }) => {

    const stool = mapTool.get(i.actionid.toLocaleUpperCase());

    if (stool === undefined) {
        const mess = lstring("unrecognizedtoolid", i.actionid);
        C.erralert(mess);
        return null;
    }

    const Icon: FunctionComponent | undefined = stool.icon;
    const startIcon: ReactElement | null = Icon === undefined ? null : <Icon></Icon>


    return <Button onClick={() => onClick(i)}
        variant="outlined"
        color="primary"
        startIcon={startIcon}
    >

        {lstring(stool.desc)}

    </Button>
}

export default ToolButton;
