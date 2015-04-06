angular.module('profile.controllers', [])

.controller('ProfileCtrl', function($scope, $stateParams, ProfileFact, User) {
  $scope.User = User;

  $scope.profile = ProfileFact.get($stateParams.profileId);

  $scope.matched = $scope.profile.matched

  // basic mathc function, example use only
  $scope.like = function(){
    $scope.matched = !$scope.matched;
  }

})
