angular.module('account.controller', [])



.controller('AccountCtrl', function($scope, $state, User) {
  $scope.fbId = User.fbid;
  $scope.username = User.first_name;

  $scope.settings = {
    enableFriends: true
  };
  
  $scope.fbLogout = function(arg){
    // Call logout function from openFB
    openFB.logout();
    // redirect to login page 
    $state.go('login')
  };
});
