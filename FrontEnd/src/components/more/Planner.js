import React, { useState } from 'react';
import PlanTravel from './PlanTravel';
import PlanDaily from './PlanDaily';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Tabs, Tab, Grid, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Planner = () => {
  const classes = useStyles();
  const selectedDate = useSelector(state => state.planDate.selectedDate);
  const [tabsValue, setTabsValue] = React.useState('');

  const handleChangeTabs = (event, newValue) => {
    setTabsValue(newValue);
  };

  const [schedule, setSchedule] = useState('none');

  const handleChangeSchedule = value => {
    setSchedule(value);
  };

  let planPage = '';

  if (schedule === 'travel') {
    planPage = <PlanTravel />;
  } else if (schedule === 'daily') {
    planPage = <PlanDaily />;
  }
  return (
    <>
      <Divider />
      <Grid
        container
        direction="column"
        justify="center"
        style={{ margin: '0px' }}
        wrap="nowrap"
      >
        <Grid
          item
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1em',
          }}
        >
          <Typography variant="h6">{selectedDate.split('T')[0]}</Typography>
        </Grid>
        <Grid item>
          <Paper className={classes.root} elevation={0}>
            <Tabs
              value={tabsValue}
              onChange={handleChangeTabs}
              indicatorColor="primary"
              textColor="primary"
              centered
              variant="fullWidth"
            >
              <Tab
                label="여행 일정"
                onClick={() => handleChangeSchedule('travel')}
              />
              <Tab
                label="동행자 / 메모"
                onClick={() => handleChangeSchedule('daily')}
              />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item>{planPage}</Grid>
      </Grid>
    </>
  );
};

export default Planner;
