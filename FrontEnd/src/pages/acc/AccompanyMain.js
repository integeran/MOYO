import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

const MainButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
`;

const MainButton = styled(Button)`
  padding: 3rem;
  border: 1px solid black;
`;

const AccompanyMain = () => {
  const history = useHistory();
  const handleAccompanyFindClick = () => {
    history.push({
      pathname: '/acc/accSetLoc',
      state: { prevpath: history.location.pathname },
    });
  };
  const handleAccompanyWriteClick = () => {
    history.push({
      pathname: '/acc/write',
      state: { prevpath: history.location.pathname },
    });
  };
  return (
    <div>
      <p>오늘은 여행이 어때요?</p>
      <MainButtonDiv>
        <MainButton variant="outlined" onClick={handleAccompanyFindClick}>
          동행 구하기
        </MainButton>
        <MainButton variant="outlined" onClick={handleAccompanyWriteClick}>
          동행 글 작성
        </MainButton>
      </MainButtonDiv>
      <p>일정</p>
    </div>
  );
};

export default AccompanyMain;
