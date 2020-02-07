import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as firebase from 'firebase';

import Room from '../../components/dm/Room';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const DmRoomList = () => {
  const userData = useSelector(state => state.auth.userData);

  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    onInit();
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
    const callback = snapshot => {
      var val = snapshot.val();

      var RoomInfo = {
        roomId: val.roomId,
        receiverId: val.receiverId,
        lastMessage: val.lastMessage,
        timeStamp: val.timeStamp,
      };

      setRoomList(prevState => [...prevState, RoomInfo]);
    };

    firebase
      .database()
      .ref('UserRooms/' + sender.uid)
      .orderByChild('timeStamp')
      .on('child_added', callback); // 메세지를 받을 때 마다 목록을 갱신시키기 위해 once메소드가 아닌 on메소드 사용
  };

  return (
    <>
      <div>
        {roomList.length !== 0 ? (
          roomList.map((room, index) => {
            return (
              <Room
                key={index}
                roomId={room.roomId}
                receiverId={room.receiverId}
                lastMessage={room.lastMessage}
                timeStamp={room.timeStamp}
              ></Room>
            );
          })
        ) : (
          <Grid container justify="center">
            <Avatar
              alt="데이터 존재 하지 않음"
              src="https://jjalbang.today/jj1XC.gif"
              style={{ width: '50%', height: '50%' }}
            />
            <Typography>
              <b>데이터가 존재하지 않습니다.</b>
            </Typography>
          </Grid>
        )}
      </div>
    </>
  );
};

export default DmRoomList;
