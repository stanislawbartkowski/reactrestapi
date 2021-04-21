import { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as I from '../../../js/I';
import { useSelector } from "react-redux";
import ListGrid from './ListGrid'
import * as pactions from '../../../store/pushstring/actions'
import { addRouter, routermenu } from './MenuConfig';


const ListComponent: FunctionComponent = () => {

    const listdata: I.IResourceResult = useSelector((state: any) => state.readlistdata);
    const menuaction: pactions.IPushString = useSelector((state: any) => state.listactionid);
    const listdefdata: I.IResourceResult = useSelector((state: any) => state.readlistdef);

    if (listdata.type != I.RESOURCE.LISTRES) return null;
    if (menuaction.type != pactions.STRINGTYPE.LISTACTIONID) return null;
    if (listdefdata.type != I.RESOURCE.LISTRESDEF) return null;

    return <ListGrid listdata={listdata} menuaction={menuaction} listdefdata={listdefdata} />
}

addRouter({ path: "/list", comp: ListComponent, restid: null });

const MainPanel: FunctionComponent = () => {

    return (
        <Switch>
            {
                routermenu.map(e => (
                    <Route exact path={e.path} component={e.comp} />
                )
                )
            }
        </Switch>
    );
}

export default MainPanel;
