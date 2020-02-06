import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

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

const Room = ({ roomId, receiver, lastMessage, timeStamp }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
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
  );
};

export default Room;
