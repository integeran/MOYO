import React, { useEffect } from 'react';
import KakaoLogin from 'react-kakao-login';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, changeBool } from '../modules/auth';
import axios from '../api/axios';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const jwtDecode = require('jwt-decode');
  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const pushUserData = (k, v) => {
    dispatch(changeField({ form: 'userData', key: k, value: v }));
  };

  // const getResponse = async res => {
  //   try {
  //     return await axios.post('user/issueToken', {
  //       provider: 0,
  //       socialId: res.profile.id,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getToken = async res => {
  //   const resData = await getResponse(res);
  //   dispatch(changeBool({ key: 'isLoggedIn', value: true }));
  //   if (resData.data.status) {
  //     const jwtData = jwtDecode(resData.data.data);
  //     pushUserData('userToken', resData.data.data);
  //     pushUserData('uid', jwtData.user.uid);
  //     pushUserData('nickname', jwtData.user.nickname);
  //     pushUserData('age', jwtData.user.age);
  //     pushUserData('gender', jwtData.user.gender);
  //     pushUserData('image', jwtData.user.image);
  //     localStorage.setItem('token', resData.data.data);
  //     history.push({
  //       pathname: '/acc',
  //     });
  //   } else {
  //     history.push({
  //       pathname: '/profile',
  //       state: {
  //         userSocialId: res.profile.id,
  //         userProfileImage: res.profile.properties.profile_image,
  //         userNickname: res.profile.properties.nickname,
  //         userAgeRange: res.profile.kakao_account.age_range,
  //         userGender: res.profile.kakao_account.gender,
  //       },
  //     });
  //   }
  // };

  const getResponse = async res => {
    try {
      return await axios.post('user/issueToken', {
        provider: 0,
        socialId: res.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getToken = async res => {
    const resData = await getResponse(res);
    if (resData.data.status) {
      const jwtData = jwtDecode(resData.data.data);
      pushUserData('userToken', resData.data.data);
      pushUserData('uid', jwtData.user.uid);
      pushUserData('nickname', jwtData.user.nickname);
      pushUserData('age', jwtData.user.age);
      pushUserData('gender', jwtData.user.gender);
      pushUserData('image', jwtData.user.image);
      localStorage.setItem('token', resData.data.data);
      dispatch(changeBool({ key: 'isLoggedIn', value: true }));
      history.push({
        pathname: '/acc',
      });
    } else {
      history.push({
        pathname: '/profile',
        state: {
          userSocialId: res.id,
          userProfileImage: res.properties.profile_image,
          userNickname: res.properties.nickname,
          userAgeRange: res.kakao_account.age_range,
          userGender: res.kakao_account.gender,
          prevPath: history.location.pathname,
        },
      });
      dispatch(changeBool({ key: 'isLoggedIn', value: true }));
    }
  };

  // useEffect(() => {
  //   window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
  //   window.Kakao.Auth.createLoginButton({
  //     container: '#kakao-login-btn',
  //     success: function(authObj) {
  //       alert(JSON.stringify(authObj));
  //     },
  //     fail: function(err) {
  //       alert(JSON.stringify(err));
  //     },
  //   });
  // }, []);

  useEffect(() => {
    window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
  }, []);

  function loginWithKakao() {
    window.Kakao.Auth.loginForm({
      success: function(authObj) {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: res => {
            getToken(res);
            // console.log(res);
            // console.log(res.id);
            // console.log(res.properties.nickname);
            // console.log(res.properties.profile_image);
            // console.log(res.kakao_account.age_range);
            // console.log(res.kakao_account.gender);
          },
          fail: function(error) {
            console.log(JSON.stringify(error));
          },
        });
      },
      fail: function(err) {
        console.log(JSON.stringify(err));
      },
    });
    // window.Kakao.cleanup();
  }

  return (
    <div
      style={{
        display: 'flex',
        height: 'inherit',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <KakaoLogin
        jsKey={process.env.REACT_APP_KAKAO_KEY}
        buttonText="kakao로 로그인"
        onSuccess={result => getToken(result)}
        onFailure={result => console.log(result)}
        useDefaultStyle={true}
        getProfile={true}
      ></KakaoLogin> */}

      <a id="custom-login-btn" onClick={loginWithKakao}>
        <img
          src="//mud-kage.kakao.com/14/dn/btqbjxsO6vP/KPiGpdnsubSq3a0PHEGUK1/o.jpg"
          width="300"
          alt="Kakao"
        />
      </a>
    </div>
  );
};

export default Login;
