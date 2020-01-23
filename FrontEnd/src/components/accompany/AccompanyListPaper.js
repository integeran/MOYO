import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IU from '../../assets/img/iu.jpg';

const DivStyled = styled.div`
  width: 100%;
  height: max-content;

  & + & {
    margin-top: 10px;
  }
`;

const PaperStyled = styled(Paper)`
  display: flex;
  min-height: 6rem;
  padding: 10px;
`;

const ContentsBox = styled.div`
  flex-grow: 4;
  display: flex;
  flex-direction: column;
  background: gray;
`;
const HeaderBox = styled.div`
  display: flex;
  margin: 5px;
  height: 3rem;
  background: green;
`;
const DescBox = styled.div`
  margin: 2px;
  height: 2rem;
  background: coral;
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'absolute',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const AccompanyListPaper = ({ boardInfo, onClick }) => {
  const classes = useStyles();
  return (
    <DivStyled onClick={onClick}>
      <PaperStyled>
        <Avatar alt="IU" src={IU} className={classes.large} />
        <ContentsBox>
          {/*title, type*/}
          <HeaderBox>
            <div style={{ flexGrow: '4' }}>{boardInfo.title}</div>
            <div style={{ flexGrow: '1' }}>{boardInfo.type}</div>
          </HeaderBox>
          {/*nick, date*/}
          <DescBox>
            <div style={{ flexGrow: '4' }}>{boardInfo.nickname}</div>
            <div style={{ flexGrow: '1' }}>
              {boardInfo.startDate}~{boardInfo.endDate}
            </div>
          </DescBox>
        </ContentsBox>
      </PaperStyled>
    </DivStyled>
  );
};

export default AccompanyListPaper;
