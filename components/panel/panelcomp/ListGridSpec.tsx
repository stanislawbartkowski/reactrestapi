import { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as I from '../../../js/I';
import { useSelector } from "react-redux";
import ListGrid from './ListGrid'
import * as pactions from '../../../store/pushstring/actions';


const ListGridSpec: FunctionComponent = () => {

    const listdata: I.IResourceResult = useSelector((state: any) => state.readlistspec);
    const menuaction: pactions.IPushString = useSelector((state: any) => state.listactionspecid);
    const listdefdata: I.IResourceResult = useSelector((state: any) => state.readlistdefspec);

    if (listdata.type != I.RESOURCE.LISTRESSPEC) return null;
    if (menuaction.type != pactions.STRINGTYPE.LISTACTIONSPECID) return null;
    if (listdefdata.type != I.RESOURCE.LISTRESDEFSPEC) return null;

    return <ListGrid listdata={listdata} menuaction={menuaction} listdefdata={listdefdata} />
}

export default ListGridSpec;