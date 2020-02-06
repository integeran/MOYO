import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { changeField, changeBool } from './modules/auth';
import rootReducer from './modules';
import App from './App';
import * as firebase from 'firebase';

const jwtDecode = require('jwt-decode');

const config = {
  apiKey: 'AIzaSyA0CkmtA7OKgn_qX56-LzpaIwGr1A_eV-0',
  authDomain: 'fir-tutorial-6c3c4.firebaseapp.com',
  databaseURL: 'https://fir-tutorial-6c3c4.firebaseio.com',
  projectId: 'fir-tutorial-6c3c4',
  storageBucket: 'fir-tutorial-6c3c4.appspot.com',
  messagingSenderId: '524593509527',
  appId: '1:524593509527:web:450b2af17a4580885fe5d2',
  measurementId: 'G-E7Q95PNHVB',
};

firebase.initializeApp(config);

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
    store.dispatch(changeBool({ key: 'isLoggedIn', value: true }));
  } else {
    store.dispatch(changeBool({ key: 'isLoggedIn', value: false }));
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
