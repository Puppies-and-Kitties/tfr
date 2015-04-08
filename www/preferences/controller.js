angular.module('preferences.controllers', [])

.controller('PreferencesCtrl', function($scope, $state, User){
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
    gender: null,
    age: null,
    keywords: ['','','','','']
  };
  $scope.preferences = {
    minRent: 500,
    maxRent: 2000
  };
  // $scope.mockKeywords = {
  //   keywords: ['Reading', 'Night-Owl', 'Beer', 'Cooking', 'Hiking']
  // };
    
  
  ////////////////////////
  $scope.firstChoice = null;

  $scope.toggleHost = function(status, input) {
    if(status === null) {
      $scope.profile.host = input;
    } else {
      $scope.profile.host = null;
    }

  }
  ///////////////////////

  $scope.save = function(){
    // Will need to call PreferencesFactory.update and do a PUT/POST request to
    // the server
    console.log('preferences - ', $scope.preferences);
    console.log('profile - ', $scope.profile);
  }


  $scope.fbLogout = function(arg){
    // Call logout function from openFB
    openFB.logout();
    // redirect to login page 
    $state.go('login')
  };
});