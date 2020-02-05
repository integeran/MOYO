import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';
import * as firebase from 'firebase';
import Room from '../../components/dm/Room';

const DmRoomList = () => {
  const userData = useSelector(state => state.auth.userData);

  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    onInit();
  }, []);

  const onAxios = async () => {
    return await axios.get('DM/testID', {
      headers: { userToken: userData.userToken },
    });
  };

  /**
   * 초기 실행
   */
  const onInit = async () => {
    console.log('onInit');
    const axiosData = await onAxios();

    firebase.database().goOnline();

    loadRoomList(axiosData.data.data.sender);
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
      .ref('UserRooms/' + sender.uId)
      .orderByChild('timeStamp')
      .on('child_added', callback); // 메세지를 받을 때 마다 목록을 갱신시키기 위해 once메소드가 아닌 on메소드 사용
  };

  return (
    <>
      <div>
        {roomList.map((room, index) => {
          return (
            <Room
              key={index}
              roomId={room.roomId}
              receiverId={room.receiverId}
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
