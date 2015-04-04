angular.module('profile.controllers', [])

.controller('ProfileCtrl', function($scope, $stateParams, ProfileFact, User) {
  $scope.User = User;

  $scope.profile = ProfileFact.get($stateParams.profileId);
})
