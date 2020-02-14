import React, { useCallback } from 'react';
import community, {
  changeCmId,
  changeTitle,
  changeContents,
  changeType,
} from '../../modules/community';
import CommunityCommentList from '../../components/community/CommunityCommentList';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from '../../api/axios';
import { Grid, Typography, Divider } from '@material-ui/core';
import BaseAppBar from '../../components/common/BaseAppBar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import styled from 'styled-components';
import MoyoColor from '../../api/moyoColor';

const InnerContainerGrid = styled(Grid)`
  width: 85% !important;
  margin: 0 auto !important;
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
  background-color: white;
  border-radius: 1rem;
  padding: 0 1rem;
`;

const BlackDivider = styled(Divider)`
  background-color: black !important;
  margin: 0.6rem 0 !important;
`;

const CommunityDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const communityData = history.location.state.community;
  const onChangeCmId = useCallback(cmId => dispatch(changeCmId(cmId)), [
    dispatch,
  ]);
  const onChangeTitle = useCallback(title => dispatch(changeTitle(title)), [
    dispatch,
  ]);
  const onChangeContents = useCallback(
    contents => dispatch(changeContents(contents)),
    [dispatch],
  );
  const onChangeType = useCallback(cmTypeId => dispatch(changeType(cmTypeId)), [
    dispatch,
  ]);
  const deleteCommunity = async cmId => {
    try {
      return await axios.delete(`community/delete/${cmId}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteClick = async () => {
    await deleteCommunity(communityData.cmId);
    history.push('/community/');
  };
  console.log(communityData);

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <BaseAppBar
          text="상세보기"
          align="left"
          leftIcon={<ArrowBackIosIcon />}
          leftType="icon"
          leftClick={handleBackClick}
        />
      </Grid>
      <InnerContainerGrid item container direction="column">
        <Grid item style={{ margin: '0.5rem 0 0.3rem' }}>
          <Typography
            variant="subtitle1"
            style={{ color: MoyoColor.moyo_biscay_3 }}
          >
            {communityData.communityType}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">{communityData.title}</Typography>
        </Grid>
        <Grid item style={{ margin: '0.5rem 0.3rem 0' }}>
          <Typography variant="body2">{communityData.nickname}</Typography>
        </Grid>
        <BlackDivider />
        <Grid item style={{ margin: '0.4rem' }}>
          {communityData.contents}
        </Grid>
        <BlackDivider />
        <CommunityCommentList cmId={communityData.cmId} userData={userData} />
        {userData.uid === communityData.uid ? (
          <Typography
            onClick={() => {
              history.push({
                pathname: '/community/write/',
                state: {
                  prevpath: history.location.pathname,
                  communityPutCheck: true,
                },
              });
              onChangeCmId(communityData.cmId);
              onChangeTitle(communityData.title);
              onChangeContents(communityData.contents);
              onChangeType(communityData.cmTypeId);
            }}
          >
            수정하기
          </Typography>
        ) : (
          <div></div>
        )}
        {userData.uid === communityData.uid ? (
          <Typography onClick={handleDeleteClick}>삭제하기</Typography>
        ) : (
          <div></div>
        )}
      </InnerContainerGrid>
    </Grid>
  );
};

export default CommunityDetail;
