angular.module('matches.controllers', [])

.controller('MatchesCtrl', function($scope, MatchesFactory, User, CandidatesFactory){
  $scope.fbId = User.fbId;
  
  $scope.matches = MatchesFactory.all();
  console.log("MATCHES: ", $scope.matches);
  
  $scope.remove = function(match){
    MatchesFactory.remove(match);
  }
})
