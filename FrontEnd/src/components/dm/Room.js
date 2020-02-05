import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import axios from '../../api/axios';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';

const Room = ({ roomId, receiverId, lastMessage, timeStamp }) => {
  const history = useHistory();

  const userData = useSelector(state => state.auth.userData);

  const [receiver, setReceiver] = useState('');

  const onAxiosGetUser = async id => {
    return await axios.get('DM/getUser?uId=' + id, {
      headers: { userToken: userData.userToken },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const res = await onAxiosGetUser(receiverId);
      setReceiver(res.data.data.user);
    };
    getData();
  }, []);

  const goDmRoom = () => {
    history.push({
      pathname: '/dmroom/' + receiverId,
    });
  };

  return (
    receiver && (
      <ListItem button onClick={goDmRoom} style={{ padding: '2%' }}>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Avatar
              alt="리시버의 이미지"
              src={receiver.image}
              style={{ width: '40px', height: '40px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="column">
              <Grid
                item
                xs={6}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {receiver.nickname}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ maxWidth: '100%' }}>
                <Typography
                  variant="subtitle1"
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {lastMessage}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Typography variant="caption">
              {timeStamp.substr(0, timeStamp.indexOf(' ')) ===
              moment().format('YYYY/MM/DD')
                ? timeStamp.substr(timeStamp.indexOf(' ') + 1)
                : timeStamp.substr(0, timeStamp.indexOf(' '))}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    )
  );
};

export default Room;
