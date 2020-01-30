import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import { storeSchedule } from '../../modules/morePlanTravel';

const nationData = [
  { nid: 2, name: '프랑스' },
  { nid: 3, name: '스페인' },
  { nid: 4, name: '이탈리아' },
  { nid: 5, name: '스위스' },
  { nid: 6, name: '영국' },
  { nid: 7, name: '독일' },
  { nid: 8, name: '포르투갈' },
  { nid: 9, name: '크로아티아' },
];
const cityData = [
  { cid: 1, nid: 2, name: '파리' },
  { cid: 2, nid: 2, name: '니스' },
  { cid: 3, nid: 3, name: '바르셀로나' },
  { cid: 4, nid: 3, name: '마드리드' },
  { cid: 5, nid: 4, name: '피렌체' },
  { cid: 6, nid: 4, name: '로마' },
];

const PlanTravel = () => {
  const dispatch = useDispatch();
  const [nation, setNation] = useState('');
  const [cityList, setCityList] = useState([]);
  const handleChangeNation = event => {
    setNation(event.target.value);
    setCityList(cityData.filter(item => item.nid === event.target.value));
  };

  const [city, setCity] = useState('');
  const handleChangeCity = event => {
    setCity(event.target.value);
  };

  const selectedDate = useSelector(state => state.planDate.selectedDate);
  const [selectedStartDate, setSelectedStartDate] = useState(selectedDate);

  const userData = useSelector(state => state.auth.userData);

  useEffect(() => {
    setSelectedStartDate(selectedDate);
  }, [selectedDate]);

  const [selectedEndDate, setSelectedEndDate] = useState(selectedStartDate);

  useEffect(() => {
    setSelectedEndDate(selectedStartDate);
  }, [selectedStartDate]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const axios = require('axios');

  const postPlanTravelServer = async () => {
    try {
      return await axios.post(
        'http://70.12.247.75:8080/scheduleList/create',
        {
          uid: userData.uid,
          cid: city,
          nid: nation,
          startDate: moment(selectedStartDate).format('YYYY-MM-DD'),
          endDate: moment(selectedEndDate).format('YYYY-MM-DD 12:00:00'),
        },
        { headers: { userToken: userData.userToken } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getSchedule = async () => {
    try {
      return await axios.get(
        `http://70.12.247.75:8080/scheduleList/selectAllByUser/${userData.uid}`,
        { headers: { userToken: userData.userToken } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const postPlanTravel = async () => {
    const resData = await postPlanTravelServer();
    const schData = await getSchedule();
    dispatch(storeSchedule(schData.data.data));
    setOpen(false);
    // console.log(selectedStartDate);
    // console.log(selectedEndDate);
  };

  // useEffect(() => {
  //   async function getData() {
  //     const resData = await getSchedule();
  //     dispatch(storeSchedule(resData.data.data));
  //   }
  //   getData();
  // }, []);

  return (
    <div>
      <h2>여행일정</h2>

      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        여행 계획 추가
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">여행 일정 추가</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              variant="dialog"
              label="시작"
              value={selectedStartDate}
              onChange={setSelectedStartDate}
            />
            <DatePicker
              disableToolbar
              variant="dialog"
              label="끝"
              value={selectedEndDate}
              onChange={setSelectedEndDate}
              minDate={selectedStartDate}
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="standard-select-currency"
            select
            fullWidth
            label="나라"
            value={nation}
            onChange={handleChangeNation}
          >
            {nationData.map(option => (
              <MenuItem key={option.nid} value={option.nid}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            fullWidth
            label="도시"
            value={city}
            onChange={handleChangeCity}
          >
            {cityList.map(option => (
              <MenuItem key={option.cid} value={option.cid}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={postPlanTravel} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlanTravel;
