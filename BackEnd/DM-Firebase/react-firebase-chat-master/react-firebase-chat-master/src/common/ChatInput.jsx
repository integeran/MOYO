import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;
const Input = styled.input`
  width: 100%;
  height: 4rem;
  border: none;
  outline: none;
  border-bottom: 2px solid ${props => props.theme.colors.GREY_LIGHT_3};
  padding-left: 1rem;
  transition: all 0.3s;
  &:focus {
    border-bottom: 3px solid ${props => props.theme.colors.PRIMARY};
  }
`;
const SendButton = styled.div`
  width: 15rem;
  height: 4rem;
  background-color: ${props => props.theme.colors.GREY_LIGHT_4};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0 1rem;
  &:hover {
    transform: translateY(-2px);
  }
  &:focus {
    transform: translateY(2px);
  }
`;
const SendButtonText = styled.div`
  ${props => props.theme.typo.p1};
  color: ${props => props.theme.colors.WHITE};
`;
const ImgButton = styled.img`
  height: 5.4rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
  &:focus {
    transform: translateY(2px);
  }
`;
const InvisibleInputFile = styled.input`
  display: none;
`;

class ChatInput extends React.Component {
  constructor(props) {
    super(props);

    this.inputFile = React.createRef();
  }

  render() {
    return (
      <Container>
        <Input
          type="text"
          value={this.props.inputValue}
          onChange={this.props.handleChange}
          onKeyPress={this.props.pressEnter}
        />
        <SendButton onClick={this.props.onSendMessege}>
          <SendButtonText>Send</SendButtonText>
        </SendButton>
        <InvisibleInputFile
          ref={this.inputFile}
          type="file"
          accept="image/*"
          capture="camera"
          onChange={this.props.onFileSelected}
        />
        <ImgButton
          onClick={() => this.inputFile.current.click()}
          src={require('../common/img/icon-img.png')}
        />
      </Container>
    );
  }
}

export default ChatInput;
