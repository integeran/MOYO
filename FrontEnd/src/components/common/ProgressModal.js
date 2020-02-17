import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';

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
    justifyContent: 'center',
    alignItems: 'center',
    '& > div:first-child': {
      backgroundColor: '#F2F5F8 !important',
      height: '100%',
      width: '100%',
      position: 'relative !important',
    },
  },
  paper: {
    width: '30%',
    color: 'white',
    padding: '3%',
    textAlign: 'center',
    position: 'fixed',
  },
}));

const ProgressModal = ({ openProgress }) => {
  const [showFade, setShowFade] = useState(true);

  const classes = useStyles();
  const rootRef = React.useRef(null);

  useEffect(() => {
    setInterval(() => {
      setShowFade(prevState => !prevState);
    }, 1000);
  }, []);

  return openProgress ? (
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
            <Fade in={showFade} timeout={(1500, 1000)}>
              <div>
                <Typography style={{ color: '#4A44A6', marginBottom: '10%' }}>
                  Loading ...
                </Typography>
              </div>
            </Fade>
            <CircularProgress
              size="3.5rem"
              thickness="4.2"
              style={{ color: '#4A44A6' }}
            />
          </div>
        </Modal>
      </div>
    </div>
  ) : null;
};

export default ProgressModal;
