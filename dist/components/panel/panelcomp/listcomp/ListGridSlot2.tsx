import { FunctionComponent } from 'react';
import * as I from '../../../../js/I';
import { useSelector } from "react-redux";
import ListGrid from './ListGrid'
import * as pactions from '../../../../store/pushstring/actions';


const ListGridSlot2: FunctionComponent = () => {

    const listdata: I.IResourceResult = useSelector((state: any) => state.readlistdataslot2);
    const menuaction: pactions.IPushString = useSelector((state: any) => state.listactionslot2);
    const listdefdata: I.IResourceResult = useSelector((state: any) => state.readlistdefslot2);

    if (listdata.type != I.RESOURCE.LISTRESSLOT2) return null;
    if (menuaction.type != pactions.STRINGTYPE.LISTSLOT2ID) return null;
    if (listdefdata.type != I.RESOURCE.LISTRESDEFSLOT2) return null;

    return <ListGrid listdata={listdata} menuaction={menuaction} listdefdata={listdefdata} slotid={I.SLOT.SLOT1} vars={listdefdata.vars} />
}

export default ListGridSlot2;