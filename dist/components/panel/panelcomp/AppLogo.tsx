import { FunctionComponent } from 'react';
import { useSelector } from "react-redux";

import * as I from '../../../js/I'

const AppLogo: FunctionComponent = () => {
    const appdata: I.IResourceResult = useSelector((state: any) => state.appdata);

    if (appdata.type != I.RESOURCE.APPDATA) return null;

    const logo: string = (appdata.data as I.IResourceAppData).logo

    return <div>
        <img src={logo} alt="logo" />
    </div>
}

export default AppLogo;