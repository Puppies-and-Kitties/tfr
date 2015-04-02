angular.module('login.controllers', [])

.controller('LoginCtrl', function($scope, $state, $location, LoginFact){
  
  $scope.userStatus = LoginFact.getUserStatus;

  $scope.checkState = function(){
    console.log('state check - ', $state);
  }

  $scope.fbLogin = function(arg){
    openFB.login(function(response){
      if(response.status === 'connected'){
        console.log('Facebook login succeeded');
        console.log('$state before - ', $location);
        
        // Redirect to tab.dash
        // $state.go('tab.account');
        $location.path('/tab/account');
        console.log('$state after - ', $location);
      }
      else {
        alert('Facebook login failed');
      }
    },
    {scope: 'email, publish_actions'});
  };

});