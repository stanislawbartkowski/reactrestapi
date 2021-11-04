import axios from '../../axios';
import * as C from '../../js/C'
import * as I from '../../js/I'
import * as II from '../../js/II'
import { resourceresult } from '../getresource/actions'
import { useDispatch } from 'react-redux';
import * as pactions from '../pushstring/actions'



export const resourceRead = (id: I.RESOURCE, menuid: string, restid: string, pars?: Object): any => {

    return (dispatch: any) => {

        let wastimeout: boolean = false;
        dispatch(pactions.pushstring(pactions.STRINGTYPE.BUSYINDICATOR,pactions.BUSYSTOP));

        function timeOut() {
            wastimeout = true;
            C.log("Display busy");
            dispatch(pactions.pushstring(pactions.STRINGTYPE.BUSYINDICATOR,pactions.BUSYSTART));
        }

        var url = C.modifDataUrl(menuid, restid);
        if (pars) {
            const querypars = C.partoQuery(pars);
            url = C.addQuery(url, querypars);
        }
        C.log("REST API call " + url);

        const timevar = setTimeout(timeOut, 3000);
        axios.get(url).then(res => {
            clearTimeout(timevar);
            if (wastimeout) {
                C.log("Remove busy")
                dispatch(pactions.pushstring(pactions.STRINGTYPE.BUSYINDICATOR,pactions.BUSYSTOP));
            }
            dispatch(resourceresult(id, res.data, restid, null, undefined));
        });
    }
}

export const resourceReadReady = (id: I.RESOURCE, restid: string, data: II.IResourceListData): I.IResourceResult => {
    return resourceresult(id, data, restid, null, undefined);
}