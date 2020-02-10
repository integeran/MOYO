import React from 'react';
import { Typography, Paper, Grid, Avatar } from '@material-ui/core';
import axios from '../../../api/axios';
import { useHistory } from 'react-router-dom';

const TripCompanionSet = ({ companionInfo }) => {
  const history = useHistory();

  const getCompanionInfo = async uId => {
    try {
      return await axios.get(`user/selectOne/${uId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompanionInfo = async uId => {
    const userInfo = await getCompanionInfo(uId);
    history.push({
      pathname: '/profile',
      state: {
        userSocialId: '',
        userProfileImage: userInfo.data.data.image,
        userNickname: userInfo.data.data.nickname,
        userAgeRange: userInfo.data.data.age,
        userGender: userInfo.data.data.gender,
        prevPath: history.location.pathname,
      },
    });
  };

  return (
    <Paper elevation={0}>
      <Grid container spacing={2}>
        <Grid item xs={1} />
        <Grid item xs={4}>
          <Avatar
            alt="iu"
            src={companionInfo.accompanyImage}
            style={{ width: '100%', height: 'inherit' }}
            onClick={() => handleCompanionInfo(companionInfo.accompanyId)}
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
