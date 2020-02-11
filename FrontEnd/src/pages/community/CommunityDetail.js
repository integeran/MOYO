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
import Typography from '@material-ui/core/Typography';

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
  return (
    <div>
      {communityData.communityType}
      <br />
      {communityData.title}
      <br />
      {communityData.nickname}
      <hr />
      {communityData.contents}
      <hr />
      <CommunityCommentList cmId={communityData.cmId} userData={userData} />
      <hr />
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
    </div>
  );
};

export default CommunityDetail;
