angular.module('account.controllers', [])

.controller('AccountCtrl', function($scope, userSession, User, $rootScope, CandidatesFactory){

  $scope.username = User.name;

  $scope.fbId = User.fbid;

  $scope.logout = function(){
    userSession.auth.$unauth();
  };
  
});
