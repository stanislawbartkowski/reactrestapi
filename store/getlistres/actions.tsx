import axios from '../../axios';
import * as C from '../../js/C'
import * as I from '../../js/I'
import { resourceresult } from '../getresource/actions'

export const resourceListDefRead = (id: I.RESOURCE, listresource: string, restid: string) => {

    return (dispatch: any) => {

        const url = "listdef?resource=" + listresource
        C.log("REST API call " + url);

        axios.get(url).then(res => {
            const js = res.data.js;
            if (js != null) {
                const urljs = "getjs?resource=" + js;
                axios.get(urljs).then(jres => {
                    dispatch(resourceresult(id, res.data, restid, jres.data));
                })
            }
            else
                dispatch(resourceresult(id, res.data, restid, null));
        });
    }
}