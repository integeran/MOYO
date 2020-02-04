import React, { useState, useEffect } from 'react';
import BaseAppBar from '../../components/common/BaseAppBar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from '../../api/axios';
import moment from 'moment';
import { Divider } from '@material-ui/core';

const AccompanyWrite = () => {
  const [cityList, setCityList] = useState([]);
  const [nationList, setNationList] = useState([]);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [nation, setNation] = useState('');
  const [city, setCity] = useState('');
  const [content, setContent] = useState('');
  const userData = useSelector(state => state.auth.userData, []);
  const history = useHistory();

  const getAccompanyNationList = async () => {
    try {
      return await axios.get('accompanyBoard/selectNation', {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAccompanyCityList = async nid => {
    try {
      return await axios.get(`accompanyBoard/selectCity/${nid}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const inputAccompanyBoard = async boardData => {
    try {
      return await axios.post(`accompanyBoard/create`, boardData, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchNationList = async () => {
      const res = await getAccompanyNationList();
      setNationList(res.data.data);
    };
    fetchNationList();
  }, []);

  const handleStartDate = date => {
    setStartDate(date);
  };
  const handleEndDate = date => {
    setEndDate(date);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };
  const handleNationChange = async e => {
    setNation(e.target.value);
    console.log(e.target.value);
    const res = await getAccompanyCityList(e.target.value);
    setCityList(res.data.data);
  };

  const handleCityChange = e => {
    console.log(e);
    setCity(e.target.value);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const handleBackClick = () => {
    history.goBack();
  };
  const handleSubmitClick = async () => {
    const boardData = {
      nid: nation,
      cid: city,
      contents: content,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
      title: title,
      ttypeId: '0',
      uid: userData.uid,
      wantAge: '0',
      wantGender: 'N',
    };
    const fetchBoard = async () => {
      await inputAccompanyBoard(boardData);
      history.goBack();
    };
    fetchBoard();
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
      <form autoComplete="off">
        <Grid container direction="column">
          <Grid container direction="column" style={{ marginBottom: '1rem' }}>
            <Grid item container>
              <Grid xs={3} item>
                <Typography variant="subtitle1" align="right">
                  제목:
                </Typography>
              </Grid>
              <Grid xs={9} item>
                <TextField
                  id="titleInput"
                  value={title}
                  fullWidth
                  onChange={handleTitleChange}
                />
              </Grid>
            </Grid>
            <Grid item container justify="center" alignItems="center">
              <Grid item xs={3}>
                <Typography variant="subtitle1" align="right">
                  여행날짜:
                </Typography>
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={4}>
                  <KeyboardDatePicker
                    disableToolbar
                    autoOk
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="startDatePicker"
                    value={startDate}
                    onChange={handleStartDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="subtitle1" align="center">
                    ~
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <KeyboardDatePicker
                    disableToolbar
                    autoOk
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="endDatePicker"
                    value={endDate}
                    onChange={handleEndDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item container justify="center" alignItems="center">
              <Grid item xs={3}>
                <Typography variant="subtitle1" align="right">
                  장소:
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="nationSelect"
                  select
                  label="도시"
                  fullWidth
                  value={nation}
                  onChange={handleNationChange}
                >
                  {nationList.map(item => (
                    <MenuItem key={item.nid} value={item.nid}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="subtitle1" align="center">
                  /
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="citySelect"
                  select
                  label="나라"
                  fullWidth
                  disabled={`${nation}` ? false : true}
                  value={city}
                  onChange={handleCityChange}
                >
                  {cityList.map(item => (
                    <MenuItem key={item.cid} value={item.cid}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="column">
            <Grid item>
              <Typography variant="subtitle1" align="center">
                여행 타입
              </Typography>
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <Typography variant="subtitle1" align="center">
                원하는 성별
              </Typography>
            </Grid>
            <Grid item container>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" align="center">
                원하는 나이대
              </Typography>
            </Grid>
            <Grid item container>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid item style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <TextField
              id="outlined-multiline-static"
              label="내용"
              multiline
              fullWidth
              rows="10"
              value={content}
              onChange={handleContentChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AccompanyWrite;
