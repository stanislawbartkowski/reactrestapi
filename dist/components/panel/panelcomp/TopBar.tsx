import React, { FunctionComponent } from 'react';

import Grid from '@mui/material/Grid';

import TopLabel from './topbar/TopLabel'
import DBName from './topbar/DBName'
import ActionLabel from './topbar/ActionLabel'
import BusyIndication from './topbar/BusyIndication';

const TopBar: FunctionComponent = () => {

    return (
        <React.Fragment>`
            <Grid container spacing={8}>
                <Grid item> <TopLabel /> </Grid>
                <Grid item>  <DBName /> </Grid>
                <Grid item>  <ActionLabel /> </Grid>
            </Grid>
            <BusyIndication />
        </React.Fragment>
    )
}

export default TopBar;