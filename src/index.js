/* eslint-disable import/imports-first */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Game from './containers/Game/Game';
import Registration from './containers/Registration/Registration';
import MainPage from './containers/MainPage/MainPage';
import Login from './containers/Login/Login';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers'


const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/register" exact component={Registration} />
        <Route path="/login" exact component={Login} />
        <Route path="/game" component={Game} />
        <Route path="/" component={MainPage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();