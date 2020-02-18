import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Companion from './Companion';
import Memo from './Memo';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Divider from '@material-ui/core/Divider';

const PlanDaily = () => {
  const useStyles = makeStyles(theme => ({
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

  const classes = useStyles();

  const planCompanionList = useSelector(
    state => state.morePlanCompanion.planCompanionList,
  );

  const [isCompanion, setIsCompanion] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const checkCompanion = planCompanionList.find(
      item =>
        item.day.split(' ')[0] === selectedDate.toISOString().split('T', 1)[0],
    );
    if (checkCompanion) {
      setIsCompanion(true);
    } else {
      setIsCompanion(false);
    }
  }, [selectedDate]);

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        style={{ width: 'inherit', height: 'inherit', margin: '0px' }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            format="yyyy/MM/dd"
            margin="normal"
            id="date-picker-dialog"
            label="날짜를 선택하세요"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            style={{ width: '50%', marginBottom: '1.5rem' }}
          />
        </MuiPickersUtilsProvider>

        {isCompanion && (
          <Grid item>
            <Companion setIsCompanion={setIsCompanion} />
          </Grid>
        )}
        {/* <Grid item>
          <Divider variant="fullWidth" />
        </Grid> */}
        <Grid item>
          <Memo />
        </Grid>
      </Grid>
    </>
  );
};

export default PlanDaily;
