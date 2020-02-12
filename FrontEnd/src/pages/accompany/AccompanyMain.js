import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from '../../api/axios';
import moment from 'moment';

import ButtonContents from '../../components/accompany/main/ButtonContents';
import ScheduleContents from '../../components/accompany/main/ScheduleContents';
import AdvertisingContents from '../../components/accompany/main/AdvertisingContents';
import TitleContents from '../../components/accompany/main/TitleContents';

import { Grid } from '@material-ui/core';
import styled from 'styled-components';

const InnerGrid = styled(Grid)`
  width: 85%;
  margin: 0 auto !important;
  margin-top: 1rem !important;
  margin-bottom: 1.2rem !important;
`;

const AccompanyMain = () => {
  const history = useHistory();
  const userData = useSelector(state => state.auth.userData);
  const [tripSchedule, setTripSchedule] = useState([]);
  const [tripCompanion, setTripCompanion] = useState([]);

  const getTripSchedule = async () => {
    try {
      const momentDate = moment(new Date()).format('YYYY-MM-DD');
      return await axios.get(
        `scheduleList/selectAllByUser/${userData.uid}/${momentDate}`,
        {
          headers: { userToken: userData.userToken },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getTripCompanion = async () => {
    try {
      const momentDate = moment(new Date()).format('YYYY-MM-DD');
      return await axios.get(
        `dailyAccompany/selectAllByUser/${userData.uid}/${momentDate}`,
        {
          headers: { userToken: userData.userToken },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTripInfo = async () => {
      const sRes = await getTripSchedule();
      const cRes = await getTripCompanion();
      if (sRes && sRes.data && sRes.data.data) {
        setTripSchedule(sRes.data.data);
      }
      if (cRes && cRes.data && cRes.data.data) {
        setTripCompanion(cRes.data.data);
      }
    };

    fetchTripInfo();
  }, []);

  const handleAccompanyFindClick = () => {
    history.push({
      pathname: '/accompany/accSetLoc',
      state: { prevpath: history.location.pathname },
    });
  };

  const handleAccompanyWriteClick = () => {
    history.push({
      pathname: '/accompany/write',
      state: { prevpath: history.location.pathname },
    });
  };

  return (
    <Grid container direction="column">
      <TitleContents />
      <InnerGrid item>
        <ButtonContents
          onFindClick={handleAccompanyFindClick}
          onWriteClick={handleAccompanyWriteClick}
        />
      </InnerGrid>
      <InnerGrid item>
        <ScheduleContents
          tripSchedule={tripSchedule}
          tripCompanion={tripCompanion}
        />
      </InnerGrid>
      <InnerGrid item>
        <AdvertisingContents />
      </InnerGrid>
    </Grid>
  );
};

export default AccompanyMain;
