angular.module('logout', [])

.controller('LogoutCtrl', function($scope, $state){

  $scope.fbLogout = function(arg){
    openFB.logout();
    $state.go('login')
  };
    
});