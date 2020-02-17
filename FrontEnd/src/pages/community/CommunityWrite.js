import React, { useCallback} from 'react';
import BaseAppBar from '../../components/common/BaseAppBar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
  changeTitle,
  changeContents,
  changeType,
} from '../../modules/community';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from '../../api/axios';
import { Select } from '@material-ui/core';

const CommunityWrite = () => {
  const { cmId, cmTypeId, title, contents } = useSelector(({ community }) => ({
    cmId: community.cmId,
    cmTypeId: community.cmTypeId,
    title: community.title,
    contents: community.contents,
  }));
  const userData = useSelector(state => state.auth.userData, []);
  const history = useHistory();
  const dispatch = useDispatch();
  const communityTypeList = history.location.state.communityTypeList;
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

  const handleChangeTitle = e => onChangeTitle(e.target.value);
  const handleChangeContents = e => onChangeContents(e.target.value);
  const handleChangeType = e => onChangeType(e.target.value);
  const handleBackClick = () => {
    history.goBack();
  };
  const postCommunity = async communityData => {
    try {
      return await axios.post('community/create', communityData, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const putCommunity = async communityData => {
    try {
      return await axios.put('community/update', communityData, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitClick = async () => {
    const communityData = {
      uId: userData.uid,
      cmTypeId: cmTypeId,
      title: title,
      contents: contents,
    };
    const fetchCommunity = async () => {
      await postCommunity(communityData);
      history.push('/community/');
    };
    fetchCommunity();
  };
  const handlePutClick = async () => {
    const communityData = {
      cmId: cmId,
      uId: userData.uid,
      cmTypeId: cmTypeId,
      title: title,
      contents: contents,
    };
    const fetchPutCommunity = async () => {
      await putCommunity(communityData);
      history.push('/community/');
    };
    fetchPutCommunity();
  };
  return (
    <div>
      <BaseAppBar
        text="글 작성하기"
        align="left"
        leftIcon={<ArrowBackIosIcon />}
        leftType="icon"
        rightText="완료"
        leftClick={handleBackClick}
        rightClick={
          history.location.state.communityPutCheck
            ? handlePutClick
            : handleSubmitClick
        }
      />
      <h1>커뮤니티 글쓰기 구현 중입니다.</h1>
      <form autoComplete="off">
        <Select
          id="typeSelect"
          select
          label="타입"
          fullWidth
          value={cmTypeId}
          onChange={handleChangeType}
        >
          {communityTypeList.map(item => (
            <MenuItem key={item.cmTypeId} value={item.cmTypeId}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="subtitle1" align="left">
          제목:
        </Typography>
        <TextField
          id="titleInput"
          value={title}
          fullWidth
          onChange={handleChangeTitle}
        />
        <hr />
        <Typography variant="subtitle1" align="left">
          내용:
        </Typography>
        <TextField
          id="outlined-multiline-static"
          label="내용"
          multiline
          fullWidth
          rows="10"
          value={contents}
          onChange={handleChangeContents}
          variant="outlined"
        />
      </form>
    </div>
  );
};

export default CommunityWrite;
