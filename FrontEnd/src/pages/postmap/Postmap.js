import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../api/axios';

import { getPostListAction, getInfoWindow } from '../../modules/postmap';

import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import PostmapGoogle from './PostmapGoogle';
import PostmapChat from './PostmapChat';

const mapStyles = {
  height: '300px',
};

const Postmap = () => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.auth.userData);
  const postList = useSelector(state => state.postmap.postList);
  const pos = useSelector(state => state.postmap.pos);

  const getFetchMarker = async pos => {
    return await axios.get(
      `postmap/selectAll?latitude=${pos.latitude}&longitude=${pos.longitude}&uId=${userData.uid}`,
      {
        headers: { userToken: userData.userToken },
      },
    );
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

  return (
    <>
      <div>
        <PostmapGoogle mapStyles={mapStyles} />
        <PostmapChat />
        <div id="chatList" style={{ overflow: 'auto' }}>
          {postList.map((chat, index) => {
            return (
              <>
                <Grid container alignItems="center" style={{ padding: '2%' }}>
                  <Grid
                    item
                    xs={10}
                    onClick={async () => {
                      dispatch(getInfoWindow(chat));

                      const res2 = await getFetchMarker(pos);
                      dispatch(getPostListAction(res2.data.data));
                    }}
                  >
                    <Grid container direction="column">
                      <Grid item xs={6} style={{ maxWidth: '100%' }}>
                        <Typography>{chat.contents}</Typography>
                      </Grid>
                      <Typography variant="caption">
                        {moment(chat.registerDate).format(
                          'YYYY-MM-DD HH:SS:DD',
                        )}
                      </Typography>
                      <Grid item xs={6} style={{ maxWidth: '100%' }}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <span style={{ float: 'right' }}>x{chat.likes}</span>
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
                            const res2 = await getFetchMarker(pos);
                            dispatch(getPostListAction(res2.data.data));
                          }
                        }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        style={{ float: 'right', cursor: 'pointer' }}
                        onClick={async () => {
                          const res = await likePost(chat.pmId);
                          if (res) {
                            const res2 = await getFetchMarker(pos);
                            dispatch(getPostListAction(res2.data.data));
                          }
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Postmap;
