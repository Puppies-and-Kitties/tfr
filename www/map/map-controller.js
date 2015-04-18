angular.module('map.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, PlaceFactory, $state, User, MapFactory){
  var map, marker, circle, markersArray = [], circlesArray = [], lat, lng;

  $scope.searchLocation = User.location || PlaceFactory.all();

  var host = $scope.searchLocation.host;

  $scope.input = MapFactory.input;


  $scope.saveLocation = function(){
    User.location = MapFactory.saveLocation(User);
    console.log("User after saving location ", User);
    $state.go('tab.account-place');
  }

  $scope.initialize = function() {
    MapFactory.initialize($scope.searchLocation);
  };

  $scope.search = function(){
    MapFactory.codeIt($scope.input.address, $scope.input.radius);
  };

  $scope.placeCircle = function(){
    MapFactory.placeCircle($scope.input.radius);
  }

  $scope.toggleRadius = function(){
    MapFactory.toggleRadius($scope.input.toggleRadius);    
  };

  google.maps.event.addDomListener(window, 'load', $scope.initialize());
})







