import React from 'react';

import FileMessage from './FileMessage';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';

const Message = ({
  sender,
  curUser,
  message,
  timeStamp,
  fileName,
  url,
  lastMessageUser,
}) => {
  return (
    <>
      {curUser.uId === sender.uId ? (
        <Grid container justify="flex-end" style={{ padding: '1%' }}>
          <Grid item xs={7} style={{ padding: '1%' }}>
            <div style={{ textAlign: 'right' }}>
              <Typography variant="caption">{moment().format('LT')}</Typography>
            </div>
            <div
              style={{
                textAlign: 'right',
                backgroundColor: '#e6dbdb',
                borderRadius: '8px',
              }}
            >
              {url ? (
                <FileMessage url={url} fileName={fileName} />
              ) : (
                <Typography variant="subtitle1">{message}</Typography>
              )}
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid container style={{ padding: '1%' }}>
          <Grid item xs={1} style={{ paddingRight: '1%', marginTop: '5%' }}>
            {sender.uId !== lastMessageUser.uId &&
              sender.uId !== curUser.uId && (
                <Avatar
                  alt="메세지 보낸 사람의 프로필"
                  src={sender.image}
                  style={{ width: '30px', height: '30px' }}
                />
              )}
          </Grid>

          <Grid item xs={7} style={{ padding: '1%' }}>
            <div>
              <Typography variant="caption">{moment().format('LT')}</Typography>
            </div>
            <div style={{ backgroundColor: '#e6dbdb', borderRadius: '8px' }}>
              {url ? (
                <FileMessage url={url} fileName={fileName} />
              ) : (
                <Typography variant="subtitle1">{message}</Typography>
              )}
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Message;
