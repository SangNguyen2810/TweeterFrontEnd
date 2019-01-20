
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App'

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser, logoutUser} from './actions/authActions';
import store from './store/configureStore'
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  console.log('aaa');
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)