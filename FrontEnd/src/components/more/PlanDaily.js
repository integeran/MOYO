import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Companion from './Companion';
import Memo from './Memo';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
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

  const selectedDate = useSelector(state => state.planDate.selectedDate);
  const planCompanionList = useSelector(
    state => state.morePlanCompanion.planCompanionList,
  );

  const [isCompanion, setIsCompanion] = useState(false);

  useEffect(() => {
    const checkCompanion = planCompanionList.find(
      item => item.day.split(' ')[0] === selectedDate.split('T')[0],
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
        <Grid item container justify="space-between">
          <Grid item className={classes.center} xs={6}>
            {isCompanion && <Typography variant="h6">오늘의 동행!</Typography>}
          </Grid>
        </Grid>
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
