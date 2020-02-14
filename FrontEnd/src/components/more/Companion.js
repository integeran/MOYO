import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storeCompanion } from '../../modules/morePlanCompanion';
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import axios from '../../api/axios';
import TripCompanionSet from './schedule/TripCompanionSet';

const Companion = props => {
  const setIsCompanion = props.setIsCompanion;
  const dispatch = useDispatch();

  const userData = useSelector(state => state.auth.userData);
  const selectedDate = useSelector(state => state.planDate.selectedDate);
  const planCompanionList = useSelector(
    state => state.morePlanCompanion.planCompanionList,
  );
  const todayCompanion = planCompanionList.filter(
    item => item.day.split(' ')[0] === selectedDate.split('T')[0],
  );

  const getCompanion = async () => {
    try {
      return await axios.get(`dailyAccompany/selectAllByUser/${userData.uid}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCompanion = async dId => {
    try {
      return await axios.delete(`dailyAccompany/delete/${dId}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedDateUpdate, setSelectedDateUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenUpdate = item => {
    setSelectedDateUpdate(item.day);
    setSelectedId(item.dacId);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const putCompanion = async () => {
    try {
      return await axios.put(
        'dailyAccompany/update',
        {
          uid: userData.uid,
          dacId: selectedId,
          day: moment(selectedDateUpdate).format('YYYY-MM-DD'),
        },
        { headers: { userToken: userData.userToken } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const putCompanionRequest = async () => {
    await putCompanion();
    const comData = await getCompanion();
    dispatch(storeCompanion(comData.data.data));
    setOpenUpdate(false);
    setIsCompanion(false);
  };

  const handleDeleteCompanion = async () => {
    await deleteCompanion(selectedId);
    const comData = await getCompanion();
    dispatch(storeCompanion(comData.data.data));
    setSelectedId('');
    setOpenDelete(false);
    setIsCompanion(false);
  };

  const handleClickOpenDelete = dId => {
    setOpenDelete(true);
    setSelectedId(dId);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedId('');
  };

  const companionList = todayCompanion.map(item => (
    <Grid container item>
      <Grid item xs={11}>
        <TripCompanionSet companionInfo={item} />
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
              handleClickOpenDelete(item.dacId);
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  ));

  return (
    <div>
      {companionList}
      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">동행 날짜 변경</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              variant="dialog"
              label="날짜를 선택해주세요"
              value={selectedDateUpdate}
              onChange={setSelectedDateUpdate}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="primary">
            취소
          </Button>
          <Button onClick={putCompanionRequest} color="primary">
            수정
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">정말 삭제하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            취소
          </Button>
          <Button onClick={handleDeleteCompanion} color="secondary">
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Companion;
