import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';
import moment from '../../api/moment';
import { Grid, Typography, Divider, Paper } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import BaseAppBar from '../../components/common/BaseAppBar';
import styled from 'styled-components';

const HrDiv = styled.div`
  flex-grow: 1;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const MoreAccompanyManage = () => {
  const history = useHistory();
  const userData = useSelector(state => state.auth.userData);
  const [curList, setCurList] = useState([]);
  const [prevList, setPrevList] = useState([]);

  const getAccompanyList = async () => {
    try {
      return axios.get(`accompanyBoard/selectAllByUser/${userData.uid}`, {
        headers: { userToken: localStorage.token },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAccompanyList = async () => {
      const res = await getAccompanyList();
      if (res && res.data && res.data.data) {
        const resData = res.data.data;
        let cur = [];
        let prev = [];
        for (let item of resData) {
          if (
            item.deadlineToggle === 'n' &&
            moment.convertDate() <= moment.convertDate(item.endDate)
          ) {
            item.validDate = true;
            cur.push(item);
          } else {
            item.validDate =
              moment.convertDate() <= moment.convertDate(item.endDate);
            prev.push(item);
          }
        }
        setCurList(cur);
        setPrevList(prev);
      }
    };
    fetchAccompanyList();
  }, []);

  const handleModifyDetail = item => {
    history.push({
      pathname: '/more/accompanyDetail/' + item.acBoardId,
      state: {
        prevpath: history.location.pathname,
        board: item,
      },
    });
  };

  const handleLeftClick = () => {
    history.goBack();
  };

  const TextBar = ({ text }) => (
    <Grid container>
      <div style={{ flexGrow: '0' }}>
        <Typography variant="body1">{text}</Typography>
      </div>
      <HrDiv>
        <Divider style={{ width: '90%' }} />
      </HrDiv>
    </Grid>
  );

  const AccompanyPaper = ({ item }) => (
    <Paper variant="outlined" onClick={() => handleModifyDetail(item)}>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h6">{item.title}</Typography>
        </Grid>
        <Grid item container xs={4} direction="column">
          <Grid item>
            {item.nation}/{item.city}
          </Grid>
          <Grid item>{item.type}</Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={7}>
          {moment.momentDate(item.startDate)}~{moment.momentDate(item.endDate)}
        </Grid>
        <Grid item xs={5}>
          {moment.momentDate(item.updateDate)}
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <>
      <BaseAppBar
        text="내 동행 관리"
        leftType="icon"
        leftIcon={<ArrowBackIosIcon />}
        leftClick={handleLeftClick}
      />
      <TextBar text="진행중인 동행 글" />
      {curList.map(item => (
        <AccompanyPaper key={item.acBoardId} item={item} />
      ))}
      <TextBar text="종료된 동행 글" />
      {prevList.map(item => (
        <AccompanyPaper key={item.acBoardId} item={item} />
      ))}
    </>
  );
};

export default MoreAccompanyManage;
