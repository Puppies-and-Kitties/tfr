angular.module('login.controllers', ['firebase', 'ui.router'])

.controller('LoginCtrl', function($scope, $state, $firebaseAuth, FIREBASE_REF, userSession){
  
  // {scope: 'email, publish_actions, public_profile'});

  var ref = new Firebase(FIREBASE_REF);
  

  ref.onAuth(function(authData){
    if(authData){
      console.log('onAuth',authData);
      console.log('$state',$state);
      userSession.user = authData.facebook;
      $state.go('tab.account');
    } else {
      $state.go('login');
    }
  });

  userSession.auth = $firebaseAuth(ref);

  $scope.login = function(provider){
    userSession.auth.$authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  }
});