import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    width: 150,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Room = ({ roomId, receiverId, lastMessage, timeStamp }) => {
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

  const classes = useStyles();

  return (
    receiver && (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {receiver.nickname}
          </Typography>
          <Typography variant="h5" component="h2">
            <img
              alt="리시버의 이미지"
              src={receiver.image}
              style={{ width: '40px', height: '40px' }}
            ></img>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {lastMessage}
          </Typography>
          <Typography variant="body2" component="p">
            {timeStamp}
          </Typography>
        </CardContent>
        <Link to={`/DmRoom/${receiver.uId}`}>방 들어가기</Link>
      </Card>
    )
  );
};

export default Room;
