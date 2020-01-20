import React, { Component } from 'react';

class Login extends Component {
  componentDidMount() {
    window.Kakao.init('7b229589e27989dd9f1dc6dfaabbee65');
    window.Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: function(authObj) {
        console.log(authObj);
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: function(res) {
            alert(JSON.stringify(res));
            console.log(res);
          },
          fail: function(error) {
            alert(JSON.stringify(error));
          },
        });
      },
      fail: function(err) {
        alert(JSON.stringify(err));
      },
    });
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <a id="kakao-login-btn"></a>
      </div>
    );
  }
}

export default Login;
