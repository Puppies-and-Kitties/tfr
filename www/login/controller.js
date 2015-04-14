angular.module('login.controllers', [])

.controller('LoginCtrl', function($scope, $state, LoginFact, FIREBASE_REF, $firebaseSimpleLogin, userSession){
  
  $scope.fbLogin = function(arg){
    openFB.login(function(response){
      if(response.status === 'connected'){
        console.log('Facebook login succeeded');
        
        // Redirect to tab.dash
        $state.go('tab.account');
      }
      else {
        alert('Facebook login failed');
      }
    },
    {scope: 'email, publish_actions, public_profile'});
  };

  userSession.auth=$firebaseSimpleLogin(new Firebase(FIREBASE_REF));

  $scope.login = function(provider){
    userSession.auth.$login(provider);
  }

});