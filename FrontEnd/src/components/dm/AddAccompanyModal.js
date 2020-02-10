import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    width: '100%',
    transform: 'translateZ(0)',
    position: 'absolute',
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AddAccompanyModal = ({ isOpen, close, receiver }) => {
  const userData = useSelector(state => state.auth.userData);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const classes = useStyles();
  const rootRef = React.useRef(null);

  const addAccompany = async () => {
    var distanceTime = Math.ceil((endDate - startDate) / (1000 * 3600 * 24));
    var times = [];
    for (var i = 0; i <= distanceTime; i++) {
      times.push(
        moment(startDate)
          .add(i, 'days')
          .format('YYYY-MM-DD'),
      );
    }

    const res = await onAxiosPostAccompany(times);
    if (res) {
      alert('날짜 추가가 완료되었습니다.');
      close();
    } else {
      alert('날짜 추가 중 에러가 발생했습니다.');
    }
  };

  const onAxiosPostAccompany = async times => {
    return await axios.post(
      'dailyAccompany/create',
      {
        uid: userData.uid,
        accompanyId: receiver.uid,
        days: times,
      },
      {
        headers: { userToken: userData.userToken },
      },
    );
  };

  return isOpen ? (
    <div className={classes.root} ref={rootRef}>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container direction="column" alignItems="center">
              <Grid item xs={3} style={{ maxWidth: '100%' }}>
                <Grid container>
                  <Grid item xs={12}>
                    <DatePicker
                      disablePast
                      openTo="year"
                      format="yyyy/MM/dd"
                      label="시작날짜"
                      value={startDate}
                      onChange={setStartDate}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={2} style={{ marginBottom: '10%' }}></Grid>

              <Grid item xs={3} style={{ maxWidth: '100%' }}>
                <Grid container>
                  <Grid item xs={12}>
                    <DatePicker
                      disablePast
                      openTo="year"
                      format="yyyy/MM/dd"
                      label="종료날짜"
                      value={endDate}
                      onChange={setEndDate}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={2} style={{ marginBottom: '10%' }}></Grid>

              <Grid item xs={2} style={{ maxWidth: '100%' }}>
                <Grid container>
                  <Grid item xs={6}>
                    <Button
                      style={{ backgroundColor: '#284BB5', color: 'white' }}
                      onClick={addAccompany}
                    >
                      확인
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      style={{ backgroundColor: '#284BB5', color: 'white' }}
                      onClick={close}
                    >
                      취소
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
      </Modal>
    </div>
  ) : null;
};

export default AddAccompanyModal;
