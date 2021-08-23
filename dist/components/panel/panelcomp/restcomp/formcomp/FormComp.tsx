import { FunctionComponent } from 'react';

import ModalDialog from '../../../../../UI/ModalDialog'
import * as C from '../../../../../js/C';
import * as I from '../../../../../js/I';
import * as pactions from '../../../../../store/pushstring/actions'
import FormDokDialog from '../../../../../UI/FormDokDialog'

interface IFormComp {
    listdata: I.IResourceResult;
    listdefdata: I.IResourceResult;
    slotid: I.SLOT,
    vars: object | null
}


const FormComp: FunctionComponent<IFormComp> = ({ listdata, listdefdata, slotid, vars }) => {

    if (listdata == null) return null;
    if (listdefdata == null) return null;

    const data: any[] = (listdata.data as I.IResourceListData).res;
    const formdef: I.IFieldForm = listdefdata.data as I.IFieldForm

    return <FormDokDialog data={data} def={formdef}></FormDokDialog>
}

export default FormComp;