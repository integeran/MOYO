import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from '../../api/axios';

import NearMeIcon from '@material-ui/icons/NearMe';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';

const mapStyles = {
  width: '400px',
  height: '300px',
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export const Postmap = props => {
  const userData = useSelector(state => state.auth.userData);

  const [postList, setPostList] = useState([]);
  const [pos, setPos] = useState([]);
  const [chatText, setChatText] = useState('');
  const [timer, setTimer] = useState(0);
  const [inish, setInish] = useState(true);
  const [infoWindow, setInfoWindow] = useState(null);
  const [infoWindowCheck, setInfoWindowCheck] = useState(false);

  const onChatText = e => {
    if (e.target.value.length < 30) {
      setChatText(e.target.value);
    }
  };

  const onSetInish = () => {
    setInfoWindow(infoWindow ? infoWindow : null);
    setInfoWindowCheck(infoWindowCheck ? true : false);
    inish ? setInish(false) : setInish(true);
  };

  useEffect(() => {
    getPosition();
    // fetchMarker();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer, infoWindow, infoWindowCheck]);

  const classes = useStyles();

  const fetchMarker = pos => {
    axios
      .get(
        `postmap/selectAll?latitude=${pos.latitude}&longitude=${pos.longitude}`,
        {
          headers: { userToken: userData.userToken },
        },
      )
      .then(res => {
        setPostList(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log('getCurrentPosition');
        setPos([]);

        var curpos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        var savepos = [];
        savepos.push(curpos);

        setPos(savepos);

        fetchMarker(curpos);
      });
    } else {
      console.log('navigator error');
    }
  };

  const displayMarkers = () => {
    console.log('displayMarkers: ', postList);

    return postList.map((chat, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: chat.latitude,
            lng: chat.longitude,
          }}
          onClick={() => {
            console.log(chat);
            setInfoWindow(chat);
            setInfoWindowCheck(true);
            onSetInish();
          }}
        />
      );
    });
  };

  const saveChat = () => {
    let nowDate = moment(new Date()).format('YYYY-MM-DD');
    if (timer > 0) {
      alert('재사용 시간이 도달하지 않았습니다.');
    } else if (chatText.length > 0) {
      // var curChat = {
      //   chat_id: 1,
      //   contents: chatText,
      //   latitude: pos[0].latitude,
      //   longitude: pos[0].longitude,
      //   register_id: userData.uid,
      //   like: false,
      //   register_date: nowDate,
      // };

      axios
        .post(
          `postmap/insertPostmap/`,
          {
            contents: chatText,
            latitude: pos[0].latitude,
            longitude: pos[0].longitude,
            likes: 0,
            pmId: 0,
            registerDate: nowDate,
            registerId: userData.uid,
          },
          {
            headers: { userToken: userData.userToken },
          },
        )
        .then(res => {
          var curpos = {
            latitude: pos[0].latitude,
            longitude: pos[0].longitude,
          };
          fetchMarker(curpos);
        })
        .catch(e => {
          console.log(e);
        });

      setChatText('');

      setTimer(5);
    }
  };

  const enterSaveChat = e => {
    if (e.key === 'Enter') {
      saveChat();
    }
  };

  return (
    <div>
      <div id="googleMap">
        {pos.map((curpos, index) => {
          return (
            <Map
              key={index}
              google={props.google}
              zoom={13}
              style={mapStyles}
              initialCenter={{ lat: curpos.latitude, lng: curpos.longitude }}
              onClick={() => {
                console.log('mapClick');
              }}
            >
              {displayMarkers()}
              {infoWindow && (
                <InfoWindow
                  onCloseClick={() => {
                    setInfoWindow(null);
                    setInfoWindowCheck(false);
                  }}
                  position={{
                    lat: infoWindow.latitude,
                    lng: infoWindow.longitude,
                  }}
                  visible={infoWindowCheck}
                >
                  <div>
                    <h2>{infoWindow.registerId}</h2>
                    <p>{infoWindow.contents}</p>
                  </div>
                </InfoWindow>
              )}
            </Map>
          );
        })}
      </div>

      <div id="chat" style={{ margin: '0 auto' }}>
        <Grid
          container
          style={{ width: '400px' }}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={2} />
          <Grid item xs={7}>
            <TextField
              placeholder="포스트맵을 작성하세요."
              onChange={onChatText}
              value={chatText}
              onKeyPress={enterSaveChat}
              fullWidth
              style={{ marginTop: '5px' }}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton aria-label="delete" className={classes.margin}>
              <NearMeIcon color="primary" onClick={saveChat} />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={2}
            style={{ textAlign: 'center', color: timer < 4 ? 'red' : 'black' }}
          >
            <span>{timer > 0 ? timer + '초' : null}</span>
          </Grid>
        </Grid>
      </div>

      <div
        id="chatList"
        style={{ overflow: 'auto', width: '400px', height: '400px' }}
      >
        {postList.map((chat, index) => {
          return (
            <>
              <List className={classes.root} key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={chat.contents}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {chat.registerDate}
                          <span style={{ float: 'right' }}>x{chat.likes}</span>
                        </Typography>
                        {chat.like ? (
                          <FavoriteIcon
                            style={{
                              float: 'right',
                              cursor: 'pointer',
                              color: 'red',
                            }}
                            onClick={() => {
                              chat.like = chat.like ? false : true;
                              onSetInish();
                            }}
                          />
                        ) : (
                          <FavoriteBorderIcon
                            style={{ float: 'right', cursor: 'pointer' }}
                            onClick={() => {
                              chat.like = chat.like ? false : true;
                              onSetInish();
                            }}
                          />
                        )}
                        {/* {" — I'll be in your neighborhood doing errands this…"} */}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            </>
          );
        })}
      </div>
      <div style={{ marginBottom: '200px' }}></div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB80YxWaSrVECbYuvospx4M9fQ7_CFB3Kk',
})(Postmap);
