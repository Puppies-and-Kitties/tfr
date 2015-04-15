angular.module('preferences.controllers', [])

.controller('PlaceCtrl', function($scope, $state, User, PlaceFactory, ProfileFactory, userSession){
  $scope.fbId = User.id;
  // $scope.fbId = User.fbid;
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
    console.log('User in place ctrl - ', User);
    PlaceFactory.initialize($scope.location, User);
    $state.go('tab.account');
  }


  $scope.logout=function(){
      userSession.auth.$logout();
  }
});