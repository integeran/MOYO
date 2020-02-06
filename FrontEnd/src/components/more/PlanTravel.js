import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { storeSchedule } from '../../modules/morePlanTravel';
import axios from '../../api/axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import TripPaper from './schedule/TripSchedulePaper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
  const useStyles = makeStyles(theme => ({
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

  const classes = useStyles();

  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const [nation, setNation] = useState('');
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState('');
  const selectedDate = useSelector(state => state.planDate.selectedDate);
  const [selectedStartDate, setSelectedStartDate] = useState(selectedDate);
  const [selectedEndDate, setSelectedEndDate] = useState(selectedStartDate);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const planTravelList = useSelector(
    state => state.morePlanTravel.planTravelList,
  );
  const [nationUpdate, setNationUpdate] = useState('');
  const [cityListUpdate, setCityListUpdate] = useState([]);
  const [cityUpdate, setCityUpdate] = useState('');
  const [selectedStartDateUpdate, setSelectedStartDateUpdate] = useState('');
  const [selectedEndDateUpdate, setSelectedEndDateUpdate] = useState('');
  const [selectedListId, setSelectedListId] = useState('');

  const handleChangeNation = event => {
    setNation(event.target.value);
    setCityList(cityData.filter(item => item.nid === event.target.value));
  };

  const handleChangeCity = event => {
    setCity(event.target.value);
  };

  useEffect(() => {
    setSelectedStartDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    setSelectedEndDate(selectedStartDate);
  }, [selectedStartDate]);

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setSelectedStartDate(selectedDate);
    setSelectedEndDate(selectedDate);
    setNation('');
    setCityList([]);
    setOpenCreate(false);
  };

  const handleClickOpenUpdate = item => {
    setNationUpdate(item.nid);
    setCityUpdate(item.cid);
    setCityListUpdate(cityData.filter(i => i.nid === item.nid));
    setSelectedStartDateUpdate(item.startDate);
    setSelectedEndDateUpdate(item.endDate);
    setSelectedListId(item.slistId);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const postPlanTravelServer = async () => {
    try {
      return await axios.post(
        'scheduleList/create',
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
      return await axios.get(`scheduleList/selectAllByUser/${userData.uid}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const postPlanTravel = async () => {
    await postPlanTravelServer();
    const schData = await getSchedule();
    dispatch(storeSchedule(schData.data.data));
    setOpenCreate(false);
  };

  const deleteSchedule = async sId => {
    try {
      return await axios.delete(`scheduleList/delete/${sId}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSchedule = async sId => {
    await deleteSchedule(sId);
    const schData = await getSchedule();
    dispatch(storeSchedule(schData.data.data));
  };

  const newTravelList = planTravelList.map(item => (
    <Grid container item>
      <Grid item xs={11}>
        <TripPaper scheduleInfo={item} />
      </Grid>
      <Grid
        item
        container
        xs={1}
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <EditIcon onClick={() => handleClickOpenUpdate(item)} />
        </Grid>
        <Grid item>
          <DeleteIcon
            onClick={() => {
              handleDeleteSchedule(item.slistId);
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  ));

  const handleChangeNationUpdate = event => {
    setNationUpdate(event.target.value);
    setCityListUpdate(cityData.filter(item => item.nid === event.target.value));
  };

  const handleChangeCityUpdate = event => {
    setCityUpdate(event.target.value);
  };

  const putPlanTravelServer = async () => {
    try {
      return await axios.put(
        'scheduleList/update',
        {
          uid: userData.uid,
          cid: cityUpdate,
          nid: nationUpdate,
          slistId: selectedListId,
          startDate: moment(selectedStartDateUpdate).format('YYYY-MM-DD'),
          endDate: moment(selectedEndDateUpdate).format('YYYY-MM-DD 12:00:00'),
        },
        { headers: { userToken: userData.userToken } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const putPlanTravel = async () => {
    await putPlanTravelServer();
    const schData = await getSchedule();
    dispatch(storeSchedule(schData.data.data));
    setOpenUpdate(false);
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        style={{ width: 'inherit', height: 'inherit', margin: '0px' }}
      >
        <Grid item container justify="space-between">
          <Grid item className={classes.center} xs={6}>
            <Typography variant="h6">{selectedDate.split('T')[0]}</Typography>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item className={classes.center} xs={3}>
            {/* <Typography variant="button">여행 추가</Typography> */}
            <AddIcon onClick={handleClickOpenCreate} />
          </Grid>
        </Grid>
        {newTravelList}
      </Grid>

      <Dialog
        open={openCreate}
        onClose={handleCloseCreate}
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
          <Button onClick={handleCloseCreate} color="primary">
            취소
          </Button>
          <Button onClick={postPlanTravel} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">여행 일정 수정</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              variant="dialog"
              label="시작"
              value={selectedStartDateUpdate}
              onChange={setSelectedStartDateUpdate}
            />
            <DatePicker
              disableToolbar
              variant="dialog"
              label="끝"
              value={selectedEndDateUpdate}
              onChange={setSelectedEndDateUpdate}
              minDate={selectedStartDateUpdate}
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="standard-select-currency"
            select
            fullWidth
            label="나라"
            value={nationUpdate}
            onChange={handleChangeNationUpdate}
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
            value={cityUpdate}
            onChange={handleChangeCityUpdate}
          >
            {cityListUpdate.map(option => (
              <MenuItem key={option.cid} value={option.cid}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="primary">
            취소
          </Button>
          <Button onClick={putPlanTravel} color="primary">
            수정
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlanTravel;
