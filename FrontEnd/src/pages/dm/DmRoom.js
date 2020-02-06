import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

import {
  initAction,
  initUpload_updateAction,
  roomList_updateAction,
  messageList_updateAction,
  changeReceiverAction,
} from '../../modules/Dm';
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

// DmRoom
const DmRoom = ({ match }) => {
  const dispatch = useDispatch();

  const INDEXDB_DB_NAME = useSelector(state => state.Dm.INDEXDB_DB_NAME);
  const INDEXDB_VERSION = useSelector(state => state.Dm.INDEXDB_VERSION);
  const INDEXDB_STORE = useSelector(state => state.Dm.INDEXDB_STORE);
  const MAKEID_CHAR = useSelector(state => state.Dm.MAKEID_CHAR);
  const DATETIME_CHAR = useSelector(state => state.Dm.DATETIME_CHAR);

  const sender = useSelector(state => state.Dm.sender);
  const receiver = useSelector(state => state.Dm.receiver);
  const initUpload = useSelector(state => state.Dm.initUpload);
  const messageList = useSelector(state => state.Dm.messageList);
  const userData = useSelector(state => state.auth.userData);

  const [title, setTitle] = useState('Hong Gildong');
  const [curRoomId, setCurRoomId] = useState('');
  const [ivalue, setIvalue] = useState('');
  const [uploadModal, setUploadModal] = useState(false);
  const [inish, setInish] = useState(true);

  const onChangeTitle = useCallback(e => {
    setTitle(e);
  }, []);

  const onChangeCurRoomId = useCallback(e => {
    setCurRoomId(e);
  }, []);

  const onChangeIvalue = useCallback(e => {
    setIvalue(e.target.value);
  }, []);

  const onChangeUploadModal = useCallback(e => {
    setUploadModal(e);
  }, []);

  const onChangeInish = useCallback(e => {
    inish ? setInish(false) : setInish(true);
  });

  const modalOpen = () => {
    onChangeUploadModal(true);
  };

  const modalClose = () => {
    onChangeUploadModal(false);
  };

  var tempsender = {};
  var tempreceiver = {};

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (match.params.receiverId) {
      tempsender = sender;
      tempreceiver.uId = match.params.receiverId;
      tempreceiver.nickname = match.params.receiverName;
      tempreceiver.image = match.params.receiverImage;

      dispatch(changeReceiverAction(tempreceiver));

      loadRoom();
    } else {
      console.log('불가능');
      onInit();
    }
  }, []);

  /**
   * 초기 실행
   */
  const onInit = useCallback(() => {
    axios
      .get('DM/testID', {
        headers: { userToken: userData.userToken },
      })
      .then(res => {
        console.log('sender object: ', JSON.stringify(res.data.data.sender));
        console.log(
          'receiver object: ',
          JSON.stringify(res.data.data.receiver),
        );

        dispatch(initAction(res));

        var sender = res.data.data.sender;
        var receiver = res.data.data.receiver;
        tempsender = sender;
        tempreceiver = receiver;
        // temp와 타협하고 싶지 않았지만 최선의 방법이다...

        if (!receiver) {
          dispatch(initUpload_updateAction);
        }

        // sender와 receiver의 정보를 indexDB에 저장
        saveUserAtIndexDB(sender, null, false);
        if (receiver) {
          saveUserAtIndexDB(receiver, null, false);
        }

        firebase.database().goOnline();

        firebase
          .auth()
          .signInAnonymously()
          .catch(function(error) {
            // 익명 사용자 로그인
            alert('익명사용자 에러 발생', error);
          });

        // sender와 receiver의 정보를 realDB에 저장
        checkAndSaveUser(sender);
        if (receiver) {
          checkAndSaveUser(receiver);
        }

        loadRoomList(sender);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  /**
   * 채팅방 목록리스트 호출
   */
  const loadRoomList = sender => {
    var roomRef = firebase.database().ref('UserRooms/' + sender.uId);
    roomRef.off();
    roomRef.orderByChild('timestamp').on('value', getRoomList.bind(this)); // 메세지를 받을 때 마다 목록을 갱신시키기 위해 once메소드가 아닌 on메소드 사용
  };

  /**
   * loadRoomList에서 데이터를 받아왔을 때
   */
  const getRoomList = snapshot => {
    var arrRoomList = [];
    var cbDisplayRoomList = function(data) {
      var val = data.val();
      var userImage = val.image ? val.image : 'img/noprofile.png';

      var RoomInfo = {
        roomId: val.roomId,
        roomTitle: val.userName,
        userId: val.userId,
        userName: val.userName,
        userImage: userImage,
        lastMessage: val.lastMessage,
        timeStamp: timestampToTimeForRoomList(val.timeStamp),
      };

      arrRoomList.push(RoomInfo);
    };
    snapshot.forEach(cbDisplayRoomList.bind(this));
    dispatch(roomList_updateAction(arrRoomList.reverse())); // 역순 정렬

    // RoomList ClickEvent 만들어야 됨

    if (initUpload === true) {
      loadRoom();
    }
  };

  /*
   * 방 로드하기
   */
  const loadRoom = () => {
    // sender와 receiver에 알맞은 채팅방 불러오기
    // 리스트가 다 불려진 뒤 방을 로드
    console.log('initUpload true');
    var RoomInfo = {};
    console.log(tempsender.uId + ' : ' + tempreceiver.uId);
    onChangeTitle(tempreceiver.nickname);
    firebase
      .database()
      .ref('UserRooms/' + tempsender.uId + '/' + tempreceiver.uId)
      .on('value', snapshot => {
        if (snapshot.val()) {
          RoomInfo.roomId = snapshot.val().roomId;
          RoomInfo.roomTitle = snapshot.val().roomTitle;
        } else {
          RoomInfo.roomId =
            MAKEID_CHAR + tempsender.uId + MAKEID_CHAR + tempreceiver.uId;
          RoomInfo.roomTitle = tempsender.nickname;
        }
      });

    dispatch(initUpload_updateAction);
    console.log('RoomId??,', RoomInfo.roomId);
    openChatRoom(RoomInfo.roomId, RoomInfo.roomTitle);
  };

  /**
   * 챗방 오픈, 메세지 로드 및 AddUserList
   */
  const openChatRoom = (roomId, roomTitle) => {
    loadMessageList(roomId);
  };

  /**
   * 메세지 로드
   */
  const loadMessageList = roomId => {
    console.log('loadMessageList');
    if (roomId) {
      console.log('loadMessageList, roomId, ', roomId);
      dispatch(messageList_updateAction([]));
      var messageRef = firebase.database().ref('Messages/' + roomId);
      var arrMessageList = [];
      onChangeCurRoomId(roomId);

      var cbDisplayMessages = function(data) {
        var val = data.val();
        console.log('DisplayMessages: ', val.message);

        var MessageInfo = {
          userImage: val.userImage,
          userName: val.userName,
          message: val.message,
          timeStamp: timestampToTime(val.timeStamp),
          fileName: val.fileName,
          path: val.path,
        };

        if (val.userName === tempsender.nickname) {
          MessageInfo.direct = 'right';
        } else {
          MessageInfo.direct = 'left';
        }

        arrMessageList.push(MessageInfo);
      };

      messageRef
        .limitToLast(50)
        .on('child_added', cbDisplayMessages.bind(this));

      console.log('arrMessageList: ', arrMessageList);
      dispatch(messageList_updateAction(arrMessageList));
    }
  };

  /**
   * 신규 User를 IndexDB에서 체크 후 저장
   */
  const checkAndSaveUser = user => {
    try {
      var request = indexedDB.open(INDEXDB_DB_NAME, INDEXDB_VERSION);
      var objectName = INDEXDB_STORE;
      request.onsuccess = function() {
        var db = request.result;
        var tx = db.transaction(objectName, 'readwrite');
        var store = tx.objectStore(objectName);

        store.get(user.uId).onsuccess = function(event) {
          var data = event.target.result;
          console.log('IndexedDB query 결과: ', data);
          console.log('checkAndSaveUser isSave', data.isSave);
          if (!data.isSave) {
            saveUserAtRealDB(data);
          }
        };

        tx.oncomplete = function() {
          console.log('IndexedDB 트랜잭션 완료');
          db.close();
        };
      };
    } catch (e) {
      console.log('또잉?');
      saveUserAtRealDB(user);
    }
  };

  /**
   * Realtime Database에서 Users 데이터를 체크 후 저장
   */
  const saveUserAtRealDB = user => {
    var userRef = firebase.database().ref('Users/' + user.uId);
    var cbUserRefResult = function(dataSnapShot) {
      if (!dataSnapShot.hasChildren()) {
        console.log('saveUserAtRealDB 저장');
        userRef
          .set({
            nickname: user.nickname,
            age: user.age,
            gender: user.gender,
            image: user.image !== null ? user.image : '',
            beforePsId: user.beforePsId,
            afterPsId: user.afterPsId,
            socialId: user.socialId,
            provider: user.provider,
            level: user.level,
          })
          .then(cbUserAfterSave.bind(this));
      }
    };
    var cbUserAfterSave = function() {
      saveUserAtIndexDB(user, null, true);
    };

    userRef.once('value').then(cbUserRefResult.bind(this));
  };

  /**
   * User데이터를 IndexDB에 저장 및 데이터 변경
   */
  const saveUserAtIndexDB = (user, userName, isSave) => {
    if (indexedDB) {
      var request = indexedDB.open(INDEXDB_DB_NAME, INDEXDB_VERSION);
      var objectName = INDEXDB_STORE;

      request.onupgradeneeded = function() {
        var db = request.result;
        var store = db.createObjectStore(objectName, { keyPath: 'uId' });
      };

      request.onsuccess = function() {
        var db = request.result;
        var tx = db.transaction(objectName, 'readwrite');
        var store = tx.objectStore(objectName);

        store.get(user.uId).onsuccess = function(event) {
          var data = event.target.result;
          console.log('user: ' + JSON.stringify(user));

          if (!data) {
            store.put({
              uId: user.uId,
              nickname: user.nickname,
              age: user.age,
              gender: user.gender,
              image: user.image,
              beforePsId: user.beforePsId,
              afterPsId: user.afterPsId,
              socialId: user.socialId,
              provider: user.provider,
              level: user.level,
              registerDate: user.registerDate,
              updateDate: user.updateDate,
              isSave: false,
            });
          }

          if (data && isSave) {
            store.put({
              uId: user.uId,
              nickname: user.nickname,
              age: user.age,
              gender: user.gender,
              image: user.image,
              beforePsId: user.beforePsId,
              afterPsId: user.afterPsId,
              socialId: user.socialId,
              provider: user.provider,
              level: user.level,
              registerDate: user.registerDate,
              updateDate: user.updateDate,
              isSave: true,
            });
          }
        };

        tx.oncomplete = function() {
          console.log('IndexedDB 트랜잭션 완료');
          db.close();
        };
      };
    }
  };

  /**
   * 메세지 전송
   */

  const saveMessages = (fileName, path, msg) => {
    console.log(msg);

    if (msg && msg !== '') {
      var multiUpdates = {};
      var messageId = firebase.database().ref('Messages/' + curRoomId).key; // 메세지 키 값 구하기 => push는 자동으로 키값을 생성하면서 데이터를 저장
      //                        즉, 여기서는 자동으로 키를 생성해서 받을 수 있음
      messageId = messageId + DATETIME_CHAR + yyyyMMddHHmmsss();
      console.log('receiver의 아이디:', receiver.uId);

      if (messageList.length === 0) {
        // 메세지 처음 입력 할 경우
        console.log('messageList length is 0');
        loadMessageList(curRoomId); // 방에 메세지를 처음 입력할 경우 권한 때문에 다시 메세지를 로드
      }

      console.log('1', msg);
      // 메세지 저장
      multiUpdates['Messages/' + curRoomId + '/' + messageId] = {
        userImage: sender.image !== null ? sender.image : 'img/noprofile.png',
        userName: sender.nickname,
        message: msg,
        timeStamp: firebase.database.ServerValue.TIMESTAMP, // 서버시간 등록
        fileName: fileName,
        path: path,
      };

      console.log('2');
      // 유저별 룸 리스트 저장
      multiUpdates['UserRooms/' + sender.uId + '/' + receiver.uId] = {
        roomId: curRoomId,
        roomTitle: receiver.nickname,
        userId: receiver.uId,
        userName: receiver.nickname,
        userImage: receiver.image !== null ? receiver.image : '',
        lastMessage: path ? '다운로드' : msg,
        timeStamp: firebase.database.ServerValue.TIMESTAMP,
      };

      console.log('3');
      multiUpdates['UserRooms/' + receiver.uId + '/' + sender.uId] = {
        roomId: curRoomId,
        roomTitle: sender.nickname,
        userId: sender.uId,
        userName: sender.nickname,
        userImage: sender.image !== null ? sender.image : '',
        lastMessage: path ? '다운로드' : msg,
        timeStamp: firebase.database.ServerValue.TIMESTAMP,
      };

      console.log('모든 업데이트: ', JSON.stringify(multiUpdates));
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

  /**
   * timestamp를 날짜 시간으로 변환
   */
  const timestampToTime = timestamp => {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var week = new Array('일', '월', '화', '수', '목', '금', '토');

    var convertDate =
      year + '년 ' + month + '월 ' + day + '일 (' + week[date.getDay()] + ') ';
    var convertHour = '';
    if (hour < 12) {
      convertHour = '오전 ' + pad(hour) + ':' + pad(minute);
    } else if (hour === 12) {
      convertHour = '오후 ' + pad(hour) + ':' + pad(minute);
    } else {
      convertHour = '오후 ' + pad(hour - 12) + ':' + pad(minute);
    }

    return convertDate + convertHour;
  };

  /**
   * RoomList 화면 시간변환
   */
  const timestampToTimeForRoomList = timestamp => {
    var date = new Date(timestamp),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes();
    var nowDate = new Date(),
      nowYear = nowDate.getFullYear(),
      nowMonth = nowDate.getMonth() + 1,
      nowDay = nowDate.getDate(),
      nowHour = nowDate.getHours(),
      nowMinute = nowDate.getMinutes();
    var result;
    if (year === nowYear && month === nowMonth && day === nowDay) {
      result = pad(hour) + ':' + pad(minute);
    } else {
      result = pad(year) + '-' + pad(month) + '-' + pad(day);
    }
    return result;
  };

  /**
   * 현재날짜 yyyyMMddHHmmsss형태로 변환
   */
  const yyyyMMddHHmmsss = () => {
    var vDate = new Date();
    var yyyy = vDate.getFullYear().toString();
    var MM = (vDate.getMonth() + 1).toString();
    var dd = vDate.getDate().toString();
    var HH = vDate.getHours().toString();
    var mm = vDate.getMinutes().toString();

    var ss = vDate.getSeconds().toString();
    var sss = vDate.getMilliseconds().toString();
    return (
      yyyy +
      (MM[1] ? MM : '0' + MM[0]) +
      (dd[1] ? dd : '0' + dd[0]) +
      (HH[1] ? HH : '0' + HH[0]) +
      (mm[1] ? mm : '0' + mm[0]) +
      (ss[1] ? ss : '0' + ss[0]) +
      sss
    );
  };

  /**
   * 10미만 숫자 앞에 0 붙이기
   */
  const pad = n => {
    return n > 9 ? '' + n : '0' + n;
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const loadMessage = () => {
    saveMessages(null, null, ivalue);
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
      modalOpen();
      var fileName = files[0].name;
      var path =
        yyyyMMddHHmmsss().substr(0, 8) +
        '/' +
        curRoomId +
        '/' +
        sender.uId +
        '/' +
        fileName;

      var cbProgress = function(snapshot) {
        // 진행과정
      };

      var cbError = function(error) {
        // 에러발생
        console.log(error);
        modalClose();
        alert('업로드 중 에러가 발생했습니다.');
      };

      var cbComplete = function() {
        // 완료
        // 프로그레스바 닫기
        modalClose();

        // 완료 다운로드 링크 메세지 보내기
        saveMessages(fileName, path, '다운로드');

        // files 리셋
        console.log('업로드 완료!');
      };

      var uploadTask = firebase
        .storage()
        .ref()
        .child(path)
        .put(files[0]);

      // 프로그레스바
      uploadTask.on(
        'state_changed',
        cbProgress.bind(this),
        cbError.bind(this),
        cbComplete.bind(this),
      );
    }
  };

  const Test = () => {
    console.log('성공!');
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
      <UploadModal isOpen={uploadModal} close={modalClose} />

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
          console.log(message.userImage);
          return (
            <Message
              key={index}
              userImage={message.userImage}
              userName={message.userName}
              message={message.message}
              timeStamp={message.timeStamp}
              direct={message.direct}
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
