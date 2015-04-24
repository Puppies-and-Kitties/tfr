angular.module('swipe.controllers', [])

.controller('SwipeController', function($scope, $timeout, CandidatesFactory, MatchesFactory, SkippedFactory, User) {

  $scope.candidates = CandidatesFactory.all();
  console.log("swipectrl: candidates ", $scope.candidates)
  $scope.user = User

  $scope.currentCandidate = angular.copy($scope.candidates[0]);
  console.log("currentCandidate in swipe controller ", $scope.currentCandidate)

  $scope.$watch(
    function () { 
      return CandidatesFactory.getFirst();
    }, 
    function (firstCandidate) {
      $scope.currentCandidate = firstCandidate;
    }
  );

  $scope.candidateSwipe =  function (match, User){
    // console.log('candidateSwipe',match);
    if (match) {
      // $scope.currentCandidate.match = true;
      //Once server is up, this will be a POST request to the server
      MatchesFactory.add($scope.currentCandidate, $scope.user, function(userMatch){
        console.log("userMatch ", userMatch)
        User = userMatch[0];
        var candidate = userMatch[1];
        MatchesFactory.saveAllMatches(User)
          .then(function(res){
            console.log("SwipeCtrl: res: current user res from saveAllMatches", res);
            $scope.user = User = res;
          });
        MatchesFactory.updateMatchedUsers(candidate)
          .then(function(res) {
            console.log("SwipeCtrl: res: last candidate from updateMatchedUsers ", res)
            // $scope.currentCandidate = res.data;
          })
      });
    } else {
      //Perhaps we only need to do a PUT request to the server here?
      SkippedFactory.add($scope.currentCandidate);
    }

    $scope.currentCandidate.hide = true;
    CandidatesFactory.removeFirst();
    $scope.candidates = CandidatesFactory.all();
    $scope.currentCandidate = angular.copy($scope.candidates[0]);
    // console.log("scope.currentCandidate ", $scope.currentCandidate)

  };

  //I don't like all the side effects here...
  // $scope.candidateSwipe =  function (match){

    

  //   if (match) {
  //     $scope.currentCandidate.match = true;
  //     //Once server is up, this will be a POST request to the server
  //     MatchesFactory.add($scope.currentCandidate);
  //   } else {
  //     //Perhaps we only need to do a PUT request to the server here?
  //     SkippedFactory.add($scope.currentCandidate);
  //   }

  //   $scope.currentCandidate.rated = match;
  //   $scope.currentCandidate.hide = true;

  //   $timeout(function(){
  //     // console.log("!!!!");
  //     CandidatesFactory.removeFirst();
  //     //$scope.currentCandidate = angular.copy($scope.candidates[0]);     
  //   }, 250);

  // };

})

