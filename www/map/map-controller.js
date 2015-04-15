angular.module('map.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, PlaceFactory, $state, User){
  var map, marker, circle, markersArray = [], circlesArray = [];

  $scope.searchLocation = PlaceFactory.all();
  var host = $scope.searchLocation.host;

  $scope.input = {
    address: null,
    radius: 1,
    toggleRadius: true
  };
  $scope.saveLocation = function(){
    var lastIndex = markersArray.length -1
    if(host){
      $scope.searchLocation.desiredPlace.latitude = markersArray[lastIndex].position.k
      $scope.searchLocation.desiredPlace.longitude = markersArray[lastIndex].position.D
      $scope.searchLocation.desiredPlace.radius = parseFloat($scope.input.radius);
    }
    else {
      $scope.searchLocation.desiredPlace.latitude = markersArray[lastIndex].position.k
      $scope.searchLocation.desiredPlace.longitude = markersArray[lastIndex].position.D
      $scope.searchLocation.desiredPlace.radius = parseFloat($scope.input.radius);
    }

    $scope.reverseCodeIt();
    PlaceFactory.initialize($scope.searchLocation, User);

    $state.go('tab.account-place');
  }

  $scope.initialize = function() {
    var myLatlng = new google.maps.LatLng(37.867044, -122.250559);

    var mapOptions = {
        center: myLatlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    google.maps.event.addListener(map, "click", function(event){
      console.log('event - ', event);
      // place a marker
      placeMarker(event.latLng);
      placeCircle(event.latLng);
    });

  };

  $scope.codeIt = function(){
    var geocoder = new google.maps.Geocoder();
    var address = $scope.input.address;

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log('OK Status - ', results);
        map.setCenter(results[0].geometry.location);
        placeMarker(results[0].geometry.location);
        placeCircle(results[0].geometry.location);
      } 
      else {
        alert('Geocode was not successful for the following reason: ', status);
      }
    });
  };

  $scope.reverseCodeIt = function(){
    var geocoder = new google.maps.Geocoder();
    var lastIndex = markersArray.length -1

    var lat = markersArray[lastIndex].position.k;
    var lng = markersArray[lastIndex].position.D;
    var latlng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({'latLng': latlng}, function(results, status){
      if(status === google.maps.GeocoderStatus.OK){
        var city, state;

        results[0].address_components.forEach(function(component){
          if(component.types[0] === "locality"){
            city = component.long_name;
          }
          if(component.types[0] === "administrative_area_level_1"){
            state = component.short_name;
          }
        })
        if(host){
          $scope.searchLocation.myPlace.latitude = lat;
          $scope.searchLocation.myPlace.longitude = lng;
          $scope.searchLocation.myPlace.city = city;
          $scope.searchLocation.myPlace.state = state;          
        }
        else {
          $scope.searchLocation.desiredPlace.latitude = lat;
          $scope.searchLocation.desiredPlace.longitude = lng;
          $scope.searchLocation.desiredPlace.city = city;
          $scope.searchLocation.desiredPlace.state = state;          
        }
      }
      else {
        alert('Geocoder failed due to: ', status);
      }
    })
  };

  $scope.placeCircle = function(){
    deleteCircle();
    placeCircle();
  };

  $scope.toggleRadius = function(){
    if($scope.input.toggleRadius){
      deleteCircle();
      placeCircle();
    }
    else {
      deleteCircle();
    }
  };

  var placeCircle = function(){
    if($scope.input.toggleRadius){
      circle = new google.maps.Circle({
        map: map,
        radius: 1693 * $scope.input.radius,
        fillColor: 'blue',
        strokeColor: 'gold'
      });
      circle.bindTo('center', marker, 'position');
      
      circlesArray.push(circle);
    }
  };

  var placeMarker = function(location) {
    // first remove all markers if there are any
    deleteOverlays();
    deleteCircle();

    marker = new google.maps.Marker({
        position: location, 
        map: map
    });
    // add marker in markers array
    markersArray.push(marker);
  };

  // Deletes all markers in the array by removing references to them
  var deleteOverlays = function() {
    if(markersArray) {
        for(i in markersArray) {
          markersArray[i].setMap(null);
        }
    markersArray.length = 0;
    }
  };

  // Deletes all circles in the array by removing references to them
  var deleteCircle = function(){
    if(circlesArray){
      for(i in circlesArray){
        circlesArray[i].setMap(null);
      }
      circlesArray.length = 0;
    }
  };

  google.maps.event.addDomListener(window, 'load', $scope.initialize());
})







