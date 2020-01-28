import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

const PlanTravel = () => {
  const selectedDate = useSelector(state => state.planDate.selectedDate);
  const [selectedStartDate, setSelectedStartDate] = useState(selectedDate);

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
              label="시작"
              //   autoOk
              //   clearable
              value={selectedStartDate}
              onChange={setSelectedStartDate}
            />
            <Divider />
            <DatePicker
              label="끝"
              //   autoOk
              //   clearable
              value={selectedEndDate}
              onChange={setSelectedEndDate}
            />
          </MuiPickersUtilsProvider>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlanTravel;
