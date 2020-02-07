import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from '../../api/axios';
import CommunityListSet from '../../components/community/CommunityListSet';

const CommunityList = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData, []);
  const [communityData, setCommunityData] = useState([]);

  const getCommunityList = async () => {
    try {
      return await axios.get('community/selectAll', {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCommunity = async () => {
      const result = await getCommunityList();
      const resData = result.data.data.map(item => {
        return {
          ...item,
        };
      });
      setCommunityData(resData);
    };
    getCommunity();
  }, []);

  return (
    <>
      <CommunityListSet communityData={communityData} />
    </>
  );
};

export default CommunityList;
