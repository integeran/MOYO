import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router';
import DmRoom from './pages/DmRoom';
import DmRoomList from './pages/DmRoomList';
import Container from '@material-ui/core/Container';

const StyledContainer = styled(Container)`
  height: inherit;
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
        <Switch>
          <Route
            path="/DmRoom/:receiverId/:receiverName/:receiverImage"
            component={DmRoom}
          />
          <Route path="/DmRoom/" component={DmRoom} />
        </Switch>
        <Route path="/DmRoomList" component={DmRoomList} />
      </StyledContainer>
    </StyledDiv>
  );
};

export default App;
