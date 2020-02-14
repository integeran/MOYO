import React, { useState, useEffect, useCallback } from 'react';
import {
  changeCmId,
  changeTitle,
  changeContents,
  changeType,
} from '../../modules/community';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from '../../api/axios';
import CommunityListSet from '../../components/community/CommunityListSet';
import AccompanySearchBar from '../../components/accompany/List/AccompanySearchBar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const CommunityList = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const [communityData, setCommunityData] = useState([]);
  const [communityTypeList, setCommunityTypeList] = useState([]);
  const [communityType, setCommunityType] = useState(0);
  const [searchWord, setSearchWord] = useState('');
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

  const getCommunityList = async () => {
    try {
      return await axios.get(`community/selectAll`, {
        headers: { userToken: userData.userToken },
        params: { cmTypeId: communityType, searchWord: searchWord },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCommunity = async () => {
      const result = await getCommunityList();
      console.log(result);
      const resData = result.data.data.map(item => {
        return {
          ...item,
        };
      });
      setCommunityData(resData);
    };
    getCommunity();
  }, [communityType, searchWord]);

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
      result.data.data.unshift({ cmTypeId: 0, name: '전체' });
      console.log(result);
      setCommunityTypeList(result.data.data);
    };
    fetchCommunityTypeList();
  }, []);

  const handleTabChange = async cmTypeId => {
    console.log(cmTypeId);
    setCommunityType(cmTypeId);
  };

  const handleSearchClick = text => {
    setSearchWord(text);
  };

  return (
    <>
      <Tabs
        value={communityType}
        indicatorColor="primary"
        textColor="primary"
        aria-label="disabled tabs example"
        variant="scrollable"
        scrollButtons="auto"
      >
        {communityTypeList.map(type => (
          <Tab
            label={type.name}
            onClick={() => handleTabChange(type.cmTypeId)}
          />
        ))}
      </Tabs>
      <AccompanySearchBar onClick={handleSearchClick} />
      <CommunityListSet communityData={communityData} />

      <Typography
        onClick={() => {
          history.push({
            pathname: '/community/write',
            state: {
              prevpath: history.location.pathname,
              communityPutCheck: false,
              communityTypeList: communityTypeList,
            },
          });
          onChangeCmId(null);
          onChangeTitle('');
          onChangeContents('');
          onChangeType(1);
        }}
      >
        글쓰기
      </Typography>
    </>
  );
};

export default CommunityList;
