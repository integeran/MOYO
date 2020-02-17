import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as firebase from 'firebase';

import Room from '../../components/dm/Room';
import ProgressModal from '../../components/common/ProgressModal';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const DmRoomList = () => {
  const userData = useSelector(state => state.auth.userData);

  const [roomList, setRoomList] = useState([]);
  const [openProgress, setOpenProgress] = useState(true);

  useEffect(() => {
    onInit();
    setTimeout(() => {
      setOpenProgress(false);
    }, 1500);
  }, []);

  /**
   * 초기 실행
   */
  const onInit = async () => {
    console.log('onInit');

    firebase.database().goOnline();

    loadRoomList(userData);
  };

  /**
   * 채팅방 목록리스트 호출
   */
  const loadRoomList = sender => {
    /**
     * loadRoomList에서 데이터를 받아왔을 때
     */
    addLoadRoomList(sender);
    changeLoadRoomList(sender);
  };

  const addLoadRoomList = sender => {
    var addLoadRoomFirebase = firebase
      .database()
      .ref('UserRooms/' + sender.uid);
    const callback = snapshot => {
      var val = snapshot.val();

      var RoomInfo = {
        roomId: val.roomId,
        receiverId: val.receiverId,
        lastMessage: val.lastMessage,
        timeStamp: val.timeStamp,
        read: val.read,
      };

      setRoomList(prevState => [...prevState, RoomInfo]);
    };

    addLoadRoomFirebase.orderByChild('timeStamp').on('child_added', callback); // 메세지를 받을 때 마다 목록을 갱신시키기 위해 once메소드가 아닌 on메소드 사용
  };

  const changeLoadRoomList = sender => {
    var changeLoadRoomListFirebase = firebase
      .database()
      .ref('UserRooms/' + sender.uid);

    const callback = snapshot => {
      var val = snapshot.val();
      setRoomList(prevState =>
        prevState.filter(room => room.roomId !== val.roomId),
      );

      setRoomList(prevState => [...prevState, val]);
    };

    changeLoadRoomListFirebase.on('child_changed', callback);
  };

  return (
    <>
      <div>
        {roomList.length !== 0 ? (
          roomList.reverse().map((room, index) => {
            return (
              <Room
                key={room.roomId}
                roomId={room.roomId}
                receiverId={room.receiverId}
                lastMessage={room.lastMessage}
                timeStamp={room.timeStamp}
                read={room.read}
              ></Room>
            );
          })
        ) : (
          <Grid container justify="center">
            <div>
              <Typography style={{ textAlign: 'center', marginTop: '20%' }}>
                <b>데이터가 존재하지 않습니다.</b>
              </Typography>
            </div>
            <div style={{ padding: '10%' }}>
              <Avatar
                alt="데이터 존재 하지 않음"
                src="https://jjalbang.today/jj1XC.gif"
                style={{ width: '100%', height: '100%', textAlign: 'center' }}
              />
            </div>
          </Grid>
        )}
        <ProgressModal openProgress={openProgress} />
      </div>
    </>
  );
};

export default DmRoomList;
