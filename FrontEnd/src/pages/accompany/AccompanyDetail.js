import React from 'react';
import { useHistory } from 'react-router';
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
import BaseAppBar from '../../components/common/BaseAppBar';

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
  const boardData = history.location.state.board;

  const convertAgeToStr = age => {
    age = Number(age);
    return age === 0 ? '무관' : Number(age) + '0대' + (age === '5' ? '+' : '');
  };
  const convertWantAge = ageArrStr =>
    String(ageArrStr)
      .split('|')
      .map(age => convertAgeToStr(age))
      .join(' / ');

  const convertGenderToStr = gender => {
    switch (String(gender).toUpperCase()) {
      case 'M':
        return '남성';
      case 'F':
        return '여성';
      default:
        return '무관';
    }
  };

  const handleMoveBack = () => {
    history.goBack();
  };
  const handleMoveChat = () => {
    history.push(`/dmroom/${boardData.uid}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <BaseAppBar
        text={boardData.title}
        leftType="icon"
        leftIcon={<ArrowBackIosIcon />}
        rightType="icon"
        rightIcon={<ChatIcon />}
        leftClick={handleMoveBack}
        rightClick={handleMoveChat}
      />
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
              <Typography variant="h6">{boardData.nickname}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textSecondary">
                성별: {convertGenderToStr(boardData.gender)} / 연령:{' '}
                {convertAgeToStr(boardData.age)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textSecondary">
                여행일자: {boardData.startDate} ~ {boardData.endDate}
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
            <Typography variant="subtitle1" style={{ marginLeft: '2rem' }}>
              이런 사람이면 더 좋겠어요!
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ marginLeft: '3rem' }}>
              - 연령대: {convertWantAge(boardData.wantAge)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ marginLeft: '3rem' }}>
              - 성별 : {convertGenderToStr(boardData.wantGender)}
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
            {boardData.nation}/{boardData.city}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="body2"
            align="center"
            style={{ borderRight: '1px solid #DDDDDD' }}
          >
            {boardData.startDate}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" align="center">
            타입: {boardData.type}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Container>
          <Paper variant="outlined">
            <Typography
              variant="body2"
              style={{ margin: '1rem', whiteSpace: 'pre-line' }}
            >
              {boardData.contents}
            </Typography>
          </Paper>
        </Container>
      </Grid>
    </div>
  );
};

export default AccompanyListDetail;
