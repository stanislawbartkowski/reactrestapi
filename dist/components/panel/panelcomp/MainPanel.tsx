import { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { addRouter, routermenu } from './MenuConfig';
import ListComponent from './restcomp/CompGridBase'

addRouter({ path: "/comp", comp: ListComponent, id: null });

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
