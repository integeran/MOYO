import React from 'react';
import { useHistory } from 'react-router';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ChatIcon from '@material-ui/icons/Chat';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IU from '../../assets/img/iu.jpg';
import styled from 'styled-components';

const StyledAppBar = styled(({ ...other }) => <AppBar {...other} />)`
  & .MuiTypography-h6 {
    flex-grow: 1;
    text-align: center;
  }
`;

const CenterGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAvatar = styled(Avatar)`
  min-width: 5rem;
  min-height: 5rem;
`;
//({ ...other }) => <Divider {...other} />
const StyledDivider = styled(Divider)`
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
`;

const AccompanyListDetail = () => {
  const history = useHistory();
  const handleMoveBack = () => {
    history.goBack();
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <StyledAppBar color="inherit" elevation={0} position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={handleMoveBack}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6">안녕?</Typography>
          <IconButton edge="end" color="inherit" aria-label="message">
            <ChatIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <Grid
        container
        direction="column"
        alignItems="stretch"
        justify="flex-start"
        spacing={2}
      >
        <Grid item container xs>
          <CenterGrid item xs={4}>
            <StyledAvatar alt="IU" src={IU} xs />
          </CenterGrid>
          <Grid item container direction="column" xs>
            <Grid item>
              <Typography variant="h6">란코루</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textSecondary">
                성별: 남자 /연령: 20대
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textSecondary">
                작성일자: 2020.01.12
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <StyledDivider variant="middle" light="true" />
      <Grid
        container
        direction="column"
        alignItems="stretch"
        justify="flex-start"
        spacing={3}
      >
        <Grid item container xs direction="column">
          <Grid item>
            <Typography variant="h6" style={{ marginLeft: '2rem' }}>
              이런 사람 찾아요!
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ marginLeft: '3rem' }}>
              - 연령대: 10대 / 20대
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ marginLeft: '3rem' }}>
              - 성별 : 무관
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <StyledDivider variant="middle" light="true" />
      <Grid item container xs>
        <Grid item xs={4}>
          <Typography
            variant="body2"
            align="center"
            style={{ borderRight: '1px solid #DDDDDD' }}
          >
            영국/런던
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="body2"
            align="center"
            style={{ borderRight: '1px solid #DDDDDD' }}
          >
            1.28일(화)
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" align="center">
            타입: 관광
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Container>
          <Paper variant="outlined">
            <Typography variant="body2" style={{ margin: '1rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            </Typography>
          </Paper>
        </Container>
      </Grid>
    </div>
  );
};

export default AccompanyListDetail;
