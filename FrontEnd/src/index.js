import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { changeField } from './modules/auth';
import rootReducer from './modules';
import App from './App';

const jwtDecode = require('jwt-decode');
const store = createStore(rootReducer, composeWithDevTools());

const pushUserData = (k, v) => {
  store.dispatch(changeField({ form: 'userData', key: k, value: v }));
};

function loadUser() {
  if (localStorage.token) {
    const jwtToken = jwtDecode(localStorage.token);
    pushUserData('userToken', localStorage.token);
    pushUserData('uid', jwtToken.user.uid);
    pushUserData('nickname', jwtToken.user.nickname);
    pushUserData('age', jwtToken.user.age);
    pushUserData('gender', jwtToken.user.gender);
    pushUserData('image', jwtToken.user.image);
  }
}

loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
