import React, { useEffect } from 'react';
import KakaoLogin from 'react-kakao-login';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, register, login } from '../modules/auth';
import { makeStyles } from '@material-ui/core';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (authError) {
  //     console.log('오류');
  //     console.log(authError);
  //     return;
  //   }
  //   if (auth) {
  //     console.log('성공');
  //     console.log(auth);
  //   }
  // }, [auth, authError]);

  const axios = require('axios');
  const jwtDecode = require('jwt-decode');

  const pushUserData = (k, v) => {
    dispatch(changeField({ form: 'userData', key: k, value: v }));
  };

  const getResponse = async res => {
    try {
      return await axios.post('http://70.12.246.66:8080/user/issueToken', {
        provider: 0,
        socialId: res.profile.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getToken = async res => {
    const resData = await getResponse(res);
    // pushUserData('nickname', res.profile.properties.nickname);
    // pushUserData('age', res.profile.kakao_account.age_range);
    // pushUserData('gender', res.profile.kakao_account.gender);
    // pushUserData('image', res.profile.properties.profile_image);
    if (resData.data.status) {
      const jwtData = jwtDecode(resData.data.data);
      pushUserData('userToken', resData.data.data);
      pushUserData('nickname', jwtData.user.nickname);
      pushUserData('age', jwtData.user.age);
      pushUserData('gender', jwtData.user.gender);
      pushUserData('image', jwtData.user.image);
      localStorage.setItem('token', resData.data.data);
      history.push({
        pathname: '/main',
      });
    } else {
      history.push({
        pathname: '/signup',
        state: {
          userSocialId: res.profile.id,
          userProfileImage: res.profile.properties.profile_image,
          userNickname: res.profile.properties.nickname,
          userAgeRange: res.profile.kakao_account.age_range,
          userGender: res.profile.kakao_account.gender,
        },
      });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <KakaoLogin
        jsKey={process.env.REACT_APP_KAKAO_KEY}
        buttonText="kakao로 로그인"
        onSuccess={result => getToken(result)}
        onFailure={result => console.log(result)}
        useDefaultStyle={true}
        getProfile={true}
      ></KakaoLogin>
    </div>
  );
};

export default Login;
