angular.module('userProfile.controllers', [])

.controller('UserProfileCtrl', function($scope, $state, User, ProfileFactory, IoniconsFact){
  $scope.fbId = User.fbid;
  $scope.username = User.name;

  $scope.profile = User.profile || ProfileFactory.all();
  $scope.profile.icons = [];

  $scope.ionicons = [];

  // $scope.mockKeywords = {
  //   keywords: ['Reading', 'Night-Owl', 'Beer', 'Cooking', 'Hiking']
  // };
    
  
  ////////////////////////

  $scope.toggleHost = function(status, input) {
    if(status === null) {
      $scope.profile.host = input;
    } else {
      $scope.profile.host = null;
    }

  }
  ///////////////////////

  $scope.saveProfile = function(){
    // Will need to call PreferencesFactory.update and do a PUT/POST request to
    // the server
    ProfileFactory.initialize($scope.profile, User)
      .then(function(res) {
        console.log("dat der profile data ", res);
        User.profile = res;
      })
    $state.go('tab.account');
   
  }

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