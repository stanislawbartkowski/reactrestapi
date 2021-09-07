import { FunctionComponent } from 'react';
import * as I from '../../../../js/I';
import { useSelector } from "react-redux";
import ListGrid from './listcomp/ListGrid'
import * as pactions from '../../../../store/pushstring/actions'


const ListComponent: FunctionComponent = () => {

    const listdata: I.IResourceResult = useSelector((state: any) => state.readlistdata);
    const menuaction: pactions.IPushString = useSelector((state: any) => state.listactionid);
    const listdefdata: I.IResourceResult = useSelector((state: any) => state.readlistdef);

    if (listdata.type != I.RESOURCE.COMPRES) return null;
    if (menuaction.type != pactions.STRINGTYPE.COMPACTIONID) return null;
    if (listdefdata.type != I.RESOURCE.COMPRESDEF) return null;

    return <ListGrid listdata={listdata} menuaction={menuaction} listdefdata={listdefdata} slotid={I.SLOT.SLOTBASE} />
}

export default ListComponent;