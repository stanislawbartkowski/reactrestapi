import { FunctionComponent } from 'react';
import { useSelector } from "react-redux";

import * as I from '../../../../js/I';
import * as C from '../../../../js/C';
import ListGrid from './listcomp/ListGrid'
import FormComp from './formcomp/FormComp'
import * as pactions from '../../../../store/pushstring/actions';


const CompGridSlot3: FunctionComponent = () => {

    const listdata: I.IResourceResult = useSelector((state: any) => state.readlistdataslot3);
    const menuaction: pactions.IPushString = useSelector((state: any) => state.listactionslot3);
    const listdefdata: I.IResourceResult = useSelector((state: any) => state.readlistdefslot3);

    if (listdata.type != I.RESOURCE.COMPRESSLOT3) return null;
    if (menuaction.type != pactions.STRINGTYPE.COMPSLOT3ID) return null;
    if (listdefdata.type != I.RESOURCE.COMPRESDEFSLOT3) return null;

    if (C.ResourceDefType(listdefdata) == I.RESOURCETYPE.LIST)
        return <ListGrid listdata={listdata} menuaction={menuaction} listdefdata={listdefdata} slotid={I.SLOT.SLOT3} vars={listdefdata.vars} />
    if (C.ResourceDefType(listdefdata) == I.RESOURCETYPE.FORM)
        return <FormComp listdata={listdata} listdefdata={listdefdata} slotid={I.SLOT.SLOT3} vars={listdefdata.vars} />

    return <div></div>
}

export default CompGridSlot3;