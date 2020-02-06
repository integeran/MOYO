import React, { useState } from 'react';
import PlanTravel from './PlanTravel';
import PlanDaily from './PlanDaily';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Planner = () => {
  const classes = useStyles();
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
      <Grid
        container
        direction="column"
        justify="center"
        style={{ width: 'inherit', height: 'inherit', margin: '0px' }}
      >
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
