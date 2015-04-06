angular.module('preferences.controllers', [])

.controller('PreferencesCtrl', function($scope, $state, User){
  $scope.fbId = User.id;
  $scope.username = User.first_name;


  $scope.preferences = {
    radius: 7,
    zipCode: null,
    lookingForRoommateOnly: false,
    rent: 1000,
    gender: 'either'
  };
  

  $scope.save = function(){
    // Just prints the currently inputed preferences to the console
    console.log('preferences - ', $scope.preferences);
  }


  $scope.fbLogout = function(arg){
    // Call logout function from openFB
    openFB.logout();
    // redirect to login page 
    $state.go('login')
  };
});