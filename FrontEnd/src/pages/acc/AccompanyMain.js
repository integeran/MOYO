import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Header from '../../components/common/Header';

const MainButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
`;

const MainButton = styled(Button)`
  padding: 3rem;
  border: 1px solid black;
`;

const AccompanyMain = ({ history }) => {
  const handleAccompanyFindClick = () => {
    history.push('/acc/accSetLoc');
  };
  return (
    <div>
      <Header leftSet="뒤로" midTitle="메인" rightSet="채팅" />
      <p>오늘은 여행이 어때요?</p>
      <MainButtonDiv>
        <MainButton variant="outlined" onClick={handleAccompanyFindClick}>
          동행 구하기
        </MainButton>
        <MainButton variant="outlined">동행 글 작성</MainButton>
      </MainButtonDiv>
      <p>일정</p>
    </div>
  );
};

export default AccompanyMain;
