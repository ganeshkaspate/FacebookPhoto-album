import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './modules/Home/component/Home';
import Login from './modules/Login/component/Login';


function App() {
  return (
    <div className="App-container">
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>
          <Redirect
            to={{
              pathname: '/facebook-albums'
            }}
          />
        </Route>
      </Switch>
    </div >
  );
}

export default App;
