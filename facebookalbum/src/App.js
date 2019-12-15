import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import facebookAPI from './api/facebook';
import './App.scss';
import Albums from './modules/Albums/component/Album';
import Login from './modules/Login/component/Login';
import PrivateRoute from './privateRoute';
import { getUserDataSuccess, getUserProfileSuccess } from './actions/index';
import Home from './modules/Home/component/Home';

class App extends React.Component {

  state = {
    authenticated: false
  };

  componentDidMount() {
    if (localStorage.getItem('accessToken')) {
      this.setState({ authenticated: true });
    }

    facebookAPI.checkLoginStatus(response => {
      console.log(response);
      // Here I am getting status UNKNOWN even if user is logged in. 
      if (response.status !== 'connected') {
        // login error - redirect to login
        this.props.history.push('/login');
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { isLoggedIn } = this.props;
    if (isLoggedIn && isLoggedIn !== prevProps.isLoggedIn) {
      // fetch user data like albums, etc
      facebookAPI.getAlbums(response => {
        const albums = response.albums || { data: [] };
        this.props.gotUserData(albums.data);

        facebookAPI.getUserProfile(response => {
          this.props.gotUserProfile(response);
          this.props.history.push('/facebook-albums');
        });
      });
    }
  }
  
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className='App container'>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute path='/facebook-albums' authenticated={isLoggedIn}>
            <Home />
          </PrivateRoute>
          <Route path='/'>
            <Redirect
              to={{
                pathname: '/facebook-albums'
              }}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({ isLoggedIn: state.userData.isLoggedIn });

export default withRouter(
  connect(mapStateToProps, {
    gotUserData: getUserDataSuccess,
    gotUserProfile: getUserProfileSuccess
  })(App)
);
