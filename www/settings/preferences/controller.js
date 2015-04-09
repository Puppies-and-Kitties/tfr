angular.module('preferences.controllers', [])

.controller('PreferencesCtrl', function($scope, $state, User, PreferencesFactory, ProfileFactory){
  $scope.fbId = User.id;
  $scope.username = User.first_name;

  $scope.profile = ProfileFactory.all();

  $scope.preferences = {
    rent: 1000,
    zipCode: null,
    gender: null
  };


  $scope.savePreferences = function(){
    // Will need to call PreferencesFactory.update and do a PUT/POST request to
    // the server
    console.log('preferences - ', $scope.preferences);
    console.log('profile - ', $scope.profile);
    console.log('User- ', User)
    
    PreferencesFactory.initialize($scope.preferences);
  }


  $scope.fbLogout = function(arg){
    // Call logout function from openFB
    openFB.logout();
    // redirect to login page 
    $state.go('login')
  };
});