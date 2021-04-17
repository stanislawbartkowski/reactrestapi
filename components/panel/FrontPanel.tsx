import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';


import ResponsiveDashboard from '../../UI/ResponsiveDashboard'
import MainPanel from './panelcomp/MainPanel'
import LeftMenu from './panelcomp/LeftMenu'
import TopBar from './panelcomp/TopBar'

const FrontPanel: React.FC = () => {

  const main: ReactElement = <MainPanel />
  const leftmenu: ReactElement = <LeftMenu />
  const toplabel: ReactElement = <TopBar />

  return (
    <Switch>
      <Route path="/"> <ResponsiveDashboard main={main} leftmenu={leftmenu} toplabel={toplabel} /> </Route>
    </Switch>
  );
}

export default FrontPanel;