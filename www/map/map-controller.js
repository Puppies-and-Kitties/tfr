angular.module('map.controllers', [])

// .controller('MapCtrl', function($scope){
//   var geocoder;
//   var map;
//   function initialize() {
//     geocoder = new google.maps.Geocoder();
//     var latlng = new google.maps.LatLng(-34.397, 150.644);
//     var mapOptions = {
//       zoom: 8,
//       center: latlng
//     }
//     map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//   }

//   function codeAddress() {
//     var address = document.getElementById('address').value;
//     geocoder.geocode( { 'address': address}, function(results, status) {
//       if (status == google.maps.GeocoderStatus.OK) {
//         map.setCenter(results[0].geometry.location);
//         var marker = new google.maps.Marker({
//             map: map,
//             position: results[0].geometry.location
//         });
//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
//   }

//   google.maps.event.addDomListener(window, 'load', initialize);
// })

.controller('MapCtrl', function($scope, $ionicLoading){
  var map, marker, markersArray = [];

  $scope.input = {
    address: null
  };

  $scope.initialize = function() {
    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

    var mapOptions = {
        center: myLatlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    google.maps.event.addListener(map, "click", function(event){
      // place a marker
      placeMarker(event.latLng);
    });

    // Set the maps center to user's current position
    navigator.geolocation.getCurrentPosition(function(pos) {
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    });

    $scope.map = map;
  };

  $scope.codeIt = function(){
    var geocoder = new google.maps.Geocoder();

    var address = $scope.input.address;

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log('OK Status - ', results);
        map.setCenter(results[0].geometry.location);
        placeMarker(results[0].geometry.location);
      } 
      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });

  }

  var placeMarker = function(location) {
    // first remove all markers if there are any
    deleteOverlays();

    var marker = new google.maps.Marker({
        position: location, 
        map: map
    });

    // add marker in markers array
    markersArray.push(marker);
  }

  // Deletes all markers in the array by removing references to them
  var deleteOverlays = function() {
    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
    markersArray.length = 0;
    }
  }

  google.maps.event.addDomListener(window, 'load', $scope.initialize());
})












