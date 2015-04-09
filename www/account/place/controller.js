angular.module('preferences.controllers', [])

.controller('PlaceCtrl', function($scope, $state, User, PlaceFactory, ProfileFactory){
  $scope.fbId = User.id;
  $scope.username = User.first_name;

  // $scope.profile = ProfileFactory.all();
  
  $scope.location ={
    host: null,
    myPlace: {
      rent: 1000,
      zipCode: null,
      genders: null,
      openRooms: null,
      roomType: null,
      occupants: 0,
      zipCode: null
    },
    desiredPlace:{
      rent: 1000,
      zipCode: null,
      radius: 2,
      roomType: null,
    }
  };
  
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
   
    
  }


  $scope.fbLogout = function(arg){
    // Call logout function from openFB
    openFB.logout();
    // redirect to login page 
    $state.go('login')
  };
});