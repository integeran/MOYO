import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

import Message from '../../components/dm/Message';
import UploadModal from '../../components/dm/UploadModal';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TelegramIcon from '@material-ui/icons/Telegram';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const DmRoom = ({ match }) => {
  const MAKEID_CHAR = useSelector(state => state.Dm.MAKEID_CHAR);
  const DATETIME_CHAR = useSelector(state => state.Dm.DATETIME_CHAR);
  const userData = useSelector(state => state.auth.userData);

  const [hookSender, setHookSender] = useState({});
  const [hookReceiver, setHookReceiver] = useState({});
  const [title, setTitle] = useState('Hong Gildong');
  const [messageList, setMessageList] = useState([]);
  const [hookRoomId, setHookRoomId] = useState('');
  const [ivalue, setIvalue] = useState('');
  const [uploadModal, setUploadModal] = useState(false);

  const onChangeIvalue = useCallback(e => {
    setIvalue(e.target.value);
  }, []);

  const openModal = () => {
    setUploadModal(true);
  };

  const closeModal = () => {
    setUploadModal(false);
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    onInit();
  }, []);

  const onAxiosInit = async () => {
    return await axios.get('DM/testID', {
      headers: { userToken: userData.userToken },
    });
  };

  const onAxiosReceiver = async receiverId => {
    return await axios.get('DM/getReceiver?uId=' + receiverId, {
      headers: { userToken: userData.userToken },
    });
  };

  /**
   * 초기 실행
   */
  const onInit = async () => {
    console.log('onInit');
    const axiosInitData = await onAxiosInit();

    firebase.database().goOnline();

    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        // 익명 사용자 로그인
        alert('익명사용자 에러 발생', error);
      });

    setHookSender(axiosInitData.data.data.sender);
    setHookReceiver(axiosInitData.data.data.receiver);

    if (match.params.receiverId) {
      const axiosReceiverData = await onAxiosReceiver(match.params.receiverId);
      setHookReceiver(axiosReceiverData.data.data.receiver);
      loadRoom(
        axiosInitData.data.data.sender,
        axiosReceiverData.data.data.receiver,
      );
    } else {
      loadRoom(
        axiosInitData.data.data.sender,
        axiosInitData.data.data.receiver,
      );
    }
  };

  /*
   * 방 로드하기
   */
  const loadRoom = async (sender, receiver) => {
    console.log('loadRoom');
    setTitle(receiver.nickname);

    var roomInfo = {};
    firebase
      .database()
      .ref('UserRooms/' + sender.uId + '/' + receiver.uId)
      .on('value', snapshot => {
        if (snapshot.val()) {
          roomInfo.roomId = snapshot.val().roomId;
          roomInfo.roomTitle = snapshot.val().roomTitle;
          loadMessageList(
            roomInfo.roomId,
            roomInfo.roomTitle,
            sender,
            receiver,
          );
        } else {
          roomInfo.roomId =
            MAKEID_CHAR + receiver.uId + MAKEID_CHAR + receiver.uId;
          roomInfo.roomTitle = sender.nickname;
          loadMessageList(
            roomInfo.roomId,
            roomInfo.roomTitle,
            sender,
            receiver,
          );
        }
      });
  };

  /**
   * 메세지 로드
   */
  const loadMessageList = async (roomId, roomTitle, sender, receiver) => {
    console.log('loadMessageList');
    if (roomId) {
      setHookRoomId(roomId);
      setMessageList([]);

      const callback = async snapshot => {
        var val = snapshot.val();

        const MessageInfo = {
          sender: val.sender,
          curUser: sender,
          message: val.message,
          timeStamp: val.timeStamp,
          fileName: val.fileName,
          path: val.path,
        };

        setMessageList(prevState => [...prevState, MessageInfo]);
        var list = document.getElementById('messageList');
        list.scrollTop = list.scrollHeight;
      };

      const firebaseTest = firebase
        .database()
        .ref('Messages/' + roomId)
        .limitToLast(50);

      firebaseTest.on('child_added', callback);
    }
  };

  /**
   * 메세지 전송
   */
  const saveMessages = (msg, fileName, path) => {
    if (msg && msg !== '') {
      var multiUpdates = {};
      var messageId = firebase.database().ref('Messages/' + hookRoomId).key; // 메세지 키 값 구하기 => push는 자동으로 키값을 생성하면서 데이터를 저장
      //                        즉, 여기서는 자동으로 키를 생성해서 받을 수 있음
      messageId = messageId + DATETIME_CHAR + moment().format('YYYYMMDDhhmmss');

      // 메세지 저장
      multiUpdates['Messages/' + hookRoomId + '/' + messageId] = {
        sender: hookSender,
        message: msg,
        timeStamp: moment().format('MMMM Do YYYY, h:mm:ss a'), // 서버시간 등록
        fileName: fileName ? fileName : null,
        path: path ? path : null,
      };

      // 유저별 룸 리스트 저장
      multiUpdates['UserRooms/' + hookSender.uId + '/' + hookReceiver.uId] = {
        roomId: hookRoomId,
        receiver: hookReceiver,
        lastMessage: path ? '다운로드' : msg,
        timeStamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
      };

      multiUpdates['UserRooms/' + hookReceiver.uId + '/' + hookSender.uId] = {
        roomId: hookRoomId,
        receiver: hookSender,
        lastMessage: path ? '다운로드' : msg,
        timeStamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
      };

      firebase
        .database()
        .ref()
        .update(multiUpdates)
        .then(() => {
          var list = document.getElementById('messageList');
          list.scrollTop = list.scrollHeight;
        });
    }
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const loadMessage = () => {
    saveMessages(ivalue);
    setIvalue('');
  };

  const onEnterKey = e => {
    if (e.key === 'Enter') {
      loadMessage();
    }
  };

  const onAttachButton = () => {
    var attachButton = document.getElementById('attachfile');
    attachButton.click();
  };

  const onAttachFile = e => {
    var files = e.target.files;
    if (files) {
      openModal();
      var fileName = files[0].name;
      var path =
        moment().format('YYYYMMDDhhmmss') +
        '/' +
        hookRoomId +
        '/' +
        hookSender.uId +
        '/' +
        fileName;

      const callbackProgress = snapshot => {
        // 진행과정
        console.log('onAttachFile, callbackProgress, snapshot: ', snapshot);
      };

      const callbackError = error => {
        // 에러발생
        console.log('onAttachFile, callbackError, error: ', error);
        closeModal();
        alert('업로드 중 에러가 발생했습니다.');
      };

      const callbackComplete = () => {
        // 완료
        console.log('onAttachFile, callbackComplete');
        // 프로그레스바 닫기
        closeModal();
        // 완료 다운로드 링크 메세지 보내기
        saveMessages('다운로드', fileName, path);
      };

      // 프로그레스바
      firebase
        .storage()
        .ref()
        .child(path)
        .put(files[0])
        .on('state_changed', callbackProgress, callbackError, callbackComplete);
    }
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>

      <Link to="/DmRoomList">
        <KeyboardBackspaceIcon />
      </Link>
      <UploadModal isOpen={uploadModal} close={closeModal} />

      <div
        id="messageList"
        style={{
          border: '1px solid',
          width: '100%',
          height: '400px',
          overflow: 'auto',
        }}
      >
        {messageList.map((message, index) => {
          return (
            <Message
              key={index}
              sender={message.sender}
              curUser={message.curUser}
              message={message.message}
              timeStamp={message.timeStamp}
              fileName={message.fileName}
              path={message.path}
            />
          );
        })}
      </div>

      <div id="chatdiv" style={{ marginBottom: '40px' }}>
        <Grid
          container
          style={{ width: '400px' }}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={1} />
          <Grid item xs={9}>
            <TextField
              placeholder="텍스트를 입력하세요"
              onChange={onChangeIvalue}
              value={ivalue}
              onKeyPress={onEnterKey}
              fullWidth
              style={{ marginTop: '5px' }}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton aria-label="delete" className={classes.margin}>
              <TelegramIcon
                color="primary"
                style={{ cursor: 'pointer' }}
                onClick={loadMessage}
              />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton aria-label="delete" className={classes.margin}>
              <AttachFileIcon
                color="primary"
                style={{ cursor: 'pointer' }}
                onClick={onAttachButton}
              />
            </IconButton>
          </Grid>
        </Grid>

        <input
          type="file"
          id="attachfile"
          style={{ display: 'none' }}
          onChange={onAttachFile}
        ></input>
      </div>
    </>
  );
};

export default DmRoom;
