import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storeCompanion } from '../../modules/morePlanCompanion';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import axios from '../../api/axios';

const Companion = () => {
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

  const handleDeleteCompanion = async dId => {
    await deleteCompanion(dId);
    const comData = await getCompanion();
    dispatch(storeCompanion(comData.data.data));
  };

  const companionList = todayCompanion.map(item => (
    <li key={item.dacId}>
      {item.accompanyNickname} /{' '}
      <a onClick={() => handleClickOpenUpdate(item)}>수정</a> /{' '}
      <a
        onClick={() => {
          handleDeleteCompanion(item.dacId);
        }}
      >
        삭제
      </a>
    </li>
  ));

  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleClickOpenUpdate = item => {
    setSelectedDateUpdate(item.day);
    setSelectedId(item.dacId);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const [selectedDateUpdate, setSelectedDateUpdate] = React.useState(false);

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
  };

  const [selectedId, setSelectedId] = React.useState('');

  return (
    <div>
      <ul>{companionList}</ul>

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
    </div>
  );
};

export default Companion;
