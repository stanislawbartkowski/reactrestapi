import axios from '../../axios';
import * as C from '../../js/C'
import * as I from '../../js/I'
import { resourceresult } from '../getresource/actions'

export const resourceCompDefRead  = (id: I.RESOURCE, compresource: string, restid: string, vars?: object) => {

    return (dispatch: any) => {

        const url = "compdef?resource=" + compresource
        C.log("REST API call " + url);

        axios.get(url).then(res => {
            const js = res.data.js;
            if (js != null) {
                const urljs = "getjs?resource=" + js;
                axios.get(urljs).then(jres => {
                    dispatch(resourceresult(id, res.data, restid, jres.data, vars));
                })
            }
            else
                dispatch(resourceresult(id, res.data, restid, null, vars));
        });
    }
}

export const resourceCompDefReadReady = (id: I.RESOURCE, restid: string, restform: I.IFieldForm) => {
    return resourceresult(id, restform, restid, null, undefined);
}
