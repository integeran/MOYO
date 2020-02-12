import React, { createRef, useState } from 'react';
import moment from '../../../api/moment';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { Typography, Grid, Avatar } from '@material-ui/core';
import TempImage from '../../../assets/img/banner_paris.svg';

const HeaderDiv = styled.div`
  position: relative;
  display: block;
  background-color: white;
  & > img {
    border-radius: 1.2rem 1.2rem 0rem 0rem;
    width: 100%;
    max-height: 13rem;
  }
  & > .headerTextDiv {
    border-radius: 1.2rem 1.2rem 0rem 0rem;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    backdrop-filter: brightness(70%);
    text-align: center;
  }
`;

const CompanionAvatar = styled(Avatar)`
  width: 13vw !important;
  height: 13vw !important;
  max-width: 125px !important;
  max-height: 125px !important;
`;

const BottomGrid = styled(Grid)`
  background-color: white;
  width: 100%;
  border-radius: 0rem 0rem 1.2rem 1.2rem;
`;

const HorizonContainer = styled.div`
  overflow: auto;
  white-space: nowrap;
  & > .companionContainer {
    display: inline-block;
    margin: 0.4rem 0.9rem;
    text-align: center;
  }
`;
const ScheduleContents = ({ tripSchedule, tripCompanion }) => {
  const [carousrl, setCarousrl] = useState(() => createRef());
  const _handleLoadImage = e => {
    carousrl.current.setDimensions();
  };

  const TripScheduleItem = ({ item }) => (
    <HeaderDiv>
      <img alt="innerImg" src={TempImage} onLoad={_handleLoadImage} />
      <div className="headerTextDiv">
        <Typography variant="h6" style={{ color: 'white' }}>
          {item.nation}/{item.city}
        </Typography>
      </div>
    </HeaderDiv>
  );

  return (
    <>
      <Typography variant="h6" style={{ padding: '0.5rem' }}>
        {moment.momentDateDayWithoutYear()}, 오늘의 여행
      </Typography>
      <Grid container direction="column" wrap="nowrap">
        <Grid item>
          <Carousel
            ref={carousrl}
            autoplay
            autoplayInterval={6000}
            wrapAround="true"
            defaultControlsConfig={{
              pagingDotsStyle: {
                fill: 'white',
              },
            }}
            renderCenterLeftControls={() => null}
            renderCenterRightControls={() => null}
          >
            {tripSchedule.map(item => (
              <TripScheduleItem item={item} />
            ))}
          </Carousel>
        </Grid>

        <BottomGrid item>
          <HorizonContainer>
            {tripCompanion.map(user => (
              <div className="companionContainer" key={user.dacId}>
                <CompanionAvatar src={user.accompanyImage} />
                <Typography variant="caption">
                  {user.accompanyNickname}
                </Typography>
              </div>
            ))}
          </HorizonContainer>
        </BottomGrid>
      </Grid>
    </>
  );
};

export default ScheduleContents;
