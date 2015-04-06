// Refactoring this out into the profiles folder

angular.module('matchProfile.controllers', [])

.controller('MatchProfileCtrl', function($scope, $stateParams, MatchesFact) {
  $scope.match = MatchesFact.get($stateParams.matchId);
})
