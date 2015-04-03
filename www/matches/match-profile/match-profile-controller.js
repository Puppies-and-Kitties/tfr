angular.module('matchProfile.controllers', [])

.controller('MatchProfileCtrl', function($scope, $stateParams, MatchesFact) {
  $scope.match = MatchesFact.get($stateParams.matchId);
})
