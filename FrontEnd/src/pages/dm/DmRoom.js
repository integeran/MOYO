import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';
import * as firebase from 'firebase';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

import Message from '../../components/dm/Message';
import UploadModal from '../../components/dm/UploadModal';
import { openModalAction, closeModalAction } from '../../modules/progressModal';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PetsIcon from '@material-ui/icons/Pets';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TelegramIcon from '@material-ui/icons/Telegram';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import AddAccompanyModal from '../../components/dm/AddAccompanyModal';

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
  const history = useHistory();

  const MAKEID_CHAR = useSelector(state => state.Dm.MAKEID_CHAR);
  const DATETIME_CHAR = useSelector(state => state.Dm.DATETIME_CHAR);
  const userData = useSelector(state => state.auth.userData);

  const [hookReceiver, setHookReceiver] = useState({});
  const [title, setTitle] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [hookRoomId, setHookRoomId] = useState('');
  const [ivalue, setIvalue] = useState('');
  const [uploadModal, setUploadModal] = useState(false);
  const [addAccompanyModal, setAddAccompanyModal] = useState(false);
  const [receiverRead, setReceiverRead] = useState(false);
  const [tempCurTime, setTempCurTime] = useState('');

  const onChangeIvalue = useCallback(e => {
    setIvalue(e.target.value);
  }, []);

  const openAddModal = () => {
    setAnchorEl(null);
    setAddAccompanyModal(true);
  };

  const closeAddModal = () => {
    setAddAccompanyModal(false);
  };

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

  const onAxiosGetUser = async id => {
    return await axios.get('DM/getUser?uid=' + id, {
      headers: { userToken: userData.userToken },
    });
  };

  /**
   * 초기 실행
   */
  const onInit = async () => {
    console.log('onInit');

    firebase.database().goOnline();

    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        // 익명 사용자 로그인
        alert('익명사용자 에러 발생', error);
      });

    var temp = document.getElementById('chatInput');
    temp.focus();

    if (match.params.receiverId) {
      const axiosUserData = await onAxiosGetUser(match.params.receiverId);
      setHookReceiver(axiosUserData.data.data);
      loadRoom(userData, axiosUserData.data.data);
    }
  };

  const waitReceiverRoomChange = (roomId, receiver, roomexist) => {
    console.log('waitReceiverRoomChange');
    const callback = snapshot => {
      if (snapshot.val().read === true) {
        firebase
          .database()
          .ref('LastMessage/' + roomId)
          .once('value')
          .then(snapshot1 => {
            if (snapshot1.val().senderId === userData.uid) {
              setReceiverRead(true);
              var list = document.getElementById('messageList');
              if (list) {
                list.scrollTop = list.scrollHeight;
              }
            } else {
              setReceiverRead(false);
            }
          });
      } else {
        setReceiverRead(false);
      }
    };

    if (roomexist) {
      firebase
        .database()
        .ref('UserRooms/' + receiver.uid + '/' + userData.uid)
        .once('value', callback);
    }

    firebase
      .database()
      .ref('UserRooms/' + receiver.uid)
      .on('child_changed', callback);
  };

  /*
   * 방 로드하기
   */
  const loadRoom = (sender, receiver) => {
    console.log('loadRoom');
    setTitle(receiver.nickname);

    var roomInfo = {};
    firebase
      .database()
      .ref('UserRooms/' + sender.uid + '/' + receiver.uid)
      .once('value', snapshot => {
        if (snapshot.val()) {
          roomInfo.roomId = snapshot.val().roomId;
          roomInfo.roomTitle = snapshot.val().roomTitle;
          loadMessageList(roomInfo.roomId, receiver, true);
        } else {
          roomInfo.roomId =
            MAKEID_CHAR + sender.uid + MAKEID_CHAR + receiver.uid;
          roomInfo.roomTitle = sender.nickname;
          loadMessageList(roomInfo.roomId, receiver);
        }
      });
  };

  /**
   * 메세지 로드
   */
  const loadMessageList = async (roomId, receiver, roomexist) => {
    console.log('loadMessageList');

    var loadMessageFirebase = firebase.database().ref('Messages/' + roomId);
    if (roomId) {
      setHookRoomId(roomId);
      waitReceiverRoomChange(roomId, receiver, roomexist);

      const callback = async snapshot => {
        var val = snapshot.val();
        setTempCurTime((await onAxiosGetTime()).data.data);

        const MessageInfo = {
          senderId: val.senderId,
          message: val.message,
          timeStamp: val.timeStamp,
          fileName: val.fileName,
          url: val.url,
        };

        setMessageList(prevState => [...prevState, MessageInfo]);
        var list = document.getElementById('messageList');
        if (list) {
          list.scrollTop = list.scrollHeight;
        }

        if (
          val.senderId !== userData.uid &&
          history.location.pathname.indexOf('dmroom/') > 0
        ) {
          firebase
            .database()
            .ref('UserRooms/' + userData.uid + '/' + receiver.uid)
            .once('value')
            .then(snapshot => {
              if (snapshot.val().read === false) {
                firebase
                  .database()
                  .ref('UserRooms/' + userData.uid + '/' + receiver.uid)
                  .update({
                    roomId: snapshot.val().roomId,
                    receiverId: snapshot.val().receiverId,
                    lastMessage: snapshot.val().lastMessage,
                    timeStamp: snapshot.val().timeStamp,
                    read: true,
                  });
              }
            });
        }
      };

      loadMessageFirebase
        .orderByChild('timeStamp')
        .limitToLast(50)
        .on('child_added', callback);
    }
  };

  const onAxiosGetTime = async () => {
    return await axios.get('DM/getTime', {
      headers: { userToken: userData.userToken },
    });
  };

  /**
   * 메세지 전송
   */
  const saveMessages = async (msg, fileName, url) => {
    if (msg && msg !== '') {
      const res = await onAxiosGetTime();
      if (res) {
        var multiUpdates = {};
        var messageId = firebase.database().ref('Messages/' + hookRoomId).key; // 메세지 키 값 구하기 => push는 자동으로 키값을 생성하면서 데이터를 저장
        //                        즉, 여기서는 자동으로 키를 생성해서 받을 수 있음
        var curTime = res.data.data;
        messageId =
          messageId +
          DATETIME_CHAR +
          moment(curTime).format('YYYYMMDDhhmmssSSS');

        var saveFirebase = firebase.database().ref();

        // 유저별 룸 리스트 저장
        multiUpdates['UserRooms/' + userData.uid + '/' + hookReceiver.uid] = {
          roomId: hookRoomId,
          receiverId: hookReceiver.uid,
          lastMessage: url ? '다운로드' : msg,
          timeStamp: curTime,
          read: true,
        };

        multiUpdates['UserRooms/' + hookReceiver.uid + '/' + userData.uid] = {
          roomId: hookRoomId,
          receiverId: userData.uid,
          lastMessage: url ? '다운로드' : msg,
          timeStamp: curTime,
          read: false,
        };

        saveFirebase.update(multiUpdates);

        multiUpdates = {};

        // 메세지 저장
        multiUpdates['Messages/' + hookRoomId + '/' + messageId] = {
          senderId: userData.uid,
          message: msg,
          timeStamp: curTime,
          fileName: fileName ? fileName : null,
          url: url ? url : null,
        };

        multiUpdates['LastMessage/' + hookRoomId] = {
          senderId: userData.uid,
          messageId: messageId,
        };

        saveFirebase.update(multiUpdates);
        var temp = document.getElementById('chatInput');
        temp.focus();
      }
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
        moment(firebase.database.ServerValue.TIMESTAMP).format(
          'YYYYMMDDhhmmssSSS',
        ) +
        '/' +
        hookRoomId +
        '/' +
        userData.uid +
        '/' +
        fileName;

      var attachFirebase = firebase
        .storage()
        .ref()
        .child(path)
        .put(files[0]);

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
        firebase
          .storage()
          .ref()
          .child(path)
          .getDownloadURL()
          .then(url => {
            saveMessages('다운로드', fileName, url);
          });
      };

      // 프로그레스바

      attachFirebase.on(
        'state_changed',
        callbackProgress,
        callbackError,
        callbackComplete,
      );
    }
  };

  var lastMessageUserId = '';
  var lastTimeStamp = '';

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 'inherit',
          height: 'inherit',
        }}
      >
        <div>
          <AppBar position="static" style={{ backgroundColor: '#45bfa9' }}>
            <Toolbar>
              <Link to="/DmRoomList" style={{ marginRight: '5%' }}>
                <KeyboardBackspaceIcon style={{ color: 'white' }} />
              </Link>
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              <div>
                <IconButton onClick={handleMenu} color="inherit">
                  <PetsIcon />
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
                  <MenuItem onClick={openAddModal}>동행추가</MenuItem>
                  <MenuItem onClick={handleClose}>
                    {hookReceiver.nickname}의 프로필
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <UploadModal isOpen={uploadModal} close={closeModal} />
        <AddAccompanyModal
          isOpen={addAccompanyModal}
          close={closeAddModal}
          receiver={hookReceiver}
        />

        <div
          id="messageList"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
          }}
        >
          {messageList.map((message, index) => {
            var tempLastMessageUserId = lastMessageUserId;
            var tempLastTimeStamp = lastTimeStamp;
            lastMessageUserId = message.senderId;
            lastTimeStamp = message.timeStamp;

            return (
              <Message
                key={index}
                senderId={message.senderId}
                image={hookReceiver.image}
                message={message.message}
                timeStamp={message.timeStamp}
                fileName={message.fileName}
                url={message.url}
                lastMessageUserId={tempLastMessageUserId}
                lastTimeStamp={tempLastTimeStamp}
                curTime={tempCurTime}
              />
            );
          })}

          {receiverRead && (
            <Typography
              variant="caption"
              style={{ float: 'right', marginRight: '2%', marginTop: '-2%' }}
            >
              읽음
            </Typography>
          )}
        </div>

        <div
          id="chatdiv"
          style={{
            marginTop: '1%',
            marginBottom: '5%',
            border: '1px solid #bdbdbd',
            borderRadius: '20px',
          }}
        >
          <Grid
            container
            style={{ width: '100%' }}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={1} style={{ marginLeft: '1%' }}>
              <div
                style={{
                  borderRadius: '75px',
                  backgroundColor: '#4fc3f7',
                }}
                onClick={onAttachButton}
              >
                <AttachFileIcon
                  style={{
                    cursor: 'pointer',
                    marginLeft: '10%',
                    color: 'white',
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={1}></Grid>

            <Grid item xs={7}>
              <InputBase
                id="chatInput"
                onChange={onChangeIvalue}
                value={ivalue}
                onKeyPress={onEnterKey}
                fullWidth
                style={{ marginTop: '5px' }}
              />
            </Grid>

            <Grid item xs={1}></Grid>

            <Grid item xs={1}>
              <div
                style={{
                  borderRadius: '75px',
                  backgroundColor: '#4fc3f7',
                }}
                onClick={loadMessage}
              >
                <TelegramIcon
                  style={{
                    cursor: 'pointer',
                    marginLeft: '10%',
                    color: 'white',
                  }}
                />
              </div>
            </Grid>
          </Grid>

          <input
            type="file"
            id="attachfile"
            style={{ display: 'none' }}
            onChange={onAttachFile}
          ></input>
        </div>
      </div>
    </>
  );
};

export default DmRoom;
