import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  Avatar,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const MoreMain = () => {
  const history = useHistory();
  const useStyles = makeStyles(theme => ({
    rootAvatar: {},
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    arrowIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

  const classes = useStyles();

  const userData = useSelector(state => state.auth.userData);

  const handlePlanClick = () => {
    history.push('/more/morePlan');
  };
  const handleSettingsClick = () => {
    history.push('/more/moreSettings');
  };

  const handleCommunityClick = () => {
    history.push('/more/moreCommunity');
  };

  const handleProfileEditClick = () => {
    history.push({
      pathname: '/profile',
      state: {
        userSocialId: '',
        userProfileImage: userData.image,
        userNickname: userData.nickname,
        userAgeRange: userData.age,
        userGender: userData.gender,
        prevPath: history.location.pathname,
      },
    });
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={4}
        style={{ width: 'inherit', height: 'inherit', margin: '0px' }}
      >
        <Grid item xs={1} />
        <Grid item container justify="space-between">
          <Grid item xs={4}>
            <Avatar
              alt={userData.nickname}
              src={userData.image}
              className={classes.large}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="space-between"
            alignItems="flex-end"
            xs={8}
          >
            <Grid item>
              <Typography variant="h6">{userData.nickname} 안녕!</Typography>
            </Grid>
            <Grid item container direction="row" justify="flex-end">
              <Typography onClick={handleProfileEditClick}>
                프로필 편집
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item container justify="space-between" onClick={handlePlanClick}>
          <Grid item>
            <Typography variant="h6">일정 관리</Typography>
          </Grid>
          <Grid item className={classes.arrowIcon}>
            <ArrowForwardIosIcon fontSize="small" />
          </Grid>
        </Grid>
        <Grid item container justify="space-between">
          <Grid item>
            <Typography variant="h6" onClick={handlePlanClick}>
              내 동행 글
            </Typography>
          </Grid>
          <Grid item className={classes.arrowIcon}>
            <ArrowForwardIosIcon fontSize="small" />
          </Grid>
        </Grid>
        <Grid
          item
          container
          justify="space-between"
          onClick={handleCommunityClick}
        >
          <Grid item>
            <Typography variant="h6">내 커뮤니티 글</Typography>
          </Grid>
          <Grid item className={classes.arrowIcon}>
            <ArrowForwardIosIcon fontSize="small" />
          </Grid>
        </Grid>
        <Grid item>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item container justify="space-between">
          <Grid item>
            <Typography variant="h6" onClick={handlePlanClick}>
              공지사항
            </Typography>
          </Grid>
          <Grid item className={classes.arrowIcon}>
            <ArrowForwardIosIcon fontSize="small" />
          </Grid>
        </Grid>
        <Grid
          item
          container
          justify="space-between"
          onClick={handleSettingsClick}
        >
          <Grid item>
            <Typography variant="h6">앱 설정</Typography>
          </Grid>
          <Grid item className={classes.arrowIcon}>
            <ArrowForwardIosIcon fontSize="small" />
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
};

export default MoreMain;
