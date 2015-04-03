angular.module('matches.controllers', [])

.controller('MatchesCtrl', function($scope, MatchesFact){
  $scope.matches = MatchesFact.all();
  $scope.remove = function(match){
    MatchesFact.remove(match);
  }
})
