import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  height: 100%;
`;

const App = () => {
  return (
    <Div>
      <Login />
      {/* <Route exact path="/" component={App} /> */}
      {/* <Route path="/" component={Login} />
      <Route path="/signup" component={Signup} /> */}
    </Div>
  );
};

export default App;
