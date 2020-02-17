import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../api/axios';

import { getPostListAction, getInfoWindow } from '../../modules/postmap';

import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Grid from '@material-ui/core/Grid';
import PostmapGoogle from '../../components/postmap/PostmapGoogle';
import PostmapChat from '../../components/postmap/PostmapChat';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { typography } from '@material-ui/system';

const Postmap = () => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.auth.userData);

  const pos = useSelector(state => state.postmap.pos);

  const [postListTop, setPostListTop] = useState([]);
  const [postListExceptTop, setPostListExceptTop] = useState([]);
  const [curTime, setCurTime] = useState('');

  useEffect(() => {
    onInit();
  }, []);

  const onInit = async () => {
    const res = await onAxiosGetTime();
    setCurTime(res.data.data);
  };

  const getFetchMarker = async pos => {
    return await axios.get(
      `postmap/selectAll?latitude=${pos.latitude}&longitude=${pos.longitude}&uId=${userData.uid}`,
      {
        headers: { userToken: userData.userToken },
      },
    );
  };

  const onAxiosGetTime = async () => {
    return await axios.get('DM/getTime', {
      headers: { userToken: userData.userToken },
    });
  };

  const likePost = async pmId => {
    return await axios.put(
      `postmap/likePostmap/`,
      {
        pmId: pmId,
        pmLikeId: 0,
        uid: userData.uid,
      },
      {
        headers: { userToken: userData.userToken },
      },
    );
  };

  const listFetch = async curpos => {
    const res = await getFetchMarker(curpos);
    dispatch(getPostListAction(res.data.data));

    const TOP = 3;
    var tempList = [];

    for (let i = 0; i < res.data.data.length; i++) {
      tempList.push(res.data.data[i]);
    }

    tempList.sort(function(a, b) {
      return b.likes - a.likes;
    });

    var listTop = [];
    for (var i = 0; i < TOP; i++) {
      listTop.push(tempList[i]);
    }

    setPostListTop(listTop);

    var listExceptTop = [];
    res.data.data.forEach(data => {
      for (var i = 0; i < TOP; i++) {
        if (listTop[i].pmId === data.pmId) {
          break;
        }

        if (i === TOP - 1) {
          listExceptTop.push(data);
        }
      }
    });

    setPostListExceptTop(listExceptTop);
  };

  const calcTime = time => {
    var distanceTime = (new Date(curTime) - new Date(time)) / (1000 * 60);
    if (distanceTime >= 60) {
      distanceTime = distanceTime / 60;
      if (distanceTime >= 24) {
        distanceTime = Math.ceil(distanceTime / 24);
        return distanceTime + '일 전';
      } else {
        distanceTime = Math.ceil(distanceTime);
        return distanceTime + '시간 전';
      }
    } else {
      distanceTime = Math.ceil(distanceTime);
      return distanceTime + '분 전';
    }
  };

  return (
    <>
      <div style={{ padding: '4%' }}>
        <PostmapGoogle listFetch={listFetch} />
        <PostmapChat listFetch={listFetch} />
        {postListTop.size > 0 ? (
          <div id="chatList">
            <div id="chatListTop">
              <div>
                {postListTop.map((chat, index) => {
                  return (
                    <div>
                      <Grid
                        container
                        alignItems="center"
                        style={{ padding: '2%' }}
                      >
                        <Grid
                          item
                          xs={10}
                          onClick={async () => {
                            dispatch(getInfoWindow(chat));

                            listFetch(pos);
                          }}
                        >
                          <Grid container direction="column">
                            <Grid item xs={6} style={{ maxWidth: '100%' }}>
                              <Typography>{chat.contents}</Typography>
                            </Grid>
                            <Typography variant="caption">
                              {calcTime(chat.registerDate)}
                            </Typography>
                            <Grid
                              item
                              xs={6}
                              style={{ maxWidth: '100%' }}
                            ></Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          onClick={async () => {
                            const res = await likePost(chat.pmId);
                            if (res) {
                              listFetch(pos);
                            }
                          }}
                        >
                          <Typography style={{ float: 'right' }}>
                            x{chat.likes}
                          </Typography>
                          {chat.pmLikeId !== 0 ? (
                            <FavoriteIcon
                              style={{
                                float: 'right',
                                cursor: 'pointer',
                                color: 'red',
                              }}
                            />
                          ) : (
                            <FavoriteBorderIcon
                              style={{ float: 'right', cursor: 'pointer' }}
                            />
                          )}
                        </Grid>
                      </Grid>
                      <Divider />
                    </div>
                  );
                })}
              </div>
            </div>

            <div id="chatListBottom" style={{ overflow: 'auto' }}>
              {postListExceptTop.map((chat, index) => {
                return (
                  <>
                    <Grid
                      container
                      alignItems="center"
                      style={{ padding: '2%' }}
                    >
                      <Grid
                        item
                        xs={10}
                        onClick={async () => {
                          dispatch(getInfoWindow(chat));

                          listFetch(pos);
                        }}
                      >
                        <Grid container direction="column">
                          <Grid item xs={6} style={{ maxWidth: '100%' }}>
                            <Typography>{chat.contents}</Typography>
                          </Grid>
                          <Typography variant="caption">
                            {calcTime(chat.registerDate)}
                          </Typography>
                          <Grid item xs={6} style={{ maxWidth: '100%' }}></Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography style={{ float: 'right' }}>
                          x{chat.likes}
                        </Typography>
                        {chat.pmLikeId !== 0 ? (
                          <FavoriteIcon
                            style={{
                              float: 'right',
                              cursor: 'pointer',
                              color: 'red',
                            }}
                            onClick={async () => {
                              const res = await likePost(chat.pmId);
                              if (res) {
                                listFetch(pos);
                              }
                            }}
                          />
                        ) : (
                          <FavoriteBorderIcon
                            style={{ float: 'right', cursor: 'pointer' }}
                            onClick={async () => {
                              const res = await likePost(chat.pmId);
                              if (res) {
                                listFetch(pos);
                              }
                            }}
                          />
                        )}
                      </Grid>
                    </Grid>
                    <Divider />
                  </>
                );
              })}
            </div>
          </div>
        ) : (
          <Typography>주변 포스트맵이 없네요? 등록해보시겠어요?</Typography>
        )}
      </div>
    </>
  );
};

export default Postmap;
