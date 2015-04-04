angular.module('profile.controllers', [])

.controller('ProfileCtrl', function($scope, $stateParams, ProfileFact) {
  $scope.profile = ProfileFact.get($stateParams.profileId);
})
