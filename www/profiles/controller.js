angular.module('profile.controllers', [])

.controller('ProfileCtrl', function($scope, $stateParams, $state, $ionicHistory, User, CandidatesFactory, MatchesFactory, SkippedFactory) {
  $scope.User = User;

  console.log(CandidatesFactory.all());
  $scope.candidates = CandidatesFactory.all();
  $scope.currentCandidate = angular.copy($scope.candidates[0]);

  switch($stateParams.type){
    case 'swipe':
      $scope.profile = CandidatesFactory.getFirst();
      break;
    case 'matches':
      $scope.profile = MatchesFactory.get($stateParams.id);
      break;
    default:
      $scope.profile = User.profile;
      break;
  }

  $scope.myGoBack = function() {
      $ionicHistory.goBack();
  };

  $scope.profile.type = $stateParams.type;
  $scope.profile.matched = true;

  $scope.candidateSwipe =  function (match){
    console.log(match,'ALL',CandidatesFactory.all());
    CandidatesFactory.removeFirst();   
    if (match) {
      //Once server is up, this will be a POST request to the server
      MatchesFactory.add($scope.currentCandidate);
    } else {
      //Perhaps we just need to do a PUT request to the server here?
      SkippedFactory.add($scope.currentCandidate);
    }
    $scope.currentCandidate = angular.copy($scope.candidates[0]);
    console.log('ALL',CandidatesFactory.all(),'FIRST',CandidatesFactory.getFirst());
    $state.go('tab.swipe');

  };
});



