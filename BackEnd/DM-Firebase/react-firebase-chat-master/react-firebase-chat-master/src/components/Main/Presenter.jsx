import * as React from 'react';
import styled from 'styled-components';
import Alert from 'react-s-alert';
//common
import Header from '../../common/Header';
import ChatInput from '../../common/ChatInput';
import ChatCards from '../../common/ChatCards';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.GREY_LIGHT_1};
`;
const ChatRoomBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20%;
`;
const ChatRoom = styled.div`
  width: 100%;
  height: calc(100vh - 10rem);
  margin-top: 1rem;
  background-color: ${props => props.theme.colors.WHITE};
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

export default class extends React.PureComponent {
  render() {
    return (
      <Container>
        <Header history={this.props.history} />
        <ChatRoomBox>
          <ChatRoom>
            <ChatCards messages={this.props.messages} user={this.props.user} />
            <ChatInput
              inputValue={this.props.inputValue}
              handleChange={this.props.handleChange}
              onSendMessege={this.props.onSendMessege}
              pressEnter={this.props.pressEnter}
              onFileSelected={this.props.onFileSelected}
            />
          </ChatRoom>
        </ChatRoomBox>
        <Alert
          stack={{ limit: 3 }}
          position="bottom-right"
          effect="scale"
          html={true}
        />
      </Container>
    );
  }
}
