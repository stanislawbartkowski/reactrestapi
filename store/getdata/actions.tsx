import axios from '../../axios';
import * as C from '../../js/C'
import * as I from '../../js/I'
import { resourceresult } from '../getresource/actions'

export const resourceRead = (id: I.RESOURCE, restid: string, pars: Object | null) => {

    return (dispatch: any) => {

        var url = restid;
        if (pars != null) {
            const querypars = C.partoQuery(pars);
            url = url + "?" + querypars;
        }
        C.log("REST API call " + url);

        axios.get(url).then(res => {
            dispatch(resourceresult(id, res.data, restid, null));
        });
    }
}