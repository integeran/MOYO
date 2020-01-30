import React, { useState } from 'react';
import BaseAppBar from '../../components/common/BaseAppBar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useHistory } from 'react-router';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const nations = [
  { nid: 2, name: '프랑스' },
  { nid: 3, name: '스페인' },
  { nid: 4, name: '이탈리아' },
  { nid: 5, name: '스위스' },
  { nid: 6, name: '영국' },
  { nid: 7, name: '독일' },
  { nid: 8, name: '포르투갈' },
  { nid: 9, name: '크로아티아' },
];
const citys = [
  { cid: 1, nid: 2, name: '파리' },
  { cid: 2, nid: 2, name: '니스' },
  { cid: 3, nid: 3, name: '바르셀로나' },
  { cid: 4, nid: 3, name: '마드리드' },
  { cid: 5, nid: 4, name: '피렌체' },
  { cid: 6, nid: 4, name: '로마' },
];
const AccompanyWrite = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [nation, setNation] = useState('');
  const [city, setCity] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();

  //   const insertAccompanyBoard = async (data) => {
  //     try {
  //       return await axios.post(
  //         'http://70.12.246.66:8080/scheduleList/create',
  //         {
  //           uid: data.uid,
  //           cid: city,
  //           nid: nation,
  //           startDate: moment(selectedStartDate).format('YYYY-MM-DD'),
  //           endDate: moment(selectedEndDate).format('YYYY-MM-DD 12:00:00'),
  //         },
  //         { headers: { userToken: userData.userToken } },
  //       );
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const handleSubmitClick = async e => {
  //     e.preventDefault();
  //     const insertBoardData = {
  //       title: title,
  //       startDate: moment(startDate).format('YYYY-MM-DD'),
  //       endDate: moment(endDate).format('YYYY-MM-DD'),
  //       nation:
  //     };
  //     // const resData = await insertAccompanyBoard(insertBoardData);
  //     console.log(title);
  //     console.log(startDate);
  //     console.log(endDate);
  //     console.log(nation);
  //     console.log(city);
  //     console.log(content);
  //   };

  const handleStartDate = date => {
    setStartDate(date);
  };
  const handleEndDate = date => {
    setEndDate(date);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };
  const handleNationChange = e => {
    setNation(e.target.value);
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

  return (
    <div>
      <BaseAppBar
        title="글 작성하기"
        Icon1={<ArrowBackIosIcon />}
        Icon2={<CheckCircleOutlineIcon type="submit" />}
        handleClick1={handleBackClick}
        // handleClick2={}
      />
      <form autoComplete="off">
        <Grid container direction="column">
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
                {nations.map(item => (
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
                value={city}
                onChange={handleCityChange}
              >
                {citys.map(item => (
                  <MenuItem key={item.cid} value={item.cid}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: '2rem' }}>
            <TextField
              id="outlined-multiline-static"
              label="내용"
              multiline
              fullWidth
              rows="5"
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
