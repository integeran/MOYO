import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import NearMeIcon from '@material-ui/icons/NearMe';

const PostmapChat = memo(({ listFetch }) => {
  const userData = useSelector(state => state.auth.userData);
  const pos = useSelector(state => state.postmap.pos);

  const [chatText, setChatText] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

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
    if (timer > 0) {
      alert(timer + '초 만큼 대기시간이 남아있습니다.');
    } else if (chatText !== '') {
      const res1 = await insertPost(pos);
      if (res1) {
        listFetch(pos);

        setChatText('');
      }
      setTimer(5);
    }
  };

  const getFetchMarker = async pos => {
    return await axios.get(
      `postmap/selectAll?latitude=${pos.latitude}&longitude=${pos.longitude}&uId=${userData.uid}`,
      {
        headers: { userToken: userData.userToken },
      },
    );
  };

  return (
    <div>
      <Grid
        container
        style={{ width: '400px' }}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={1} />
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
        <Grid
          item
          xs={2}
          style={{ textAlign: 'center', color: timer < 4 ? 'red' : 'black' }}
        >
          <span>{timer > 0 ? timer + '초' : null}</span>
        </Grid>
      </Grid>
    </div>
  );
});

export default PostmapChat;
