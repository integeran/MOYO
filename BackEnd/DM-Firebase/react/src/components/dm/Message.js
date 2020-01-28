import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Message = ({ userImage, userName, message, timeStamp, direct }) => {
  const useStyles = makeStyles({
    card: {
      minWidth: 275,
      width: 150,
      float: direct === 'right' ? 'right' : '',
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
  if (direct === 'right') {
    gab = <p style={{ clear: 'both' }}></p>;
  }

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {userImage}
          </Typography>
          <Typography variant="h5" component="h2">
            {userName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {message}
          </Typography>
          <Typography variant="body2" component="p">
            {timeStamp}
          </Typography>
        </CardContent>
      </Card>
      {gab}
    </>
  );
};

export default Message;
