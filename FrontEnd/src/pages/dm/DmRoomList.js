import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  initAction,
  initUpload_updateAction,
  isOpenRoomAction,
  roomList_updateAction,
  messageList_updateAction,
} from '../../modules/Dm';
import axios from 'axios';
import * as firebase from 'firebase';
import Room from '../../components/dm/Room';

const DmRoomList = () => {
  const dispatch = useDispatch();

  const INDEXDB_DB_NAME = useSelector(state => state.Dm.INDEXDB_DB_NAME);
  const INDEXDB_VERSION = useSelector(state => state.Dm.INDEXDB_VERSION);
  const INDEXDB_STORE = useSelector(state => state.Dm.INDEXDB_STORE);

  const sender = useSelector(state => state.Dm.sender);
  const receiver = useSelector(state => state.Dm.receiver);
  const roomList = useSelector(state => state.Dm.roomList);

  var tempsender = '';
  var tempreceiver = '';

  useEffect(() => {
    onInit();
  }, []);

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
        tempsender = sender;
        tempreceiver = receiver;

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
    console.log('arrRoomList: ', arrRoomList.reverse());
    dispatch(roomList_updateAction(arrRoomList.reverse())); // 역순 정렬

    console.log('roomList:', roomList);
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
   * 10미만 숫자 앞에 0 붙이기
   */
  const pad = n => {
    return n > 9 ? '' + n : '0' + n;
  };

  return (
    <>
      <div>
        {roomList.map((room, index) => {
          return (
            <Room
              key={index}
              roomId={room.roomId}
              roomTitle={room.roomTitle}
              userId={room.userId}
              userName={room.userName}
              userImage={room.userImage}
              lastMessage={room.lastMessage}
              timeStamp={room.timeStamp}
            ></Room>
          );
        })}
      </div>
    </>
  );
};

export default DmRoomList;
