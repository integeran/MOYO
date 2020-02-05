import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

const Postmap = props => {
  const userData = useSelector(state => state.auth.userData);

  const [postList, setPostList] = useState([]);
  const [pos, setPos] = useState([]);
  const [chatText, setChatText] = useState('');
  const [timer, setTimer] = useState(0);
  const [inish, setInish] = useState(true);
  const [infoWindow, setInfoWindow] = useState(null);
  const [infoWindowCheck, setInfoWindowCheck] = useState(false);

  // const onChatText = e => {
  //   if (e.target.value.length < 30) {
  //     setChatText(e.target.value);
  //   }
  // };

  const onSetInish = () => {
    console.log(infoWindow + ' : ' + infoWindowCheck);
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
        `postmap/selectAll?latitude=${pos.latitude}&longitude=${pos.longitude}&uId=${userData.uid}`,
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
        // console.log('getCurrentPosition');
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
    return postList.map((chat, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: chat.latitude,
            lng: chat.longitude,
          }}
          animation={props.google.maps.Animation.DROP}
          onClick={() => {
            // console.log(chat);
            setInfoWindow(chat);
            setInfoWindowCheck(true);
            onSetInish();
          }}
          icon={{
            path: props.google.maps.SymbolPath.CIRCLE,
            fillColor: '#D03A3A',
            fillOpacity: 1,
            strokeColor: '#912626',
            strokeOpacity: 1,
            strokeWeight: 1,
            scale: 7,
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

  // const onChatText = useCallback(
  //   e => {
  //     if (e.target.value.length < 30) {
  //       setChatText(e.target.value);
  //     }
  //   },
  //   [enterFlag],
  // );

  const onChatText = e => {
    console.log(e.type);
    if (e.target.value.length < 30) {
      setChatText(e.target.value);
    }
  };

  const enterSaveChat = e => {
    if (e.key === 'Enter') {
      saveChat();
    }
  };

  const likePost = pmId => {
    getPosition();
    axios
      .put(
        `postmap/likePostmap/`,
        {
          pmId: pmId,
          pmLikeId: 0,
          uid: userData.uid,
        },
        {
          headers: { userToken: userData.userToken },
        },
      )
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <div
        id="googleMap"
        style={{
          width: 'inherit',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
              mapTypeControl={false}
              streetViewControl={false}
              fullscreenControl={false}
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
                    {/* <h2>{infoWindow.registerId}</h2> */}
                    <p>{infoWindow.contents}</p>
                  </div>
                </InfoWindow>
              )}
            </Map>
          );
        })}
        <Grid item xs={2} />
      </div>
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
      <div id="chatList" style={{ overflow: 'auto' }}>
        {postList.map(chat => {
          return (
            <>
              <List className={classes.root} key={chat.pmId}>
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
                          {moment(chat.registerDate).format(
                            'YYYY-MM-DD HH:SS:DD',
                          )}
                          <span style={{ float: 'right' }}>x{chat.likes}</span>
                        </Typography>
                        {chat.pmLikeId !== 0 ? (
                          <FavoriteIcon
                            style={{
                              float: 'right',
                              cursor: 'pointer',
                              color: 'red',
                            }}
                            onClick={() => {
                              onSetInish();
                              likePost(chat.pmId);
                            }}
                          />
                        ) : (
                          <FavoriteBorderIcon
                            style={{ float: 'right', cursor: 'pointer' }}
                            onClick={() => {
                              onSetInish();
                              likePost(chat.pmId);
                            }}
                          />
                        )}
                      </React.Fragment>
                    }
                    onClick={() => {
                      console.log('didi');
                      console.log(chat);
                      setInfoWindow(chat);
                      setInfoWindowCheck(true);
                      // onSetInish();
                      getPosition();
                    }}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            </>
          );
        })}
      </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB80YxWaSrVECbYuvospx4M9fQ7_CFB3Kk',
})(Postmap);
