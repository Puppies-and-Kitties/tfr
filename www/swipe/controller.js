angular.module('swipe.controllers', [])

.controller('SwipeController', function($scope, $timeout, Candidates, UpdateMatches, MatchesFact) {
  $scope.candidates = Candidates.all();

  $scope.currentCandidate = angular.copy($scope.candidates[0]);

  $scope.candidateSwipe =  function (match){

    if (match) {
      UpdateMatches.addCandidateToMatches($scope.currentCandidate);
      
      $scope.currentCandidate.matched = true;
      MatchesFact.add($scope.currentCandidate);
    }

    $scope.currentCandidate.rated = match;
    $scope.currentCandidate.hide = true;

    $timeout(function(){
      var randomCandidate = Math.round(Math.random() * ($scope.candidates.length-1)) ;
      $scope.currentCandidate = angular.copy($scope.candidates[randomCandidate]);
    }, 250);

  };

})