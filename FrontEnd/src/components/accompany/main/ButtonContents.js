import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import accompanyFindImg from '../../../assets/img/accompany_find.PNG';
import accompanyWriteImg from '../../../assets/img/accompany_write.PNG';

const TitleTypo = styled(Typography)`
  padding: 1.2rem 2rem;
`;

const ButtonContainerGrid = styled(Grid)`
  position: relative;
  padding: 0 2rem !important;
`;

const RoundImage = styled.img`
  width: 100%;
  border-radius: 50%;
  filter: brightness(70%);
`;

const CenterSpan = styled.span`
  font-weight: 800;
  font-size: 1.2rem;
  color: white;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 45%;
  z-index: 999;
  text-align: center;
  pointer-events: none;
`;

const ButtonContents = ({ onFindClick, onWriteClick }) => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TitleTypo variant="h5">
          모두를 위한 여행 동행
          <br />
          MOYO
        </TitleTypo>
      </Grid>
      <Grid item container spacing={2}>
        <ButtonContainerGrid item xs={6}>
          <CenterSpan>동행 찾기</CenterSpan>
          <RoundImage src={accompanyFindImg} onClick={onFindClick} />
        </ButtonContainerGrid>
        <ButtonContainerGrid item xs={6}>
          <CenterSpan>동행 만들기</CenterSpan>
          <RoundImage src={accompanyWriteImg} onClick={onWriteClick} />
        </ButtonContainerGrid>
      </Grid>
    </Grid>
  );
};

export default ButtonContents;
