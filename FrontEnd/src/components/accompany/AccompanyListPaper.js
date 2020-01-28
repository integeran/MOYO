import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IU from '../../assets/img/iu.jpg';

const DivStyled = styled.div`
  flex-grow: 1;
  & + & {
    margin-top: 2rem;
  }
`;

const CenterGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAvatar = styled(Avatar)`
  min-width: 3.5rem;
  min-height: 3.5rem;
`;

const MultiLineTypography = styled(({ ...other }) => <Typography {...other} />)`
  min-height: 2.7rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledPaper = styled(({ ...other }) => <Paper {...other} />)``;

const AccompanyListPaper = ({ boardInfo, onClick }) => {
  return (
    <DivStyled onClick={onClick}>
      <StyledPaper>
        <Grid container spacing={2}>
          <CenterGrid item xs={2}>
            <StyledAvatar alt="IU" src={IU} xs />
          </CenterGrid>
          <Grid item container xs direction="column" spacing={2}>
            <Grid item container xs spacing={2}>
              <Grid item xs={10}>
                <MultiLineTypography variant="subtitle1">
                  {boardInfo.title}
                </MultiLineTypography>
              </Grid>
              <CenterGrid item xs={2}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  {boardInfo.type}
                </Typography>
              </CenterGrid>
            </Grid>
            <Grid item container xs>
              <Grid item xs={5}>
                <Typography variant="body2" align="left">
                  {boardInfo.nickname}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography
                  variant="body2"
                  align="right"
                  style={{ paddingRight: '1rem' }}
                >
                  {boardInfo.startDate}~{boardInfo.endDate}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledPaper>
    </DivStyled>
  );
};

export default AccompanyListPaper;
