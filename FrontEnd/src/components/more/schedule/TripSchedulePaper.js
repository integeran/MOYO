import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core';

const InnerGrid = styled(Grid)`
  width: 85%;
  margin: 0 auto !important;
  margin-top: 1rem !important;
  margin-bottom: 1.2rem !important;
`;

const BannerDateTypo = styled(Typography)`
  padding: 0.4rem 0;
`;

const BannerNationTypo = styled(Typography)`
  padding: 0.2rem 0;
`;

const TripPaper = ({ scheduleInfo }) => {
  console.log(scheduleInfo);
  const dateToStr = date => moment(date).format('YYYY.MM.DD');

  const BannerGrid = styled(Grid)`
    border-radius: 4px 4px 4px 4px;
    background: url(${`https://storage.cloud.google.com/moyo-cloud-storage/city/${scheduleInfo.cid}.svg`});
    background-size: 100% 100%;
  `;
  return (
    <InnerGrid
      container
      elevation={1}
      style={{ height: '4.8rem', backgroundColor: 'white' }}
    >
      <Card elevation={0} style={{ width: '100%', marginBottom: '1rem' }}>
        <CardActionArea>
          <CardMedia
            image={`https://storage.cloud.google.com/moyo-cloud-storage/city/${scheduleInfo.cid}.svg`}
            alt="city image"
            style={{ height: '5rem' }}
          />
          <CardContent
            style={{
              padding: '0.4rem 0 0 0.7rem',
            }}
          >
            <BannerDateTypo
              align="left"
              style={{
                fontSize: '1rem',
                fontWeight: '700',
                padding: '0 0 0.2rem 0',
                letterSpacing: '-0.05rem',
              }}
            >
              {dateToStr(scheduleInfo.startDate)} ~{' '}
              {dateToStr(scheduleInfo.endDate)}
            </BannerDateTypo>
            <Typography align="left" style={{ fontSize: '1rem' }} component="p">
              {scheduleInfo.city}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{ paddingTop: '0rem', paddingBottom: '0rem', float: 'right' }}
        >
          <Button size="small" color="secondary">
            수정
          </Button>
          <Button size="small" color="error">
            삭제
          </Button>
        </CardActions>
      </Card>
    </InnerGrid>
    // <Card display="flex">
    //   <div display="flex" flexDirection="column">
    //     <CardActionArea flex="1 0 auto">
    //       <CardContent>테스트</CardContent>
    //     </CardActionArea>
    //   </div>
    //   <CardMedia
    //     component="img"
    //     alt="city"
    //     image={`https://storage.cloud.google.com/moyo-cloud-storage/city/${scheduleInfo.cid}.svg`}
    //   />
    // </Card>
    // <Paper elevation={1}>
    //   <Grid item container>
    //     <BannerGrid item>
    //       <Grid item>
    //         <BannerDateTypo variant="h6" align="center">
    //           {dateToStr(scheduleInfo.startDate)}~
    //           {dateToStr(scheduleInfo.endDate)}
    //         </BannerDateTypo>
    //         <BannerNationTypo variant="subtitle1" align="center">
    //           {scheduleInfo.nation}/{scheduleInfo.city}
    //         </BannerNationTypo>
    //       </Grid>
    //     </BannerGrid>
    //   </Grid>
    // </Paper>
  );
};

export default TripPaper;
