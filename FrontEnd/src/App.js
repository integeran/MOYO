import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router';
import styled from 'styled-components';

import AccompanyMain from './pages/accompany/AccompanyMain';
import AccompanyLocationSelect from './pages/accompany/AccompanyLocationSelect';
import AccompanyDateSelect from './pages/accompany/AccompanyDateSelect';
import AccompanyList from './pages/accompany/AccompanyList';
import AccompanyDetail from './pages/accompany/AccompanyDetail';
import AccompanyWrite from './pages/accompany/AccompanyWrite';
import MoreMain from './pages/more/MoreMain';
import MorePlan from './pages/more/MorePlan';
import CategoryNav from './components/common/CategoryNav';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DmRoom from './pages/dm/DmRoom';
import DmRoomList from './pages/dm/DmRoomList';
import PostMap from './pages/postmap/Postmap';
import Container from '@material-ui/core/Container';

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
        <Route
          path="/accompany/accSetLoc"
          component={AccompanyLocationSelect}
        />
        <Route path="/accompany/accSetDate" component={AccompanyDateSelect} />
        <Route exact path="/accompany/accList" component={AccompanyList} />
        <Route path="/accompany/accList/:id" component={AccompanyDetail} />
        <Route path="/accompany/write" component={AccompanyWrite} />
        <Route exact path="/more" component={MoreMain} />
        <Route path="/more/morePlan" component={MorePlan} />
        <Switch>
          <Route path="/dmroom/:receiverId" component={DmRoom} />
          <Route path="/dmroom/" component={DmRoom} />
        </Switch>
        <Route path="/dmroomlist" component={DmRoomList} />
        <Route path="/postmap" component={PostMap} />
      </StyledContainer>
      {!(location.pathname === '/' || location.pathname === '/signup') && (
        <CategoryNav />
      )}
    </StyledDiv>
  );
};

export default App;
