angular.module('preferences.controllers', [])

.controller('PlaceCtrl', function($scope, $state, User, PlaceFactory, ProfileFactory, userSession){
  // $scope.fbId = User.id;
  $scope.fbId = User.fbid;
  $scope.username = User.name;
  // $scope.profile = ProfileFactory.all();
  $scope.notHost = {"checked": true}
  
  $scope.location = User.location || PlaceFactory.all();
  console.log("initial location ", $scope.location)

  $scope.toggleHost = function(status, input) {
    console.log("status pre click ", status);
    if(status === null) {
      $scope.location.host = input;
    } else {
      $scope.location.host = null;
    }

  };

  $scope.savePreferences = function(){
    // Will need to call PreferencesFactory.update and do a PUT/POST request to
    // the server

    PlaceFactory.initialize($scope.location, User)
      .then(function(res) {
        console.log("muddafuckin place dataaa ", res)
        User.location = res;
      })
    $state.go('tab.account');
  }


  $scope.logout=function(){
      userSession.auth.$logout();
  }
});