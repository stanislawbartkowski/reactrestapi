import axios from '../../axios';
import * as C from '../../js/C'
import * as I from '../../js/I'

export const resourceresult = (command: I.RESOURCE, data: any, restid: string | null, js: string | null): I.IResourceResult => {
    return {
        type: command,
        data: data,
        restid: restid,
        js: js
    }
}

export const resourceRead = (command: I.RESOURCE) => {

    return (dispatch: any) => {

        var resource = null;
        switch (command) {
            case I.RESOURCE.APPDATA: resource = "appdata"; break;
            case I.RESOURCE.LEFTMENU: resource = "leftmenu"; break;
            case I.RESOURCE.STRINGS: resource = "strings"; break;
        }
        const url = "resource?resource=" + resource;
        C.log("REST API call " + url);

        axios.get(url).then(res => {
            dispatch(resourceresult(command, res.data, null, null));
        });
    }
}