import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import loading from './modules/loading';
import { changeField } from './modules/auth';

const jwtDecode = require('jwt-decode');

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

const pushUserData = (k, v) => {
  store.dispatch(changeField({ form: 'userData', key: k, value: v }));
};

function loadUser() {
  if (localStorage.token) {
    const jwtToken = jwtDecode(localStorage.token);
    pushUserData('userToken', localStorage.token);
    pushUserData('nickname', jwtToken.user.nickname);
    pushUserData('age', jwtToken.user.age);
    pushUserData('gender', jwtToken.user.gender);
    pushUserData('image', jwtToken.user.image);
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/main" component={Main} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
