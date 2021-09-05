import React, { FunctionComponent } from 'react';

import FormDokDialog from '../../../../../UI/FormDokDialog'
import InLine from '../../../../../UI/InLine'
import * as I from '../../../../../js/I';
import * as C from '../../../../../js/C';
import * as II from '../../../../../js/II';


interface IFormComp {
    listdata: I.IResourceResult;
    listdefdata: I.IResourceResult;
    slotid: I.SLOT,
    vars?: object
}


const FormComp: FunctionComponent<IFormComp> = (props) => {

    if (props.listdata == null) return null;
    if (props.listdefdata == null) return null;

    const data: object[] = (props.listdata.data as II.IResourceListData).res as object[];
    const formdef: I.IFieldForm = props.listdefdata.data as I.IFieldForm

    if (!C.verifyIFormDef(formdef)) return <div>Format error</div>

    const js = props.listdefdata.js;

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