import React from 'react';
import { Typography, Paper, Grid, Avatar } from '@material-ui/core';
import IU from '../../../assets/img/iu.jpg';

const TripCompanionSet = ({ companionInfo }) => {
  console.log(companionInfo);
  return (
    <Paper elevation={0}>
      <Grid container spacing={2}>
        <Grid item xs={1} />
        <Grid item xs={4}>
          <Avatar
            alt="iu"
            src={IU}
            style={{ width: '100%', height: 'inherit' }}
          />
        </Grid>
        <Grid container xs={6} justify="center" alignContent="center">
          <Typography variant="subtitle1">
            {companionInfo.accompanyNickname}
          </Typography>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Paper>
  );
};

export default TripCompanionSet;
