import React from 'react';
import Carousel from 'nuka-carousel';
import { Typography, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import ad1 from '../../../assets/img/promotion_prague.svg';
import ad2 from '../../../assets/img/promotion_dubrovnik.svg';
import styled from 'styled-components';

const AdvertisingImage = styled.img`
  border-radius: 1rem;
`;

const AdvertisingContents = () => {
  const history = useHistory();
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h6" style={{ padding: '0.5rem' }}>
          프로모션
        </Typography>
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
          <AdvertisingImage alt="ad1" src={ad1} />
          <AdvertisingImage alt="ad2" src={ad2} />
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default AdvertisingContents;
