angular.module('swipe.controllers', [])

.controller('SwipeController', [
  '$scope', 
  '$timeout', 
  'CandidatesFactory', 
  'MatchesFactory', 
  'SkippedFactory', 
  'User',

  function($scope, $timeout, CandidatesFactory, MatchesFactory, SkippedFactory, User) {

    $scope.candidates = CandidatesFactory.all();
    console.log('swipectrl: candidates ', $scope.candidates);
    $scope.user = User;

    $scope.currentCandidate = angular.copy($scope.candidates[0]);
    console.log('currentCandidate in swipe controller ', $scope.currentCandidate);

    $scope.$watch(
      function () { 
        return CandidatesFactory.getFirst();
      }, 
      function (firstCandidate) {
        $scope.currentCandidate = firstCandidate;
      }
    );

    $scope.candidateSwipe =  function (match, User){
      console.log("Ctrl: candidateSwipe ", $scope.currentCandidate)
      if (match) {
        MatchesFactory.add($scope.currentCandidate, $scope.user, function(userMatch){
          console.log('MatchCtrl: Res from Matcfact.Add: userMatch ', userMatch);
          $scope.user = User = userMatch[0];
          var candidate = userMatch[1];

          MatchesFactory.saveAllMatches(User)
            .then(function(res){
              console.log('SwipeCtrl: res: current user res from saveAllMatches', res);
              $scope.user = User = res;
            });
          MatchesFactory.updateMatchedUsers(candidate)
            .then(function(res) {
              console.log('SwipeCtrl: res: last candidate from updateMatchedUsers ', res);
            })
        });
      } 
      else {
        SkippedFactory.add($scope.currentCandidate);
      }

      $scope.currentCandidate.hide = true;
      CandidatesFactory.removeFirst();
      $scope.candidates = CandidatesFactory.all();
      $scope.currentCandidate = angular.copy($scope.candidates[0]);
      console.log("new candidate ", $scope.currentCandidate)
    };

}]);
