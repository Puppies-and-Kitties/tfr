angular.module('swipe.controllers', [])

.controller('SwipeController', function($scope,$timeout,Candidates,User) {
  $scope.candidates = Candidates.all();

  $scope.currentCandidate = angular.copy($scope.candidates[0]);

  $scope.candidateSwipe =  function (match){

    if (match) {
      User.addCandidateToMatches($scope.currentCandidate);
    }

    $scope.currentCandidate.rated = match;
    $scope.currentCandidate.hide = true;

    $timeout(function(){
      var randomCandidate = Math.round(Math.random() * ($scope.candidates.length-1)) ;
      $scope.currentCandidate = angular.copy($scope.candidates[randomCandidate]);
    },250);

  };
  
})