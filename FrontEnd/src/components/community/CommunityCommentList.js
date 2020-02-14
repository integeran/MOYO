import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { changeComments, changeEdit } from '../../modules/communityComment';
import axios from '../../api/axios';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

const CommunityCommentList = ({ cmId, userData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { comments } = useSelector(({ communityComment }) => ({
    comments: communityComment.comments,
  }));
  // const [commentListData, setCommentListData] = useState([]);
  const [writtenComment, setWrittenComment] = useState('댓글을 작성해주세요');
  const [editComment, setEditComment] = useState('');
  const onChangeComments = useCallback(
    comments => dispatch(changeComments(comments)),
    [dispatch],
  );
  const onChangeEdit = useCallback(
    cmCommentId => dispatch(changeEdit(cmCommentId)),
    [dispatch],
  );

  const getCommentList = async () => {
    try {
      return await axios.get(`communityComment/selectAllByCommunity/${cmId}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getComments = async () => {
    const result = await getCommentList();
    const resData = result.data.data.map(item => {
      item.edit = false;
      return {
        ...item,
      };
    });
    onChangeComments(resData);
  };

  useEffect(() => {
    getComments();
  }, []);

  const postComment = async commentData => {
    try {
      return await axios.post('communityComment/create', commentData, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitClick = async () => {
    const commentData = {
      cmId: cmId,
      uid: userData.uid,
      contents: writtenComment,
    };
    if (writtenComment.trim() && writtenComment !== '댓글을 작성해주세요') {
      const fetchComment = async () => {
        await postComment(commentData);
        getComments();
      };
      fetchComment();
    }
  };

  const putComment = async commentData => {
    try {
      return await axios.put('communityComment/update', commentData, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = async cmCommentId => {
    const commentData = {
      cmCommentId: cmCommentId,
      uid: userData.uid,
      contents: editComment,
    };
    const fetchEditComment = async () => {
      await putComment(commentData);
      getComments();
    };
    onChangeEdit(cmCommentId);
    fetchEditComment();
  };

  const deleteComment = async cmCommentId => {
    try {
      return await axios.delete(`communityComment/delete/${cmCommentId}`, {
        headers: { userToken: userData.userToken },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async cmCommentId => {
    await deleteComment(cmCommentId);
    getComments();
  };

  const handleCommentChange = e => {
    setWrittenComment(e.target.value);
  };

  const handleCommentEdit = e => {
    setEditComment(e.target.value);
  };

  return (
    <div>
      <form autoComplete="off">
        <TextField
          id="commentInput"
          value={writtenComment}
          onClick={() => {
            setWrittenComment('');
          }}
          onChange={handleCommentChange}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleSubmitClick}>
          등록
        </Button>
      </form>
      <div>
        {comments.map(comment => (
          <div>
            {comment.edit}
            {comment.nickname} : {comment.contents}
            {comment.uid === userData.uid ? (
              <Typography
                onClick={() => handleDeleteClick(comment.cmCommentId)}
              >
                댓글 삭제
              </Typography>
            ) : null}
            {comment.uid === userData.uid ? (
              <Fab
                color="secondary"
                size="small"
                aria-label="edit"
                onClick={() => onChangeEdit(comment.cmCommentId)}
              >
                <EditIcon />
              </Fab>
            ) : null}
            {comment.edit ? (
              <TextField
                id="commentEdit"
                value={editComment}
                onClick={() => {
                  setEditComment('');
                }}
                onChange={handleCommentEdit}
                variant="outlined"
              />
            ) : null}
            {comment.edit ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditClick(comment.cmCommentId)}
              >
                수정
              </Button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityCommentList;
