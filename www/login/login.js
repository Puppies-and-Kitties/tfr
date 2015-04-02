angular.module('login', [])

.controller('LoginCtrl', function($scope){

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
    
    // setTimeout(function() {
    //   $scope.closeLogin();
    // }, 1000);
  };
    
});