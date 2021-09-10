import axios from '../../axios';
import * as C from '../../js/C'
import * as I from '../../js/I'
import * as II from '../../js/II'
import { resourceresult } from '../getresource/actions'

function createDownloadProgress() {

    const starttime: number = Date.now();

    return (progressEvent: any) => {
        const loaded = progressEvent.loaded;
        const sec = C.noSec(starttime);
        C.log("Loaded: " + loaded + " " + sec + " secs");
    }

}

export const resourceRead = (id: I.RESOURCE, menuid: string, restid: string, pars?: Object): any => {

    //export const resourceRead = (id: I.RESOURCE, menuid: string, restid: string, pars: Object | undefined) : any => {

    return (dispatch: any) => {

        const config = {
            onDownloadProgress: createDownloadProgress()
        }
        var url = C.modifDataUrl(menuid, restid);
        if (pars) {
            const querypars = C.partoQuery(pars);
            url = C.addQuery(url, querypars);
        }
        C.log("REST API call " + url);

        axios.get(url, config).then(res => {
            dispatch(resourceresult(id, res.data, restid, null, undefined));
        });
    }
}

export const resourceReadReady = (id: I.RESOURCE, restid: string, data: II.IResourceListData): I.IResourceResult => {
    return resourceresult(id, data, restid, null, undefined);
}