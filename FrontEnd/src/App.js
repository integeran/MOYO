import React from 'react';
import AccompanyMain from './pages/acc/AccompanyMain';
import AccompanyLocationSelect from './pages/acc/AccompanyLocationSelect';
import AccompanyDateSelect from './pages/acc/AccompanyDateSelect';
import AccompanyList from './pages/acc/AccompanyList';
import AccompanyDetail from './pages/acc/AccompanyDetail';
import CategoryNav from './components/common/CategoryNav';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { useLocation } from 'react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Container from '@material-ui/core/Container';
import AccompanyWrite from './pages/acc/AccompanyWrite';

const StyledContainer = styled(Container)`
  position: relative;
  height: inherit;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const StyledDiv = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const App = () => {
  const location = useLocation();
  return (
    <StyledDiv>
      <StyledContainer>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/acc" component={AccompanyMain} />
        <Route path="/acc/accSetLoc" component={AccompanyLocationSelect} />
        <Route path="/acc/accSetDate" component={AccompanyDateSelect} />
        <Route exact path="/acc/accList" component={AccompanyList} />
        <Route path="/acc/accList/:id" component={AccompanyDetail} />
        <Route path="/acc/write" component={AccompanyWrite} />
      </StyledContainer>
      {!(location.pathname === '/' || location.pathname === '/signup') && (
        <CategoryNav />
      )}
    </StyledDiv>
  );
};

export default App;
