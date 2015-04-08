angular.module('matches.controllers', [])

.controller('MatchesCtrl', function($scope, MatchesFactory, User){
  $scope.fbId = User.fbId;
  
  $scope.matches = MatchesFactory.all();
  console.log("0",$scope.matches[0].id);
  console.log("1",$scope.matches[1].id);
  $scope.remove = function(match){
    MatchesFactory.remove(match);
  }
})
