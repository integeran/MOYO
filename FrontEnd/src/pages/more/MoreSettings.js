import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeBool } from '../../modules/auth';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import BaseAppBar from '../../components/common/BaseAppBar';

const MoreSettings = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    // window.Kakao.Auth.logout();
    localStorage.removeItem('token');
    dispatch(changeBool({ key: 'isLoggedIn', value: false }));
    window.Kakao.cleanup();
  };

  const handleBackIcon = () => {
    history.push('/more');
  };

  return (
    <div>
      <BaseAppBar
        title={'설정'}
        Icon1={<ArrowBackIosIcon onClick={handleBackIcon} />}
        // Icon2={<ChatIcon />}
        // handleClick1={handleMoveBack}
      />
      <h1 onClick={handleLogOut}>로그아웃</h1>
    </div>
  );
};

export default MoreSettings;
