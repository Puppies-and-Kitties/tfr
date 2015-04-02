angular.module('login', [])

.factory('Login', function(){
  // should be factored out of this file
  var userStatus = function(){
    openFB.getLoginStatus(function(response){
      if(response.status === 'connected'){
        console.log('Logged in')
        return true;
      } 
      else {
        console.log('logged out')
        return false;
      }
    })  
  }

  return {
    userStatus: userStatus
  }
})

.controller('LoginCtrl', function($scope, $state, Login){

  $scope.fbLogin = function(arg){
    openFB.login(function(response){
      console.log('response - ', response)
      if(response.status === 'connected'){
        console.log('Facebook login succeeded');
        // Redirect to tab.dash
        $state.go('tab.dash');
      }
      else {
        alert('Facebook login failed');
      }
    },
    {scope: 'email, publish_actions'});    
  };

$scope.userStatus = Login.userStatus();

});