import React, { useState, memo } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import NearMeIcon from '@material-ui/icons/NearMe';
import SnackBar from '../common/SnackBar';

const PostmapChat = memo(({ listFetch }) => {
  const userData = useSelector(state => state.auth.userData);
  const pos = useSelector(state => state.postmap.pos);

  const [chatText, setChatText] = useState('');
  const [waitEnter, setWaitEnter] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackBarClose = () => {
    setSnackbarOpen(false);
  };

  const onChatText = e => {
    if (e.target.value.length < 30) {
      setChatText(e.target.value);
    }
  };

  const enterSaveChat = e => {
    if (e.key === 'Enter') {
      saveChat();
    }
  };

  const insertPost = async position => {
    return await axios.post(
      `postmap/insertPostmap/`,
      {
        contents: chatText,
        latitude: position.latitude,
        longitude: position.longitude,
        likes: 0,
        pmId: 0,
        registerId: userData.uid,
      },
      {
        headers: { userToken: userData.userToken },
      },
    );
  };

  const saveChat = async () => {
    if (waitEnter === false) {
      console.log(snackbarOpen);
      // console.log(timer);
      setSnackbarOpen(true);
    } else if (chatText !== '') {
      setWaitEnter(false);
      var timer = 5;

      const res1 = await insertPost(pos);
      if (res1) {
        listFetch(pos);
        setChatText('');
        var timerInterval = setInterval(() => {
          if (timer <= 0) {
            setWaitEnter(true);
            setSnackbarOpen(false);
            clearInterval(timerInterval);
          }
          timer = timer - 1;
        }, 1000);
      }
    }
  };

  return (
    <div>
      <Grid
        container
        style={{ width: '100%' }}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={2} />
        <Grid item xs={7}>
          <TextField
            placeholder="포스트맵을 작성하세요."
            onChange={onChatText}
            value={chatText}
            onKeyPress={enterSaveChat}
            fullWidth
            style={{ marginTop: '5px' }}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={saveChat}>
            <NearMeIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <SnackBar
        open={snackbarOpen}
        contents="쾌적한 포스트맵을 위해 바로 등록하실 수 없습니다."
        onClose={handleSnackBarClose}
      ></SnackBar>
    </div>
  );
});

export default PostmapChat;
