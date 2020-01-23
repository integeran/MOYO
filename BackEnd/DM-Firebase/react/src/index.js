import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import DmRoom from './pages/DmRoom';
import DmRoomList from './pages/DmRoomList';

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

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/DmRoom" component={DmRoom} />
      <Route path="/DmRoomList" component={DmRoomList} />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
