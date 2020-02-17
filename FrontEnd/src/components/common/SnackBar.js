import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

/*
  1. 쓰려는 페이지에 정의
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const handleSnackBarOpen = () => {  setSnackbarOpen(true);  };
  const handleSnackBarClose = () => {  setSnackbarOpen(false);  };

  2. return 안에 SnackBar 컴포넌트 명시
  <SnackBar
    open={snackbarOpen}
    contents="수정되었습니다."
    onClose={handleSnackBarClose}
  ></SnackBar>

  3. 기존 수정을 실행한 버튼 onClick={handleSnackBarOpen}

*/
const SnackBar = ({ open, contents, onClose }) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={contents}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
        style={{ bottom: '4rem' }}
      />
    </>
  );
};
export default SnackBar;
