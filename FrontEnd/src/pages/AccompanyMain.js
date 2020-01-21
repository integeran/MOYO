import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Header from '../components/common/Header';

const AccompanyMain = () => {
  const MainButtonDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-content: center;
  `;

  const MainButton = styled(Button)`
    padding: 3rem;
    border: 1px solid black;
  `;
  return (
    <div>
      <Header leftSet="뒤로" midTitle="메인" rightSet="채팅" />
      <p>오늘은 여행이 어때요?</p>
      <MainButtonDiv>
        <MainButton variant="outlined">동행찾기</MainButton>
        <MainButton variant="outlined">동행모으기</MainButton>
      </MainButtonDiv>
      <p>일정</p>
      <p>아아</p>
      <p>아아</p>
      <p>아아</p>
      <p>아아</p>
      <p>아아</p>
    </div>
  );
};

export default AccompanyMain;
