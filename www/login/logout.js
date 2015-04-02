angular.module('logout', [])

.controller('LogoutCtrl', function($scope){

  $scope.fbLogout = function(arg){
    openFB.logout(function(response){
      console.log('response - ', response)
      if(response.status === 'connected'){
        console.log('Successfully logged out of Facebook');
      }
      else {
        alert('Facebook logout failed');
      }
    });
  };

  $scope.fbLogin = function(arg){
    openFB.login(function(response){
      console.log('response - ', response)
      if(response.status === 'connected'){
        console.log('Facebook login succeeded');
      }
      else {
        alert('Facebook login failed');
      }
    },
    {scope: 'email, publish_actions'});    
  };
    
});