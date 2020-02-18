import React, { useState, memo } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';
import { Grid, TextField, IconButton } from '@material-ui/core';
import NearMeIcon from '@material-ui/icons/NearMe';
import SnackBar from '../common/SnackBar';
import styled from 'styled-components';

const InputContainer = styled(Grid)`
  margin: 0 auto;
  width: 90% !important;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.3rem 1rem;
`;

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
    <>
      <InputContainer container justify="center" alignItems="center">
        <Grid item className="moyo_center_grid" xs={10}>
          <TextField
            placeholder="포스트맵을 작성하세요"
            onChange={onChatText}
            value={chatText}
            fullWidth
            style={{ marginTop: '5px' }}
          />
        </Grid>
        <Grid className="moyo_center_grid" item xs={2}>
          <IconButton onClick={saveChat}>
            <NearMeIcon color="primary" />
          </IconButton>
        </Grid>
      </InputContainer>
      <SnackBar
        open={snackbarOpen}
        contents="쾌적한 포스트맵을 위해 바로 등록하실 수 없습니다."
        onClose={handleSnackBarClose}
      ></SnackBar>
    </>
  );
});

export default PostmapChat;
