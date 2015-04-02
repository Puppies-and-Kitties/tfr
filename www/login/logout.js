angular.module('logout', [])

.controller('LogoutCtrl', function($scope){

  $scope.fbLogout = function(arg){
    openFB.logout();
  };
    
});