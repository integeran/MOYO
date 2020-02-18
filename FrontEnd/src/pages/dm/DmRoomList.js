import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as firebase from 'firebase';

import Room from '../../components/dm/Room';
import { openModalAction, closeModalAction } from '../../modules/progressModal';
import { navigationSelect } from '../../modules/baseNavigation';
import meerkatIcon from '../../assets/icon/icon_meerkat.svg';
import MoyoIcon from '../../assets/icon/icon_moyo_white.svg';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from '@material-ui/core';

const DmRoomList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userData = useSelector(state => state.auth.userData);

  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    dispatch(openModalAction());
    onInit();
  }, []);

  /**
   * 초기 실행
   */
  const onInit = async () => {
    console.log('onInit');
    dispatch(navigationSelect('DM'));

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
    addLoadRoomFirebase.off();

    var count = 0;
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
      if (count > 1) {
        count = count - 1;
      } else {
        dispatch(closeModalAction());
      }
    };

    addLoadRoomFirebase.once('value', snapshot => {
      if (snapshot.val()) {
        count = Object.keys(snapshot.val()).length;
      } else {
        dispatch(closeModalAction());
      }
    });

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

  const handleHomeClick = () => {
    dispatch(navigationSelect('accompany'));
    history.push({
      pathname: '/accompany',
    });
  };

  return (
    <>
      <div>
        <AppBar position="static" style={{ backgroundColor: '#4fdbc2' }}>
          <Toolbar style={{ padding: '0%' }}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={2}>
                <IconButton color="inherit" onClick={handleHomeClick}>
                  <img
                    alt="icon_moyo_white"
                    src={MoyoIcon}
                    style={{ height: '2rem' }}
                  />
                </IconButton>
              </Grid>
              <Grid item xs={8} style={{ textAlign: 'center' }}>
                <Typography variant="h6">채팅</Typography>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
      <div id="roomList">
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
              <Typography
                style={{
                  textAlign: 'center',
                  marginTop: '20%',
                  marginBottom: '10%',
                }}
              >
                <b>채팅내역이 존재하지 않습니다.</b>
              </Typography>
              <img alt="채팅내역이 없는 이미지" src={meerkatIcon} />
            </div>
          </Grid>
        )}
      </div>
    </>
  );
};

export default DmRoomList;
