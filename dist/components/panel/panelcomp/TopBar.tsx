import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid"

import TopLabel from './topbar/TopLabel'
import DBName from './topbar/DBName'
import ActionLabel from './topbar/ActionLabel'

const TopBar: FunctionComponent = () => {


    return (
        <Grid container spacing={8}>
            <Grid item> <TopLabel /> </Grid>
            <Grid item>  <DBName /> </Grid>
            <Grid item>  <ActionLabel /> </Grid>
        </Grid>
    )
}

export default TopBar;