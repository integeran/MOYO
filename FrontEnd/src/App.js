import React, { useEffect } from 'react';
import styled from 'styled-components';

import AccompanyMain from './pages/accompany/AccompanyMain';
import AccompanyLocationSelect from './pages/accompany/AccompanyLocationSelect';
import AccompanyDateSelect from './pages/accompany/AccompanyDateSelect';
import AccompanyList from './pages/accompany/AccompanyList';
import AccompanyDetail from './pages/accompany/AccompanyDetail';
import AccompanyWrite from './pages/accompany/AccompanyWrite';
import MoreMain from './pages/more/MoreMain';
import MorePlan from './pages/more/MorePlan';
import MoreSettings from './pages/more/MoreSettings';
import CategoryNav from './components/common/CategoryNav';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Container from '@material-ui/core/Container';
import DmRoom from './pages/dm/DmRoom';
import DmRoomList from './pages/dm/DmRoomList';
import PostMap from './pages/postmap/Postmap';
import { changeBool } from './modules/auth';

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
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (!localStorage.token) {
      dispatch(changeBool({ key: 'isLoggedIn', value: false }));
    }
  }, [localStorage.token]);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  return (
    <StyledDiv>
      <StyledContainer>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/accompany" /> : <Login />}
        </Route>
        {isLoggedIn && (
          <>
            <Route path="/profile" component={Profile} />
            <Route exact path="/accompany" component={AccompanyMain} />
            <Route
              path="/accompany/accSetLoc"
              component={AccompanyLocationSelect}
            />
            <Route
              path="/accompany/accSetDate"
              component={AccompanyDateSelect}
            />
            <Route exact path="/accompany/accList" component={AccompanyList} />
            <Route path="/accompany/accList/:id" component={AccompanyDetail} />
            <Route path="/accompany/write" component={AccompanyWrite} />
            <Route exact path="/more" component={MoreMain} />
            <Route path="/more/morePlan" component={MorePlan} />
            <Route path="/more/moreSettings" component={MoreSettings} />
            <Switch>
              <Route path="/dmroom/:receiverId" component={DmRoom} />
              <Route path="/dmroom/" component={DmRoom} />
            </Switch>
            <Route path="/dmroomlist" component={DmRoomList} />
            <Route path="/postmap" component={PostMap} />
          </>
        )}
      </StyledContainer>
      {!(location.pathname === '/' || location.pathname === '/profile') && (
        <CategoryNav />
      )}
    </StyledDiv>
  );
};

export default App;
