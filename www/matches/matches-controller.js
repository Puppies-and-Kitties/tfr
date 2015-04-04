angular.module('matches.controllers', [])

.controller('MatchesCtrl', function($scope, MatchesFact, User){
  $scope.fbId = User.fbId;
  
  $scope.matches = MatchesFact.all();
  $scope.remove = function(match){
    MatchesFact.remove(match);
  }
})
