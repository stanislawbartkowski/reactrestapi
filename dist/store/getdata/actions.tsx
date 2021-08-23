import axios from '../../axios';
import * as C from '../../js/C'
import * as I from '../../js/I'
import { resourceresult } from '../getresource/actions'

export const resourceRead = (id: I.RESOURCE, menuid: string, restid: string, pars: Object | null) => {

    return (dispatch: any) => {

        var url = C.modifDataUrl(menuid, restid);
        if (pars != null) {
            const querypars = C.partoQuery(pars);
            url = C.addQuery(url, querypars);
        }
        C.log("REST API call " + url);

        axios.get(url).then(res => {
            dispatch(resourceresult(id, res.data, restid, null, null));
        });
    }
}

export const resourceReadReady = (id: I.RESOURCE, restid: string, data: I.IResourceListData): I.IResourceResult => {
    return resourceresult(id, data, restid, null, null);
}