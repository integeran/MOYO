import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ChatIcon from '@material-ui/icons/Chat';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import axios from '../../api/axios';
import styled from 'styled-components';
import BaseAppBar from '../../components/common/BaseAppBar';
import { navigationSelect } from '../../modules/baseNavigation';
import {
  Switch,
  Button,
  Divider,
  Typography,
  Avatar,
  Container,
  Paper,
  Grid,
} from '@material-ui/core';

const InnerContainerGrid = styled(Grid)`
  width: 85%;
  flex-grow: 1;
  margin: 0 auto !important;
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
  background-color: white;
  border-radius: 1rem;
`;

const CenterGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAvatar = styled(Avatar)`
  min-width: 3.5rem;
  min-height: 3.5rem;
`;

const StyledDivider = styled(Divider)`
  margin-top: 0.8rem !important;
  margin-bottom: 0.8rem !important;
  background-color: black !important;
`;

const AccompanyListDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [boardData, setBoardData] = useState(history.location.state.board);
  const isModify =
    history.location.pathname.indexOf('more') > -1 ? true : false;

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

  const saveToggleChangeBoard = async changedToggle => {
    try {
      return axios.put(
        'accompanyBoard/updateDeadlineToggle',
        {
          acBoardId: boardData.acBoardId,
          deadlineToggle: changedToggle,
        },
        { headers: { userToken: localStorage.token } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBoard = async () => {
    try {
      return axios.delete(`accompanyBoard/delete/${boardData.acBoardId}`, {
        headers: { userToken: localStorage.token },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    history.goBack();
  };
  const handleMoveChat = () => {
    dispatch(navigationSelect('DM'));
    history.push(`/dmroom/${boardData.uid}`);
  };
  const handleModifyAccompany = () => {
    history.push({
      pathname: '/more/accompanyWrite',
      state: {
        prevpath: history.location.pathname,
        board: boardData,
      },
    });
  };
  const handleDeleteClick = async () => {
    await deleteBoard().then(() => {
      history.goBack();
    });
  };

  const ModifyStateContainer = () => {
    if (boardData.validDate && boardData.deadlineToggle === 'n') {
      return <></>;
    } else {
      return (
        <Typography variant="h6" align="center">
          {boardData.validDate
            ? '마감된 동행 글입니다.'
            : '기간이 지난 동행 글입니다.'}
        </Typography>
      );
    }
  };

  const NameContainer = () => {
    const handleChangeToggle = () => {
      if (!boardData.validDate) {
        return;
      }
      const fetchSaveToggle = async () => {
        const changedToggle = boardData.deadlineToggle === 'n' ? 'y' : 'n';
        setBoardData({
          ...boardData,
          deadlineToggle: changedToggle,
        });
        await saveToggleChangeBoard(changedToggle);
      };
      fetchSaveToggle();
    };
    return (
      <Grid item container>
        <Grid item xs={isModify ? 7 : 12}>
          <Typography variant="subtitle1">{boardData.nickname}</Typography>
        </Grid>
        {isModify && (
          <Grid item xs={5}>
            마감
            <Switch
              checked={boardData.deadlineToggle === 'y'}
              onChange={handleChangeToggle}
              disable={String(!boardData.validDate)}
            ></Switch>
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <BaseAppBar
        text="상세보기"
        align="left"
        leftType="icon"
        leftIcon={<ArrowBackIosIcon />}
        leftClick={handleGoBack}
        rightType="icon"
        rightIcon={isModify ? <BorderColorIcon /> : <ChatIcon />}
        rightClick={isModify ? handleModifyAccompany : handleMoveChat}
        style={{ flexGrow: '0' }}
      />

      {isModify && <ModifyStateContainer />}
      <InnerContainerGrid item>
        <Grid container direction="column" justify="flex-start">
          <Grid item style={{ padding: '0.7rem 1rem 0.2rem 1rem' }}>
            <Typography variant="subtitle2" color="secondary">
              {boardData.type}
            </Typography>
          </Grid>
          <Grid item style={{ padding: '0 1rem 0.5rem 1rem' }}>
            <Typography variant="h5">{boardData.title}</Typography>
          </Grid>
          <Grid item container style={{ padding: '0 1rem' }}>
            <CenterGrid item xs={3}>
              <StyledAvatar src={boardData.image} />
            </CenterGrid>
            <Grid
              item
              container
              direction="column"
              xs={9}
              style={{ paddingLeft: '0.5rem' }}
            >
              <NameContainer />
              <Grid item>
                <Typography variant="body2">
                  {convertGenderToStr(boardData.gender)} /{' '}
                  {convertAgeToStr(boardData.age)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  {boardData.startDate} ~ {boardData.endDate}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <StyledDivider variant="middle" />

        <Grid container direction="column" justify="flex-start">
          <Grid item container direction="column">
            <Grid item>
              <Typography variant="subtitle2" style={{ paddingLeft: '1rem' }}>
                이런 사람이면 더 좋겠어요!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ marginLeft: '1.5rem' }}>
                - 연령대: {convertWantAge(boardData.wantAge)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ marginLeft: '1.5rem' }}>
                - 성별 : {convertGenderToStr(boardData.wantGender)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <StyledDivider variant="middle" />

        <Grid item style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Container>
            <Paper elevation={0}>
              <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                {boardData.contents}
              </Typography>
            </Paper>
          </Container>
        </Grid>

        {isModify && (
          <Grid style={{ padding: '0 1rem' }}>
            <Button
              fullWidth={true}
              variant="contained"
              color="error"
              onClick={handleDeleteClick}
            >
              삭제
            </Button>
          </Grid>
        )}
      </InnerContainerGrid>
    </Grid>
  );
};

export default AccompanyListDetail;
