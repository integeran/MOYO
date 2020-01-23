import * as React from "react";
import * as ReactDOM from "react-dom";
import * as firebase from "firebase";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

import { Provider } from "react-redux";
import configureStore from "./redux/configStore";
const { store } = configureStore();

const config = {
  apiKey: "AIzaSyDd88GaCdHnnn_7BjV-_WCARfVDP8cP5qI",
  authDomain: "react-firebase-chat-3acad.firebaseapp.com",
  databaseURL: "https://react-firebase-chat-3acad.firebaseio.com",
  projectId: "react-firebase-chat-3acad",
  storageBucket: "react-firebase-chat-3acad.appspot.com",
  messagingSenderId: "829094286915"
};
firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
