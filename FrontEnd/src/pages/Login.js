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
import KakaoLogin from 'react-kakao-login';
import { useHistory, withRouter } from 'react-router-dom';
import React from 'react';

const Login = () => {
  const history = useHistory();

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
        onSuccess={result => {
          console.log(result);
          if (
            result.profile.kakao_account.age_range_needs_agreement === false
          ) {
            history.push({
              pathname: '/signup',
              state: {
                userProfileImage: result.profile.properties.profile_image,
                userNickname: result.profile.properties.nickname,
                userAgeRange: result.profile.kakao_account.age_range,
                userGender: result.profile.kakao_account.gender,
              },
            });
          }
        }}
        onFailure={result => console.log(result)}
        useDefaultStyle={true}
        getProfile={true}
      />
    </div>
  );
};

export default Login;
