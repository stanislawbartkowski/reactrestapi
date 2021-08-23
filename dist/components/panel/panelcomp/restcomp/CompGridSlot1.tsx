import { FunctionComponent } from 'react';
import * as I from '../../../../js/I';
import * as C from '../../../../js/C';
import { useSelector } from "react-redux";
import ListGrid from './listcomp/ListGrid'
import FormComp from './formcomp/FormComp'
import * as pactions from '../../../../store/pushstring/actions';


const CompGridSlot1: FunctionComponent = () => {

    const listdata: I.IResourceResult = useSelector((state: any) => state.readlistdataslot1);
    const menuaction: pactions.IPushString = useSelector((state: any) => state.listactionslot1);
    const listdefdata: I.IResourceResult = useSelector((state: any) => state.readlistdefslot1);

    if (listdata.type != I.RESOURCE.COMPRESSLOT1) return null;
    if (menuaction.type != pactions.STRINGTYPE.COMPSLOT1ID) return null;
    if (listdefdata.type != I.RESOURCE.COMPRESDEFSLOT1) return null;

    if (C.ResourceDefType(listdefdata) == I.RESOURCETYPE.LIST)
        return <ListGrid listdata={listdata} menuaction={menuaction} listdefdata={listdefdata} slotid={I.SLOT.SLOT2} vars={listdefdata.vars} />
    if (C.ResourceDefType(listdefdata) == I.RESOURCETYPE.FORM)
        return <FormComp listdata={listdata} listdefdata={listdefdata} slotid={I.SLOT.SLOT2} vars={listdefdata.vars} />
        
    return <div>Internal error</div>
}

export default CompGridSlot1;