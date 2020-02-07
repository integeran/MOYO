import React, { useState, useCallback, useEffect } from 'react';
import BaseAppBar from '../../components/common/BaseAppBar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {
  changeTitle,
  changeContents,
  changeType,
  setCity,
} from '../../modules/community';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from '../../api/axios';

const CommunityWrite = () => {
  const [communityTypeList, setCommunityTypeList] = useState([]);
  const { uId, cId, cmTypeId, title, contents } = useSelector(
    ({ community }) => ({
      cId: community.cId,
      cmTypeId: community.cmTypeId,
      title: community.title,
      contents: community.contents,
    }),
  );
  const userData = useSelector(state => state.auth.userData, []);
  const history = useHistory();
  const dispatch = useDispatch();
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

  const getCommunityTypeList = async () => {
    try {
      return await axios.get('community/selectCommunityType', {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCommunityTypeList = async () => {
      const result = await getCommunityTypeList();
      setCommunityTypeList(result.data.data);
    };
    fetchCommunityTypeList();
  }, []);

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
  const handleSubmitClick = async () => {
    const communityData = {
      uId: userData.uId,
      cId: cId,
      cmTypeId: cmTypeId,
      title: title,
      contents: contents,
    };
    const fetchCommunity = async () => {
      await postCommunity(communityData);
      history.goBack();
    };
    fetchCommunity();
  };
  return (
    <div>
      <BaseAppBar
        title="글 작성하기"
        Icon1={<ArrowBackIosIcon />}
        Icon2={<CheckCircleOutlineIcon type="submit" />}
        handleClick1={handleBackClick}
        handleClick2={handleSubmitClick}
      />
      <h1>커뮤니티 글쓰기 구현 중입니다.</h1>
      <form autoComplete="off">
        <TextField
          id="nationSelect"
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
        </TextField>
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
