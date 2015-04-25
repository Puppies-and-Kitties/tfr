angular.module('login.controllers', ['firebase', 'ui.router'])


.controller('LoginCtrl', [
  '$scope', 
  '$state', 
  '$firebaseAuth', 
  'FIREBASE_REF', 
  'userSession',

  function($scope, $state, $firebaseAuth, FIREBASE_REF, userSession){
  
    var ref = new Firebase(FIREBASE_REF);

    ref.onAuth(function(authData){
      if (authData) {
        console.log('onAuth auth data',authData);
        $http({
            method: 'POST',
            url: 'http://localhost:8888/user/auth/'+authData.facebook.id,
            data: {token: authData.token}
          })
          .then(function(user){
            console.log('Authenicated on server',user.data);
            userSession.user = authData.facebook.cachedUserProfile;
            userSession.user.token = user.data.token;
            $state.go('tab.account');
          });
        
        
      } 
      else {
        $state.go('login');
      }
    });

    userSession.auth = $firebaseAuth(ref);

    $scope.login = function(provider){
      userSession.auth.$authWithOAuthPopup('facebook', function(error, authData) {
        if (error) {
          console.log('Login Failed!', error);
        } 
        else {
          console.log('Authenticated successfully with payload:', authData);
        }
      });
    };
  
}]);
