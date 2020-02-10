import React from 'react';
import Carousel from 'nuka-carousel';
import { Typography, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import adTrip1 from '../../../assets/img/ad_trip_1.jpg';
import adTrip2 from '../../../assets/img/ad_trip_2.jpg';
import adTrip3 from '../../../assets/img/ad_trip_3.jpg';

const AdvertisingContents = () => {
  const history = useHistory();
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5">오늘의 광고</Typography>
      </Grid>
      <Grid item>
        <Carousel
          autoplay
          autoplayInterval={3000}
          wrapAround
          defaultControlsConfig={{
            pagingDotsStyle: {
              fill: 'white',
            },
          }}
          renderCenterLeftControls={() => null}
          renderCenterRightControls={() => null}
        >
          <img alt="ad1" src={adTrip1} />
          <img alt="ad2" src={adTrip2} />
          <img alt="ad3" src={adTrip3} />
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default AdvertisingContents;
