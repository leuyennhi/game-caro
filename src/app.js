/* eslint-disable import/imports-first */
import React from 'react';
import './index.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Game from './containers/Game/Game';
import MainPage from './containers/MainPage/MainPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import LoginPage from './containers/LoginPage/LoginPage';
import UpdateInfoPage from './containers/UpdateInfo/UpdateInfo';

const App = (props)=> {
  const {loggedIn} = props;
  return (
    <Switch>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/home"> 
        {loggedIn ? <MainPage/> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/update"> 
        {loggedIn ? <UpdateInfoPage/> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/game">
        {loggedIn ? <Game /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  )

}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn
})

export default connect(mapStateToProps)(App)