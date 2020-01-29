import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { FavoriteBorder, Favorite } from '@material-ui/icons';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

function InfoWindow(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            ㅋㅋ
          </Typography>
          <Typography component="p">리액트 어떻게 하는 걸까요~~~</Typography>
        </CardContent>
        <CardActions>
          <FavoriteBorder size="small" color="secondary">
            Share
          </FavoriteBorder>
          <Favorite size="small" color="secondary">
            Learn More
          </Favorite>
        </CardActions>
      </Card>
    </div>
  );
}

export default withStyles(styles)(InfoWindow);
