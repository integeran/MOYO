import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';

import { closeSnackBarAction } from '../../modules/snackBar';

/*
  1. openSnackBarAction을 import한다. 보통 'import { openSnackBarAction } from '../../modules/snackBar';' 이렇게 import
  2. dispatch를 설정한다. 보통 const dispatch = useDispatch(); 이렇게 설정
  3. 스낵바가 필요한 시점에 dispatch(openSnackBarAction('Message'));를 작성한다. 이런식으로, dispatch(openSnackBarAction('동행이 등록되었습니다.'));
*/
const SnackBar = () => {
  const dispatch = useDispatch();

  const message = useSelector(state => state.snackBar.snackBarMessage);
  const open = useSelector(state => state.snackBar.snackBarOpen);

  const closeSnackBar = () => {
    dispatch(closeSnackBarAction());
  };

  return (
    open && (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={2000}
          onClose={closeSnackBar}
          message={message}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={closeSnackBar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
          style={{ bottom: '4rem' }}
        />
      </>
    )
  );
};
export default SnackBar;
