// class version ; 공식 디자인, 연결이 안됨
// import React, { Component } from 'react';
// import { Link, Redirect, withRouter } from 'react-router-dom';
// import { useHistory } from 'react-router';
// import Signup from './Signup';

// class Login extends Component {
//   componentDidMount() {
//     window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
//     window.Kakao.Auth.createLoginButton({
//       container: '#kakao-login-btn',
//       success: function(authObj) {
//         window.Kakao.API.request({
//           url: '/v2/user/me',
//           success: function(res) {
//             // alert(JSON.stringify(res));
//             console.log(res);
//             console.log(res.properties.profile_image);
//             const ageAgreement = res.kakao_account.age_range_needs_agreement;
//             if (ageAgreement === false) {
//               console.log(ageAgreement);

//               // history.push('/signups');
//             }
//           },
//           fail: function(error) {
//             alert(JSON.stringify(error));
//           },
//         });
//       },
//       fail: function(err) {
//         alert(JSON.stringify(err));
//       },
//     });
//   }

//   render() {
//     return (
//       <div
// style={{
//   display: 'flex',
//   height: '100vh',
//   alignItems: 'center',
//   justifyContent: 'center',
// }}
//       >
//         {/* <Link
//           to={{
//             pathname: '/signup',
//             state: {
//               profileImage: '',
//             },
//           }}
//           id="kakao-login-btn"
//         ></Link> */}
//         <a id="kakao-login-btn"></a>
//       </div>
//     );
//   }
// }

// export default Login;

// function version ; 디자인 별로, 라우터 훅 이지

import React, { useEffect } from 'react';
import KakaoLogin from 'react-kakao-login';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, register, login } from '../modules/auth';
import { makeStyles } from '@material-ui/core';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const auth = useSelector(state => state.auth);
  // const { form, auth, authError } = useSelector(({ auth }) => ({
  //   form: auth.register,
  //   auth: auth.auth,
  //   authError: auth.authError,
  // }));

  const changeValue = res => {
    dispatch(
      changeField({
        form: 'loginCheck',
        key: 'userId',
        value: res.id,
      }),
    );
    dispatch(
      changeField({
        form: 'loginCheck',
        key: 'userNickname',
        value: res.properties.nickname,
      }),
    );
    // dispatch(
    //   register({
    //     provider: 0,
    //     socialId: res.id,
    //     age: 0,
    //     gender: 'm',
    //     nickname: res.properties.nickname,
    //   }),
    // );
    // dispatch(
    //   login({
    //     provider: 0,
    //     socialId: res.id,
    //   }),
    // );
  };

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

  const pushUserData = (k, v) => {
    dispatch(changeField({ form: 'userData', key: k, value: v }));
  };

  const axios = require('axios');
  const jwtDecode = require('jwt-decode');

  const getResponse = async res => {
    try {
      console.log(res);
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
    if (resData === undefined) {
      history.push({
        pathname: '/signup',
        state: {
          userProfileImage: res.profile.properties.profile_image,
          userNickname: res.profile.properties.nickname,
          userAgeRange: res.profile.kakao_account.age_range,
          userGender: res.profile.kakao_account.gender,
        },
      });
    } else {
      const jwtData = jwtDecode(resData.data.data);
      // 23일 확인 !
      pushUserData('userToken', resData.data.data);
      // dispatch(
      //   changeField({
      //     form: 'userData',
      //     key: 'userToken',
      //     value: resData.data.data,
      //   }),
      // );
      dispatch(
        changeField({
          form: 'userData',
          key: 'nickname',
          value: jwtData.user.nickname,
        }),
      );
      dispatch(
        changeField({
          form: 'userData',
          key: 'age',
          value: jwtData.user.age,
        }),
      );
      dispatch(
        changeField({
          form: 'userData',
          key: 'gender',
          value: jwtData.user.gender,
        }),
      );
      dispatch(
        changeField({
          form: 'userData',
          key: 'image',
          value: jwtData.user.image,
        }),
      );
      history.push({
        pathname: '/main',
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
