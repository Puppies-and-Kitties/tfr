angular.module('login.services', [])

.factory('LoginFact', function($resource){

  var UserProfile = $resource('https://graph.facebook.com/me')
  var fbToken = window.sessionStorage['fbtoken'];

  var getFbInfo = function(){
    // Returns a promise with the logged in user's basic FB info, this is resolved in the app.js stateprovider
    return UserProfile.get({access_token: fbToken}).$promise
  }

  return {
    getFbInfo: getFbInfo
  }
})