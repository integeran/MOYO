import * as React from 'react';
import Presenter from './Presenter';
import * as firebase from 'firebase';

//alert
import Alert from 'react-s-alert';
import '../../common/css/s-alert-default.css';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      messages: []
    };

    this.loadChatCard = this.loadChatCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSendMessege = this.onSendMessege.bind(this);
    this.pressEnter = this.pressEnter.bind(this);
    this.onFileSelected = this.onFileSelected.bind(this);
  }

  loadChatCard() {
    const messagesRef = firebase
      .database()
      .ref('/messages/')
      .limitToLast(100);
    const callback = snap => {
      const data = snap.val();
      this.setState(prevState => ({
        messages: [
          ...prevState.messages,
          {
            ...data,
            key: snap.key
          }
        ]
      }));
    };

    messagesRef.on('child_added', callback);
    messagesRef.on('child_changed', callback);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ inputValue: e.target.value });
  }

  async onFileSelected(e) {
    e.preventDefault();
    const file = e.target.files[0];

    if (!firebase.auth().currentUser) {
      return Alert.error('로그인 후 이용가능합니다.');
    }
    if (!file.type.match('image.*')) {
      return Alert.error('사진파일만 보낼 수 있어요.');
    }
    if(file.size > 2000000) {
      return Alert.error('사이즈는 3mb까지 가능합니다.');
    }

    try {
      const messageRef = await firebase.database().ref('/messages/');

      const filePath =
        firebase.auth().currentUser.uid + '/messages/' + file.name;
      const fileSnapshot = await firebase
        .storage()
        .ref(filePath)
        .put(file);
      const url = await fileSnapshot.ref.getDownloadURL();

      messageRef.push({
        displayName: this.props.user.displayName,
        imageMsgURL: url,
        photoURL: this.props.user.photoURL,
        creatorId: this.props.user.uid,
        createdAt: new Date().getTime()
      });
    } catch (err) {
      console.log(err);
    }
  }

  async onSendMessege() {
    if (!firebase.auth().currentUser) {
      return Alert.error('로그인 후 이용가능합니다.');
    }

    if (!this.state.inputValue) {
      return Alert.error('메시지를 입력해주세요.');
    }
    try {
      await firebase
        .database()
        .ref('/messages/')
        .push({
          creatorId: firebase.auth().currentUser.uid,
          displayName: this.props.user.displayName,
          message: this.state.inputValue,
          photoURL: this.props.user.photoURL,
          createdAt: new Date().getTime()
        });
      this.setState({ inputValue: '' });
    } catch (err) {
      console.error('Error writing new message', err);
    }
  }

  pressEnter(e) {
    if (e.key === 'Enter') {
      this.onSendMessege();
    }
  }

  componentDidMount() {
    this.loadChatCard();
  }

  render() {
    return (
      <Presenter
        history={this.props.history}
        user={this.props.user}
        inputValue={this.state.inputValue}
        messages={this.state.messages}
        handleChange={this.handleChange}
        onSendMessege={this.onSendMessege}
        onFileSelected={this.onFileSelected}
        pressEnter={this.pressEnter}
      />
    );
  }
}
