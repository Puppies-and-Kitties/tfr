angular.module('swipe.controllers', [])

.controller('SwipeController', function($scope, $timeout, CandidatesFactory, 
                                        MatchesFactory, SkippedFactory) {

  $scope.candidates = CandidatesFactory.all();

  $scope.currentCandidate = angular.copy($scope.candidates[0]);

  //I don't like all the side effects here...
  $scope.candidateSwipe =  function (match){

    CandidatesFactory.removeFirst();


    if (match) {
      $scope.currentCandidate.matched = true;
      //Once server is up, this will be a POST request to the server
      MatchesFactory.add($scope.currentCandidate);
    } else {
      //Perhaps we only need to do a PUT request to the server here?
      SkippedFactory.add($scope.currentCandidate);
    }

    $scope.currentCandidate.rated = match;
    $scope.currentCandidate.hide = true;

    $timeout(function(){
      $scope.currentCandidate = angular.copy($scope.candidates[0]);
    }, 300);

  };

})

