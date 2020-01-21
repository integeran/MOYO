import React from 'react';
import AccompanyMain from './pages/AccompanyMain';
import AccompanyList from './pages/AccompanyList';
import CategoryNav from './components/common/CategoryNav';
import styled from 'styled-components';

const App = () => {
  const MainDiv = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;

  /**  TODO:
   * 로그인이 된 상태 >> 바로 메인 페이지로 이동
   * 로그인이 안된 상태 >> 최초 로그인/회원가입 페이지로 이동
   */
  return (
    <MainDiv>
      {/* <AccompanyMain /> */}
      <AccompanyList />
      <CategoryNav />
    </MainDiv>
  );
};

export default App;
