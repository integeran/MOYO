import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';

import FileMessage from './FileMessage';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const Message = ({
  senderId,
  curUser,
  message,
  timeStamp,
  fileName,
  url,
  lastMessageUserId,
  lastTimeStamp,
}) => {
  const userData = useSelector(state => state.auth.userData);

  const [sender, Setsender] = useState('');

  useEffect(() => {
    const getData = async () => {
      const res = await onAxiosGetUser(senderId);
      Setsender(res.data.data.user);
    };
    getData();
  }, []);

  const onAxiosGetUser = async id => {
    return await axios.get('DM/getUser?uId=' + id, {
      headers: { userToken: userData.userToken },
    });
  };

  const showRightMessage = () => {
    return (
      <Grid container justify="flex-end" style={{ padding: '1%' }}>
        {showMessage(true)}
      </Grid>
    );
  };

  const showLeftMessage = () => {
    return (
      <Grid container style={{ padding: '1%' }}>
        {showProfile()}
        {showMessage()}
      </Grid>
    );
  };

  const showMessage = check => {
    return (
      <Grid item xs={7} style={{ padding: '1%' }}>
        <div
          style={{
            float: check ? 'right' : 'left',
          }}
        >
          {url ? (
            <FileMessage url={url} fileName={fileName} timeStamp={timeStamp} />
          ) : (
            <Typography
              variant="subtitle1"
              style={{
                backgroundColor: '#e0e0e0',
                borderRadius: '8px',
                textAlign: 'left',
                paddingLeft: message.length >= 13 ? '3%' : '',
              }}
            >
              {message.length < 13 && (
                <span style={{ color: '#e6dbdb' }}>1</span>
              )}
              {message}
              {message.length < 13 && (
                <span style={{ color: '#e6dbdb' }}>1</span>
              )}
            </Typography>
            // 가라를 쓰고 싶지않지만.. 이것이 최선이다 !
          )}
        </div>
      </Grid>
    );
  };

  const showProfile = () => {
    if (senderId !== lastMessageUserId || timeStamp !== lastTimeStamp) {
      return (
        <Grid item xs={1} style={{ paddingRight: '1%' }}>
          <Avatar
            alt="메세지 보낸 사람의 프로필"
            src={sender.image}
            style={{ width: '30px', height: '30px' }}
          />
        </Grid>
      );
    } else {
      return <Grid item xs={1} style={{ paddingRight: '1%' }}></Grid>;
    }
  };

  return (
    sender && (
      <>
        {timeStamp !== lastTimeStamp && (
          <div style={{ textAlign: 'center' }}>
            <Typography variant="caption">{timeStamp}</Typography>
          </div>
        )}

        {curUser.uId === sender.uId ? showRightMessage() : showLeftMessage()}
      </>
    )
  );
};

export default Message;
