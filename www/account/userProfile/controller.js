angular.module('userProfile.controllers', [])

.controller('UserProfileCtrl', function($scope, $state, User, ProfileFactory){
  $scope.fbId = User.id;
  $scope.username = User.first_name;

  $scope.profile = ProfileFactory.all();

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
    ProfileFactory.initialize($scope.profile);
    $state.go('tab.account');
    console.log('profile - ', $scope.profile);
   
  }

});