angular.module('map.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, PlaceFactory, $state, User, MapFactory){
  var map, marker, circle, markersArray = [], circlesArray = [], lat, lng;

  $scope.searchLocation = User.location || PlaceFactory.all();
  var host = $scope.searchLocation.host;
  
  if(host && $scope.searchLocation.myPlace.latitude !== null){
    lat = $scope.searchLocation.myPlace.latitude;
    lng = $scope.searchLocation.myPlace.longitude;
  }
  if(!host && $scope.searchLocation.desiredPlace.latitude !== null){
    lat = $scope.searchLocation.desiredPlace.latitude;
    lng = $scope.searchLocation.desiredPlace.longitude;
  }

  $scope.input = {
    address: null,
    radius: 1,
    toggleRadius: true
  };

  $scope.saveLocation = function(){
    var lastIndex = markersArray.length -1
    if(host){
      $scope.searchLocation.myPlace.latitude = markersArray[lastIndex].position.k
      $scope.searchLocation.myPlace.longitude = markersArray[lastIndex].position.D
      $scope.searchLocation.myPlace.radius = parseFloat($scope.input.radius);
    }
    else {
      $scope.searchLocation.desiredPlace.latitude = markersArray[lastIndex].position.k
      $scope.searchLocation.desiredPlace.longitude = markersArray[lastIndex].position.D
      $scope.searchLocation.desiredPlace.radius = parseFloat($scope.input.radius);
    }

    $scope.reverseCodeIt();

    PlaceFactory.initialize($scope.searchLocation, User)
      .then(function(res) {
        console.log("response from db in MAPCONTROLLER ", res)
      })

    $state.go('tab.account-place');
  }

  $scope.initialize = function() {
    var myLatlng;

    myLatlng = new google.maps.LatLng(37.867044, -122.250559);

    var mapOptions = {
        center: myLatlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // if location already saved, place a marker and center the map on those coordinates
    if(host && $scope.searchLocation.myPlace.latitude !== null){
      myLatlng = new google.maps.LatLng(lat, lng);
      map.setCenter(myLatlng);
      MapFactory.placeMarker(myLatlng, map);
      // placeCircle(0);
    }

    if(!host && $scope.searchLocation.desiredPlace.latitude !== null){
      myLatlng = new google.maps.LatLng(lat, lng);
      map.setCenter(myLatlng);    
      MapFactory.placeMarker(myLatlng, map);
      // placeCircle($scope.searchLocation.desiredPlace.radius);
    }
    

    google.maps.event.addListener(map, "click", function(event){
      console.log('event - ', event);
      // place a marker
      MapFactory.placeMarker(event.latLng, map);
      // placeCircle();
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

  var placeCircle = function(radius){
    radius = radius || $scope.input.radius;

    if($scope.input.toggleRadius){
      circle = new google.maps.Circle({
        map: map,
        radius: 1693 * radius,
        fillColor: 'blue',
        strokeColor: 'gold'
      });
      circle.bindTo('center', marker, 'position');
      
      circlesArray.push(circle);
    }
  };

  google.maps.event.addDomListener(window, 'load', $scope.initialize());
})







