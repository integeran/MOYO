import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FileMessage from './FileMessage';

const Message = ({ sender, curUser, message, timeStamp, fileName, path }) => {
  const useStyles = makeStyles({
    card: {
      minWidth: 275,
      width: 150,
      float: curUser.uId === sender.uId ? 'right' : '',
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

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  var gab = <span></span>;
  if (curUser.uId === sender.uId) {
    gab = <p style={{ clear: 'both' }}></p>;
  }

  return (
    <>
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              <img
                alt="메세지 보낸 사람의 프로필"
                src={sender.image}
                style={{ width: '40px', height: '40px' }}
              ></img>
            </Typography>
            <Typography variant="h5" component="h2">
              {sender.nickname}
            </Typography>
            {path ? (
              <FileMessage path={path} fileName={fileName} />
            ) : (
              <Typography className={classes.pos} color="textSecondary">
                {message}
              </Typography>
            )}
            <Typography variant="body2" component="p">
              {timeStamp}
            </Typography>
          </CardContent>
        </Card>
        {gab}
      </div>
    </>
  );
};

export default Message;
