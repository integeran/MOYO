import React from 'react';
import styled from 'styled-components';

const AccompanyMain = () => {
  const MainButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
  `;

  const MainButton = styled.button`
    padding: 3rem;
    border: 1px solid black;
  `;
  return (
    <>
      <h3>오늘은 여행이 어때요?</h3>
      <MainButtonDiv>
        <MainButton>동행\n찾기</MainButton>
        <MainButton>동행\n모으기</MainButton>
      </MainButtonDiv>
      <h3>일정</h3>
    </>
  );
};

export default AccompanyMain;
