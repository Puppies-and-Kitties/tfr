angular.module('swipe.controllers', [])

.controller('SwipeController', function($scope, $timeout, CandidatesFactory, MatchesFactory) { //Candidates, MatchesFact
  $scope.candidates = CandidatesFactory.all();

  $scope.currentCandidate = angular.copy($scope.candidates[0]);

  $scope.candidateSwipe =  function (match){

    CandidatesFactory.removeFirst();   

    if (match) {
      $scope.currentCandidate.matched = true;

      //Once server is up, this will be a POST request to the server
      MatchesFactory.add($scope.currentCandidate);
    }

    $scope.currentCandidate.rated = match;
    $scope.currentCandidate.hide = true;

    $timeout(function(){
      $scope.currentCandidate = angular.copy($scope.candidates[0]);
    }, 300);

  };

})

