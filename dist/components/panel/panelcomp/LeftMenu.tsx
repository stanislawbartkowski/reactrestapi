import React, { Dispatch, FunctionComponent } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

import LeftButton from '../../../UI/LeftMenu';
import * as pactions from '../../../store/pushstring/actions';
import * as C from '../../../js/C';
import * as I from '../../../js/I';
import * as lactions from '../../../store/getdata/actions'
import * as dactions from '../../../store/getcompres/actions'
import { getPath } from './MenuConfig';

import { setStrings } from '../../../js/locale'
import lstring from '../../../js/locale'

var menu: I.TMenuElem[] = []

export const getRestId = (menuid: string): string | null => {
    const emenu: I.TMenuElem | undefined = menu.find(e => e.id == menuid);
    if (emenu == undefined) {
        C.erralert(menuid + " : cannot find such menu id");
        return null;
    }
    return emenu.restid;
}

const LeftMenu: FunctionComponent = () => {

    const leftmenu: I.IResourceResult = useSelector((state: any) => state.leftmenu);
    const strings: I.IResourceResult = useSelector((state: any) => state.strings);
    const forcemenu: pactions.IPushString = useSelector((state: any) => state.forcemenu);

    const dispatch = useDispatch();
    const history = useHistory();

    if (leftmenu.type != I.RESOURCE.LEFTMENU) return null;
    if (strings.type != I.RESOURCE.STRINGS) return null;

    setStrings(strings.data);

    menu = (leftmenu.data as I.IResourceListMenu).menu;

    const menustring = (e: I.TMenuElem): string => {
        return lstring("button_" + e.id);
    }

    const clickAction = (e: I.TMenuElem) => {
        if (!C.CanCallMenu(e.id)) return;
        dispatch(pactions.pushstring(pactions.STRINGTYPE.MENUACTIONNAME, menustring(e)));
        dispatch(pactions.pushstring(pactions.STRINGTYPE.COMPACTIONID, e.restid));
        dispatch(lactions.resourceRead(I.RESOURCE.COMPRES, e.id, e.restid, null));
        dispatch(dactions.resourceCompDefRead(I.RESOURCE.COMPRESDEF, e.restid, e.restid, null));
        const path: string = getPath(e.id);
        history.replace(path);
    }

    if (forcemenu.type == pactions.STRINGTYPE.FORCEMENU) {
        const menuid: string = forcemenu.vals as string;
        const m: I.TMenuElem = menu.find(e => e.id == menuid) as I.TMenuElem;
        clickAction(m);
    }

    return (
        <React.Fragment>
            {
                menu.map(e => (
                    <LeftButton clicked={() => clickAction(e)}
                        text={menustring(e)} />
                ))
            }
        </React.Fragment>
    )
}


export default LeftMenu;