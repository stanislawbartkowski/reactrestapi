import React, { Dispatch, FunctionComponent } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

import LeftButton from '../../../UI/LeftMenu';
import * as pactions from '../../../store/pushstring/actions';
import * as I from '../../../js/I';
import * as lactions from '../../../store/getdata/actions'
import * as dactions from '../../../store/getlistres/actions'

import { setStrings } from '../../../js/locale'
import lstring from '../../../js/locale'

const LeftMenu: FunctionComponent = () => {

    const leftmenu: I.IResourceResult = useSelector((state: any) => state.leftmenu);
    const strings: I.IResourceResult = useSelector((state: any) => state.strings);
    const dispatch = useDispatch();
    const history = useHistory();

    if (leftmenu.type != I.RESOURCE.LEFTMENU) return null;
    if (strings.type != I.RESOURCE.STRINGS) return null;

    const menustring = (e: I.TMenuElem): string => {
        return lstring("button_" + e.id);
    }

    setStrings(strings.data);

    const menu: I.TMenuElem[] = leftmenu.data['menu']

    const clickAction = (e: I.TMenuElem) => {
        dispatch(pactions.pushstring(pactions.STRINGTYPE.MENUACTIONNAME, menustring(e)));
        dispatch(pactions.pushstring(pactions.STRINGTYPE.LISTACTIONID, e.restid));
        dispatch(lactions.resourceRead(I.RESOURCE.LISTRES,e.restid,null));
        dispatch(dactions.resourceListDefRead(I.RESOURCE.LISTRESDEF,e.restid, e.restid));
        history.replace("/list");
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