import { FunctionComponent } from 'react';
import * as I from '../../../../js/I';
import { useSelector } from "react-redux";
import ListGrid from './ListGrid'
import * as pactions from '../../../../store/pushstring/actions';


const ListGridSlot1: FunctionComponent = () => {

    const listdata: I.IResourceResult = useSelector((state: any) => state.readlistdataslot1);
    const menuaction: pactions.IPushString = useSelector((state: any) => state.listactionslot1);
    const listdefdata: I.IResourceResult = useSelector((state: any) => state.readlistdefslot1);

    if (listdata.type != I.RESOURCE.LISTRESSLOT1) return null;
    if (menuaction.type != pactions.STRINGTYPE.LISTSLOT1ID) return null;
    if (listdefdata.type != I.RESOURCE.LISTRESDEFSLOT1) return null;

    return <ListGrid listdata={listdata} menuaction={menuaction} listdefdata={listdefdata} />
}

export default ListGridSlot1;