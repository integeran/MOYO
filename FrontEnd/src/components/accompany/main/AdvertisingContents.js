import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const AdvertisingContents = () => {
  const sliderSetting = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6">당신을 위한 광고</Typography>
      </Grid>
      <Grid item>
        <Slider {...sliderSetting} style={{ width: 'inherit' }}>
          <div style={{ width: '100%' }}>
            <h3>1</h3>
          </div>
          <div style={{ width: '100%' }}>
            <h3>2</h3>
          </div>
          <div style={{ width: '100%' }}>
            <h3>3</h3>
          </div>
        </Slider>
      </Grid>
    </Grid>
  );
};

export default AdvertisingContents;
