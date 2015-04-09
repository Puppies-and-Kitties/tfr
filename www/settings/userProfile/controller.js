angular.module('userProfile.controllers', [])

.controller('UserProfileCtrl', function($scope, $state, User, ProfileFactory){
  $scope.fbId = User.id;
  $scope.username = User.first_name;

  $scope.profile = {
    host: null,
    myPlace: {
      peopleCount: 2,
      genders: null,
      rent: 1000,
      zipCode: null
    },
    gender: User.gender,
    age: null,
    keywords: ['','','','','']
  };
  
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
    console.log('preferences - ', $scope.preferences);
    console.log('profile - ', $scope.profile);
    console.log('User- ', User)
  }


  $scope.fbLogout = function(arg){
    // Call logout function from openFB
    openFB.logout();
    // redirect to login page 
    $state.go('login')
  };
});