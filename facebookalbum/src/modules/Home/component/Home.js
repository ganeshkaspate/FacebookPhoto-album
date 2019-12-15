import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import Profile from '../../Profile/component/Profile';
import Albums from '../../Albums/component/Album';
import AlbumDetail from '../../AlbumDetail/component/AlbumDetail';
import Slideshow from '../../SlideShow/component/SlideShow';


class Home extends React.Component {
  
  goToAlbums = () => {
    this.props.history.push('/facebook-albums/albums');
  };

  render() {
    const { userProfile } = this.props;
    return (
      <div>
        <Switch>
          <Route path='/facebook-albums/albums/:albumId/slideshow'>
            <Slideshow />
          </Route>
          <Route path='/facebook-albums/albums/:albumId'>
            <AlbumDetail />
          </Route>
          <Route path='/facebook-albums/profile'>
            <Profile userProfile={userProfile} goToAlbums={this.goToAlbums}></Profile>
          </Route>
          <Route path='/facebook-albums/albums'>
            <Albums />
          </Route>

          <Route path='/facebook-albums/'>
            <Redirect
              to={{
                pathname: '/facebook-albums/profile'
              }}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.userData.profile
  };
};

export default withRouter(connect(mapStateToProps, null)(Home));
