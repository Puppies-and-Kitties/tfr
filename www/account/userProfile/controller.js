angular.module('userProfile.controllers', [])

.controller('UserProfileCtrl', function($scope, $state, User, ProfileFactory, IoniconsFact){
  $scope.fbId = User.fbid;
  $scope.username = User.name;

  $scope.profile = User.profile || ProfileFactory.all();
  $scope.profile.icons = [];

  $scope.ionicons = [];

  $scope.toggleHost = function(status, input) {
    if(status === null) {
      $scope.profile.host = input;
    } 
    else {
      $scope.profile.host = null;
    }
  };

  $scope.saveProfile = function(){
    ProfileFactory.initialize($scope.profile, User)
      .then(function(res) {
        console.log("Profile Data in userProfileCtrl saveProfile: ", res);
        User.profile = res;
      })
    $state.go('tab.account');
  };

  $scope.getIonicons = function(word){
    return IoniconsFact.get(word);
  };

  $scope.addToSelected = function(ionicon){
    $scope.profile.selectedIcons.push(ionicon);
  };

  $scope.removeFromSelected = function(ionicon){
    var indexToRemove = $scope.profile.selectedIcons.indexOf(ionicon);
    $scope.profile.selectedIcons.splice(indexToRemove,1);
  };

});
