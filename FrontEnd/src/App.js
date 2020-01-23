import React from 'react';
import AccompanyMain from './pages/AccompanyMain';
import AccompanyLonationSelect from './pages/AccompanyLocationSelect';
import AccompanyDateSelect from './pages/AccompanyDateSelect';
import AccompanyList from './pages/AccompanyList';
import AccompanyListDetail from './pages/AccompanyListDetail';
import CategoryNav from './components/common/CategoryNav';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

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
      <Route exact path={['/', '/acc']} component={AccompanyMain} />
      <Route path="/acc/accSetLoc" component={AccompanyLonationSelect} />
      <Route path="/acc/accSetDate" component={AccompanyDateSelect} />
      <Route exact path="/acc/accList" component={AccompanyList} />
      <Route path="/acc/accList/:id" component={AccompanyListDetail} />
      <CategoryNav />
    </MainDiv>
  );
};

export default App;
