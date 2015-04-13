angular.module('preferences.controllers', [])

.controller('PlaceCtrl', function($scope, $state, User, PlaceFactory, ProfileFactory){
  $scope.fbId = User.id;
  $scope.username = User.first_name;

  // $scope.profile = ProfileFactory.all();
  $scope.notHost = {"checked": true}
  
  $scope.location = PlaceFactory.all();

  $scope.toggleHost = function(status, input) {
    if(status === null) {
      $scope.location.host = input;
    } else {
      $scope.location.host = null;
    }

  };

  $scope.savePreferences = function(){
    // Will need to call PreferencesFactory.update and do a PUT/POST request to
    // the server
    console.log('location - ', $scope.location);
    PlaceFactory.initialize($scope.location);
    $state.go('tab.account');
  }


  $scope.fbLogout = function(arg){
    // Call logout function from openFB
    openFB.logout();
    // redirect to login page 
    $state.go('login')
  };
});