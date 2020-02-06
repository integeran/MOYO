import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Typography, Grid } from '@material-ui/core';
import TripSchedulePaper from '../../more/schedule/TripSchedulePaper';
import TripCompanionSet from '../../more/schedule/TripCompanionSet';

const SubtitleTypo = styled.span`
  display: block;
  padding: 0.5em 0.5em;
  font-weight: 700;
  font-size: 1.2em;
`;

const ScheduleContents = ({ tripSchedule, tripCompanion }) => {
  return (
    <>
      <Typography variant="h5" align="center">
        {moment(new Date()).format('YYYY MM. DD(ddd)')}
      </Typography>
      <SubtitleTypo variant="h6">오늘의 여행</SubtitleTypo>
      <Grid container direction="column" spacing={1} wrap="nowrap">
        {tripSchedule.length > 0 &&
          tripSchedule.map(item => (
            <Grid item>
              <TripSchedulePaper scheduleInfo={item} key={item.slistId} />
            </Grid>
          ))}
      </Grid>
      <SubtitleTypo variant="h6">오늘의 동행</SubtitleTypo>
      <Grid container spacing={3}>
        {tripCompanion.length > 0 &&
          tripCompanion.map(item => (
            <Grid item xs={6}>
              <TripCompanionSet companionInfo={item} key={item.dacId} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default ScheduleContents;
