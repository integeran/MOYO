import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
const Card = styled.div`
  margin-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.GREY_LIGHT_0};
  padding-top: 1rem;
  display: flex;
  flex-direction: ${props => props.me && 'row-reverse'};
`;
const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin: 1rem 1rem 1rem 2rem;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const Message = styled.div`
  ${props => props.theme.typo.p1};

  /* bubble */
  position: relative;
  background-color: ${props => (props.me ? `#f6f155` : `#EEE`)};
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  &::after {
    content: '';
    position: absolute;
    ${props => (props.me ? 'right: 0' : 'left: 0')};
    top: 50%;
    width: 0;
    height: 0;
    border: 0.5rem solid transparent;
    ${props =>
      props.me ? `border-left-color: #f6f155` : `border-right-color: #EEE`};
    ${props => (props.me ? `border-right: 0` : `border-left: 0`)};
    margin-top: -0.5rem;
    ${props => (props.me ? `margin-right: -0.5rem` : `margin-left: -0.5rem`)};
  }
`;
const Name = styled.div`
  ${props => props.theme.typo.p4};
  color: ${props => props.theme.colors.GREY_LIGHT_4};
  text-align: ${props => props.me && `right`};
`;
const ImgBox = styled.div`
  width: 30rem;
  height: 20rem;
`;
const ImgMessage = styled.img`
  height: 100%;
`;

class ChatCards extends React.Component {
  constructor(props) {
    super(props);
    this.chatCards = React.createRef();
  }

  showChatCards() {
    return this.props.messages.map((m, i) => {
      let me = false;
      if (this.props.user.uid === m.creatorId) me = true;

      const isPhotoURL = m.photoURL || require('./img/profile_placeholder.png');

      const relativeTime = moment(m.createdAt).format('LLL');
      
      return (
        <Card key={m.key} me={me}>
          <ProfileImg src={isPhotoURL} />
          {m.message && (
            <TextBox>
              <Message me={me}>{m.message}</Message>
              <Name me={me}>
                {m.displayName}, {relativeTime}
              </Name>
            </TextBox>
          )}
          {m.imageMsgURL && (
            <ImgBox>
              <ImgMessage src={m.imageMsgURL} />
            </ImgBox>
          )}
        </Card>
      );
    });
  }

  componentDidMount() {
    const messageBody = this.chatCards.current;
    messageBody.scrollTop = messageBody.scrollHeight;
  }

  componentDidUpdate() {
    const messageBody = this.chatCards.current;
    messageBody.scrollTop = messageBody.scrollHeight;
  }

  render() {
    return <Container ref={this.chatCards}>{this.showChatCards()}</Container>;
  }
}

export default ChatCards;
