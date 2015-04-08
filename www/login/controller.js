angular.module('login.controllers', [])

.controller('LoginCtrl', function($scope, $state){
  
  $scope.fbLogin = function(arg){
    openFB.login(function(response){
      if(response.status === 'connected'){
        console.log('Facebook login succeeded');
        
        // Redirect to tab.dash
        $state.go('tab.preferences');
      }
      else {
        alert('Facebook login failed');
      }
    },
    {scope: 'email, publish_actions, public_profile'});
  };

});