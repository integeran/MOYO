import React from 'react';
import AccompanyMain from './pages/acc/AccompanyMain';
import AccompanyLonationSelect from './pages/acc/AccompanyLocationSelect';
import AccompanyDateSelect from './pages/acc/AccompanyDateSelect';
import AccompanyList from './pages/acc/AccompanyList';
import AccompanyListDetail from './pages/acc/AccompanyListDetail';
import CategoryNav from './components/common/CategoryNav';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

const Div = styled.div`
  width: inherit;
  height: inherit;
`;

const App = () => {
  return (
    <Div>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route exact path="/acc" component={AccompanyMain} />
      <Route path="/acc/accSetLoc" component={AccompanyLonationSelect} />
      <Route path="/acc/accSetDate" component={AccompanyDateSelect} />
      <Route exact path="/acc/accList" component={AccompanyList} />
      <Route path="/acc/accList/:id" component={AccompanyListDetail} />
      <CategoryNav />
    </Div>
  );
};

export default App;
