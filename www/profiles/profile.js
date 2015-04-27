angular.module('profile.controllers', [])

.controller('ProfileCtrl', [
  '$scope', 
  '$stateParams', 
  '$state', 
  '$ionicHistory', 
  'User', 
  'CandidatesFactory', 
  'MatchesFactory', 
  'SkippedFactory', 
  'PlaceFactory', 
  'RoommateFactory', 
  'ProfileFactory',

  function($scope, $stateParams, $state, $ionicHistory, User, CandidatesFactory, MatchesFactory, SkippedFactory, PlaceFactory, RoommateFactory, ProfileFactory) {

    $scope.User = User;
    $scope.fbId = User.fbid;

    $scope.candidates = CandidatesFactory.all();
    $scope.currentCandidate = angular.copy($scope.candidates[0]);

    var profileType = $stateParams.type;

    switch(profileType){
      case 'swipe':
        $scope.profile = CandidatesFactory.getFirst();
        break;
      case 'matches':
        console.log('state.params ', $stateParams);
        $scope.profile = MatchesFactory.get($stateParams.id);
        console.log('scope profile in matches profile ', $scope.profile);
        break;
      default:
        profileType = 'user'
        $scope.profile = User;
        break;
    }

    $scope.myGoBack = function() {
        $ionicHistory.goBack();
    };

    if ($scope.profile.profile) {
     $scope.icons = $scope.profile.profile.icons;
    }

    $scope.topBoxType = {'type':profileType+'Top'};
    $scope.bottomBoxType = {'type':profileType+'Bottom'};

    $scope.profile.type = profileType;
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
  
}]);
