import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import FileMessage from './FileMessage';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const Message = ({
  senderId,
  image,
  message,
  timeStamp,
  fileName,
  url,
  lastMessageUserId,
  lastTimeStamp,
  curTime,
}) => {
  const userData = useSelector(state => state.auth.userData);

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
        <div>
          {url ? (
            <FileMessage url={url} fileName={fileName} timeStamp={timeStamp} />
          ) : (
            <div>
              <Typography
                variant="body1"
                style={{
                  backgroundColor: '#e0e0e0',
                  borderRadius: '8px',
                  textAlign: 'left',
                  paddingLeft: '3%',
                  paddingRight: '3%',
                  float: check ? 'right' : 'left',
                }}
              >
                {message}
              </Typography>
            </div>
          )}
        </div>
      </Grid>
    );
  };

  const showProfile = () => {
    if (
      senderId !== lastMessageUserId ||
      moment(timeStamp).format('YYYY/MM/DD LT') !==
        moment(lastTimeStamp).format('YYYY/MM/DD LT')
    ) {
      return (
        <Grid item xs={1} style={{ paddingRight: '1%' }}>
          <Avatar
            alt="메세지 보낸 사람의 프로필"
            src={image}
            style={{ width: '30px', height: '30px' }}
          />
        </Grid>
      );
    } else {
      return <Grid item xs={1} style={{ paddingRight: '1%' }}></Grid>;
    }
  };

  return (
    curTime && (
      <>
        {moment(timeStamp).format('YYYY/MM/DD LT') !==
          moment(lastTimeStamp).format('YYYY/MM/DD LT') && (
          <div style={{ textAlign: 'center' }}>
            <Typography variant="caption">
              {moment(timeStamp).format('YYYY/MM/DD') ===
              moment(curTime).format('YYYY/MM/DD')
                ? moment(timeStamp).format('LT')
                : moment(timeStamp).format('YYYY/MM/DD')}
            </Typography>
          </div>
        )}

        {senderId === userData.uid ? showRightMessage() : showLeftMessage()}
      </>
    )
  );
};

export default Message;
