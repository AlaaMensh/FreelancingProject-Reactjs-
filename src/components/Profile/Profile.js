import { Grid } from '@material-ui/core';
import React from 'react';
import ChangePassword from './CPassword';
import Info from './Info';
export default function Profile()
{
    var userId = localStorage.getItem("userId");
    return (
        <div>
        <Grid style={{position:'absolute',marginTop:25}} container spacing={3}>
        <Grid item xs={6}>
            <ChangePassword userId={userId} />
        </Grid>
        <Grid item xs={6}>  
        <   Info userId={userId} />
        </Grid>
      </Grid>
      </div>
    )
}