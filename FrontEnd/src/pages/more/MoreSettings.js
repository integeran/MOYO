import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeBool } from '../../modules/auth';

const MoreSettings = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    // window.Kakao.Auth.logout();
    localStorage.removeItem('token');
    dispatch(changeBool({ key: 'isLoggedIn', value: false }));
    window.Kakao.cleanup();
  };

  return (
    <div>
      <h1 onClick={handleLogOut}>로그아웃</h1>
    </div>
  );
};

export default MoreSettings;
