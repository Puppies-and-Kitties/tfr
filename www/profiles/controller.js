angular.module('profile.controllers', [])

.controller('ProfileCtrl', function($scope, $stateParams, $state, $ionicHistory, User, CandidatesFactory, MatchesFactory) {
  $scope.User = User;
  console.log($stateParams);
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

  //Need to tell the profile which sub-template - "edit my profile" 
  //"like or skip" "contact info" - to render within the profile

  $scope.candidateSwipe =  function (match){

    CandidatesFactory.remove();   

    if (match) {
      //Once server is up, this will be a POST request to the server
      MatchesFactory.add($scope.currentCandidate);
    } else {
      //Perhaps we just need to do a PUT request to the server here?
      SkippedFactory.add($scope.currentCandidate);
    }

    $state.go('tab.swipe');

  };
});



