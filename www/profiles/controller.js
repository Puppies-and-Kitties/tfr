angular.module('profile.controllers', [])

.controller('ProfileCtrl', function($scope, $stateParams, $state, $ionicHistory, User, CandidatesFactory, MatchesFactory, SkippedFactory, PlaceFactory, RoommateFactory, ProfileFactory) {
  $scope.User = User;
  $scope.fbId = User.fbid;

  //console.log(CandidatesFactory.all());
  $scope.candidates = CandidatesFactory.all();
  $scope.currentCandidate = angular.copy($scope.candidates[0]);

  switch($stateParams.type){
    case 'swipe':
      $scope.profile = CandidatesFactory.getFirst();
      break;
    case 'matches':
      console.log("state.params ", $stateParams);
      $scope.profile = MatchesFactory.get($stateParams.id);
      console.log('scope profile in matches profile ', $scope.profile)
      break;
    default:
      $scope.profile = User;
      // $scope.profile.location = PlaceFactory.all();
      // $scope.profile.people = RoommateFactory.all();
      // $scope.profile.userInfo = ProfileFactory.all();
      break;
  }
  // get stored location info
  // ??? is this being used anymore? (Daniel: Apr 12)
  $scope.myGoBack = function() {
      $ionicHistory.goBack();
  };
  
  $scope.keywords = $scope.profile.profile.keywords.join(", ");
  $scope.profile.type = $stateParams.type;
  $scope.profile.match = true;

  $scope.candidateSwipe =  function (match){
    //console.log(match,'ALL',CandidatesFactory.all());
    CandidatesFactory.removeFirst();   
    if (match) {
      //Once server is up, this will be a POST request to the server
      MatchesFactory.add($scope.currentCandidate);
    } else {
      //Perhaps we just need to do a PUT request to the server here?
      SkippedFactory.add($scope.currentCandidate);
    }
    $scope.currentCandidate = angular.copy($scope.candidates[0]);
    //console.log('ALL',CandidatesFactory.all(),'FIRST',CandidatesFactory.getFirst());
    $state.go('tab.swipe');

  };
});



