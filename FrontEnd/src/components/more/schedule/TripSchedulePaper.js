import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Typography, Paper, Grid } from '@material-ui/core';

const BannerDateTypo = styled(Typography)`
  padding: 0.4rem 0;
`;

const BannerNationTypo = styled(Typography)`
  padding: 0.2rem 0;
`;

const TripPaper = ({ scheduleInfo }) => {
  const dateToStr = date => moment(date).format('YYYY-MM-DD');
  const dynamicImg = require(`../../../assets/img/banner_${scheduleInfo.nid}.jpg`);

  const BannerGrid = styled(Grid)`
    border-radius: 4px 4px 4px 4px;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 10%,
        rgba(255, 255, 255, 0)
      ),
      url(${dynamicImg});
    background-size: 100% 100%;
  `;
  return (
    <Paper elevation={1}>
      <Grid item container>
        <Grid item xs={7}>
          <BannerDateTypo variant="h6" align="center">
            {dateToStr(scheduleInfo.startDate)}~
            {dateToStr(scheduleInfo.endDate)}
          </BannerDateTypo>
          <BannerNationTypo variant="subtitle1" align="center">
            {scheduleInfo.nation}/{scheduleInfo.city}
          </BannerNationTypo>
        </Grid>
        <BannerGrid item xs={5} />
      </Grid>
    </Paper>
  );
};

export default TripPaper;
