import React, { FunctionComponent } from 'react';

import FormDokDialog from '../../../../../UI/FormDokDialog'
import InLine from '../../../../../UI/InLine'
import * as I from '../../../../../js/I';


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

    const js = listdefdata.js;

    const component = <FormDokDialog data={data} def={formdef} ></FormDokDialog>

    if (js == null)
        return component;
    else
        return <React.Fragment>
            <InLine js={js} />
            {component}
        </React.Fragment>

}

export default FormComp;