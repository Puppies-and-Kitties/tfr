angular.module('map.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, PlaceFactory, $state, User, MapFactory){

  // set the searchLocation to the User.location if it's already been retrieved, otherwise, get it from the database
  $scope.searchLocation = User.location || PlaceFactory.all();

  $scope.input = MapFactory.input;

  // Save the user's location settings to the database and redirect to the account-place view
  $scope.saveLocation = function(){
    User.location = MapFactory.saveLocation(User);
    console.log("User after saving location ", User);
    $state.go('tab.account-place');
  }

  // Initializes the map, centering it on the user's search location
    // if the user has yet to set a search location, it defaults to Delta Upsilon, Berkeley, Ca
  $scope.initialize = function() {
    MapFactory.initialize($scope.searchLocation);
  };

  // Calls the geocode function on the user's search string
  $scope.search = function(){
    MapFactory.codeIt($scope.input.address, $scope.input.radius);
  };

  // places a search radius cenetered on the currently placed marker
  $scope.placeCircle = function(toggled){
    // check to make sure the radius option is toggled to true
    if(toggled){
      MapFactory.placeCircle($scope.input.radius);
    }
  }

  // hides/shows the search radius
  $scope.toggleRadius = function(){
    MapFactory.toggleRadius($scope.input.radius, $scope.input.toggleRadius);    
  };

  // invokes the initialize function once the window has loaded
  google.maps.event.addDomListener(window, 'load', $scope.initialize());
})







