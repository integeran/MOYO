import React from 'react';
import Login from './components/Login';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  height: 100%;
`;
const App = () => {
  return (
    <Div>
      <Login />
    </Div>
  );
};

export default App;
