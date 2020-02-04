import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const MoreMain = ({ history }) => {
  const useStyles = makeStyles(theme => ({
    rootTextfield: {
      marginTop: '2rem',
    },
    rootAvatar: {
      marginBottom: '2rem',
    },
    large: {
      width: theme.spacing(18),
      height: theme.spacing(18),
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
        justify="space-evenly"
        style={{ width: 'inherit', height: 'inherit' }}
      >
        <Grid item container>
          <Grid item className={classes.rootAvatar}>
            <Avatar
              alt="Jeesoo Haa"
              src={userData.image}
              className={classes.large}
            />
          </Grid>
          <EditIcon onClick={handleProfileEditClick} />
        </Grid>
        <Grid item>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            일정
          </Typography>
          <Typography variant="h5" gutterBottom onClick={handlePlanClick}>
            일정 관리
          </Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            관리
          </Typography>
          <Typography variant="h5" gutterBottom onClick={handlePlanClick}>
            내 동행 관리하기
          </Typography>
          <Typography variant="h5" gutterBottom onClick={handlePlanClick}>
            내 커뮤니티 관리하기
          </Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            공통
          </Typography>
          <Typography variant="h5" gutterBottom onClick={handlePlanClick}>
            공지사항
          </Typography>
          <Typography variant="h5" gutterBottom onClick={handleSettingsClick}>
            앱 설정
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default MoreMain;
