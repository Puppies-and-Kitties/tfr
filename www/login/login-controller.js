angular.module('login.controllers', [])

.controller('LoginCtrl', function($scope, $state, $location, LoginFact){
  
  $scope.userStatus = LoginFact.getUserStatus;

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
    {scope: 'email, publish_actions'});
  };

});