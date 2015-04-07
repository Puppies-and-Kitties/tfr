angular.module('profile.controllers', [])

.controller('ProfileCtrl', function($scope, $stateParams, $state, ProfileFact, User, Candidates, MatchesFact) {
  $scope.User = User;

  $scope.profile = Candidates.get($stateParams.profileId);

  $scope.matched = $scope.profile.matched

  $scope.pass = function(profile){
    console.log(profile)
  }

  // basic match function, example use only
  $scope.like = function(profile){
    profile.matched = true;
    console.log(profile)
    MatchesFact.add(profile);
    $state.go('tab.matches');
  }

})
