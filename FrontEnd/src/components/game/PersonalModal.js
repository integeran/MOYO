import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    width: '100%',
    position: 'absolute',
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const PersonalModal = ({ close, message }) => {
  const classes = useStyles();
  const rootRef = React.useRef(null);

  const test = () => {
    console.log(message);
  };

  return message ? (
    <div>
      <div className={classes.root} ref={rootRef}>
        <Modal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open
          className={classes.modal}
          container={() => rootRef.current}
        >
          <div className={classes.paper}>
            <h2 id="server-modal-title">{message}}</h2>
            <p id="server-modal-description">
              <img
                alt="라이언 뛰어넘기"
                src="https://item.kakaocdn.net/do/dcabec0932617c4c8adf2a55504119e9f43ad912ad8dd55b04db6a64cddaf76d"
              ></img>
              <button onClick={close}>닫기</button>
            </p>
          </div>
        </Modal>
      </div>
      {message}
    </div>
  ) : null;
};

export default PersonalModal;
