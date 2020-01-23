import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import * as firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  initAction,
  initUpload_updateAction,
  isOpenRoomAction,
  roomList_updateAction,
  messageList_updateAction,
} from '../reducers/Dm';
import axios from 'axios';
import Room from '../components/dm/Room';

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

const DmRoom = () => {
  const dispatch = useDispatch();

  const INDEXDB_DB_NAME = useSelector(state => state.Dm.INDEXDB_DB_NAME);
  const INDEXDB_VERSION = useSelector(state => state.Dm.INDEXDB_VERSION);
  const INDEXDB_STORE = useSelector(state => state.Dm.INDEXDB_STORE);
  const SPLIT_CHAR = useSelector(state => state.Dm.SPLIT_CHAR);

  const sender = useSelector(state => state.Dm.sender);
  const receiver = useSelector(state => state.Dm.receiver);
  const initUpload = useSelector(state => state.Dm.initUpload);
  const isOpenRoom = useSelector(state => state.Dm.isOpenRoom);
  const messageList = useSelector(state => state.Dm.messageList);

  const [title, setTitle] = useState('Hong Gildong');
  const [curRoomId, setCurRoomId] = useState('');

  const onChangeTitle = useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const onChangeCurRoomId = useCallback(e => {
    setCurRoomId(e.target.value);
  }, []);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  /**
   * 초기 실행
   */
  const onInit = useCallback(() => {
    axios
      .get('http://localhost:8080/DM/testID')
      .then(res => {
        console.log('sender object: ', JSON.stringify(res.data.data.sender));
        console.log(
          'receiver object: ',
          JSON.stringify(res.data.data.receiver),
        );

        dispatch(initAction(res));

        var sender = res.data.data.sender;
        var receiver = res.data.data.receiver;

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
    var roomRef = this.database.ref('UserRooms/' + sender.uId);
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
    dispatch(roomList_updateAction(arrRoomList.reverse().join(''))); // 역순 정렬

    // RoomList ClickEvent 만들어야 됨

    if (initUpload === true) {
      // sender와 receiver에 알맞은 채팅방 불러오기
      // 리스트가 다 불려진 뒤 방을 로드
      var RoomInfo = firebase
        .database()
        .ref('UserRooms/' + sender.uId + '/' + receiver.uId);

      dispatch(initUpload_updateAction);
      openChatRoom(RoomInfo.roomId, RoomInfo.roomTitle);
    }
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
    if (roomId) {
      dispatch(messageList_updateAction([]));
      var messageRef = firebase.database().ref('Messages/' + roomId);
      var arrMessageList = [];
      onChangeCurRoomId(roomId);

      var cbDisplayMessages = function(data) {
        var val = data.val();

        var MessageInfo = {
          messageId: val.messageId,
          userImage: val.userImage,
          userName: val.userName,
          message: val.message,
          timeStamp: timestampToTime(val.timeStamp),
        };

        if (val.userName === sender.nickname) {
          MessageInfo.direct = 'right';
        } else {
          MessageInfo.direct = 'left';
        }

        arrMessageList.push(MessageInfo);
      };

      messageRef
        .limitToLast(50)
        .on('child_added', cbDisplayMessages.bind(this));
    }
  };

  /**
   * 백버튼 클릭
   */
  const onBackBtnClick = () => {
    dispatch(isOpenRoomAction(false));
    // RoomList로 이동하기 만들기
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

  const saveMessages = (fileName, path) => {
    var msg = '입력한 채팅 값 연동해서 가져오기';

    // 파일전송 메세지
    if (fileName && path) {
      // var templateDownloadMsg = document.getElementById('templateDownloadMsg')
      //   .innerHTML;
      // msg = _.template(templateDownloadMsg)({
      //   fileName: fileName,
      //   downloadURL: downloadURL,
      //   path: path,
      // });
      // console.log(msg);
    }

    if (msg.length > 0) {
      var multiUpdates = {};
      var messageId = firebase.database().ref('Messages/' + curRoomId).key; // 메세지 키 값 구하기 => push는 자동으로 키값을 생성하면서 데이터를 저장
      //                        즉, 여기서는 자동으로 키를 생성해서 받을 수 있음

      if (messageList.length === 0) {
        // 메세지 처음 입력 할 경우
        this.loadMessageList(curRoomId); // 방에 메세지를 처음 입력할 경우 권한 때문에 다시 메세지를 로드
      }

      // 메세지 저장
      multiUpdates['Messages/' + curRoomId + '/' + messageId] = {
        userImage: user.image !== null ? user.image : '',
        userName: user.nickname,
        message: msg,
        timeStamp: firebase.database.ServerValue.TIMESTAMP, // 서버시간 등록
      };

      // 아~~~~~~~~~~~~~~~~~~여기까지했습니다.!!!

      // 유저별 룸 리스트 저장
      var roomUserListLength = this.roomUserlist.length;
      if (this.roomUserlist && roomUserListLength > 0) {
        for (var i = 0; i < roomUserListLength; i++) {
          multiUpdates[
            'UserRooms/' + this.roomUserlist[i] + '/' + this.roomId
          ] = {
            roomId: this.roomId,
            roomUserName: this.roomUserName.join(this.SPLIT_CHAR),
            roomUserlist: this.roomUserlist.join(this.SPLIT_CHAR),
            roomType: roomUserListLength > 2 ? this.MULTI : this.ONE_VS_ONE,
            roomOneVSOneTarget:
              roomUserListLength == 2 && i == 0
                ? this.roomUserlist[1] // 1:1대화이고 i값이 0일 때 타겟은 i값이 1인 유저
                : roomUserListLength == 2 && i == 1
                ? this.roomUserlist[0] // 1:1대화이고 i값이 1일 때 타겟은 i값이 0인 유저
                : '', // 나머지
            lastMessage: downloadURL ? '다운로드' : convertMsg,
            image: user.image !== null ? user.image : '',
            timestamp: firebase.database.ServerValue.TIMESTAMP,
          };
        }
      }

      console.log('모든 업데이트: ', JSON.stringify(multiUpdates));
      this.database.ref().update(multiUpdates);
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

      <div onClick={onInit}>여기를 클릭해보세요</div>
    </>
  );
};

export default DmRoom;
