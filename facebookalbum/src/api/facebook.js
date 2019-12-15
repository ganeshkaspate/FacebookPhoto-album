function facebookAPI() {
    const returnVal = {};
    // Note - we wait till the facebook sdk is loaded in the app usng promises (see index.html)
    const facebookPromise = window._onFacebook;
  
    returnVal.login = function(callback) {
      facebookPromise.then(FB => {
        FB && FB.login(callback , { scope: ['user_photos', 'user_location'] });
      });
    };
    returnVal.getAlbums = function(callback) {
      facebookPromise.then(FB => {
        // FB && FB.api('/me?fields=albums', callback || defaultCallback);
        FB && FB.api('/me?fields=albums{name,count,cover_photo{picture}}', callback);
      });
    };
    returnVal.getUserProfile = function(callback) {
      facebookPromise.then(FB => {
        FB &&
          FB.api(
            '/me?fields=id,name,birthday,email,hometown,picture.width(200).height(200),location',
            callback
          );
      });
    };
    returnVal.checkLoginStatus = function(callback) {
      facebookPromise.then(FB => {
        FB && FB.getLoginStatus(callback, true);
      });
    };
    returnVal.getAlbumDetails = function(albumId, callback) {
      facebookPromise.then(FB => {
        FB && FB.api(`/${albumId}/?fields=photos{picture,images}`,callback, true);
      });
    }
    return returnVal;
  }
  
  export default facebookAPI();
  