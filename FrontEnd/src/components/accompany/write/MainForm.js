import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Grid, Typography, TextField, MenuItem } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

const MainForm = ({ ...props }) => {
  return (
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
            value={props.title}
            fullWidth
            onChange={props.onTitleChange}
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
              value={props.startDate}
              onChange={props.onStartDateChange}
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
              value={props.endDate}
              onChange={props.onEndDateChange}
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
            value={props.nation}
            onChange={props.onNationChange}
          >
            {props.nationList.map(item => (
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
            disabled={`${props.nation}` ? false : true}
            value={props.city}
            onChange={props.onCityChange}
          >
            {props.cityList.map(item => (
              <MenuItem key={item.cid} value={item.cid}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainForm;
