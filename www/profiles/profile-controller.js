angular.module('profile.controllers', [])

.controller('ProfileCtrl', function($scope, $stateParams, $state, $ionicHistory, User, CandidatesFactory, MatchesFactory, SkippedFactory, PlaceFactory, RoommateFactory, ProfileFactory) {
  $scope.User = User;
  $scope.fbId = User.fbid;

  $scope.candidates = CandidatesFactory.all();
  $scope.currentCandidate = angular.copy($scope.candidates[0]);

  switch($stateParams.type){
    case 'swipe':
      $scope.profile = CandidatesFactory.getFirst();
      break;
    case 'matches':
      console.log('state.params ', $stateParams);
      $scope.profile = MatchesFactory.get($stateParams.id);
      console.log('scope profile in matches profile ', $scope.profile);
      break;
    default:
      $scope.profile = User;
      break;
  }

  $scope.myGoBack = function() {
      $ionicHistory.goBack();
  };

  if ($scope.profile.profile) {
   $scope.keywords = $scope.profile.profile.keywords.join(', ');
  }

  $scope.topBoxType = {'type':$stateParams.type+'Top'};
  $scope.bottomBoxType = {'type':$stateParams.type+'Bottom'};

  $scope.profile.type = $stateParams.type;
  $scope.profile.match = true;

  $scope.candidateSwipe =  function (match){
    console.log('!!!!!');
    CandidatesFactory.removeFirst();   
    if (match) {
      MatchesFactory.add($scope.currentCandidate, $scope.User, function(userMatch){
        console.log('userMatch ', userMatch);
        User = userMatch[0];
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
    $scope.currentCandidate = angular.copy($scope.candidates[0]);
    $state.go('tab.swipe');

  };
  
});
