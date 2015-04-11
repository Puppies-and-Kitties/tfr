angular.module('map.services', [])

.factory('MapFactory', function(){

  var markersArray = [];
  var circlesArray = [];
  var marker, map, circle

  var searchLocation = {
    latitude: null,
    longitude: null
  }

  var input = {
    address: null,
    radius: 1
  };

  var saveLocation = function(){
    var lastIndex = markersArray.length -1

    searchLocation.latitude = markersArray[lastIndex].position.k
    searchLocation.longitude = markersArray[lastIndex].position.D
    console.log('Search Epicenter - ', searchLocation);

    deleteCircle();
    circle = new google.maps.Circle({
      map: map,
      radius: 1693 * input.radius,    // 10 miles in metres
      fillColor: 'blue',
      strokeColor: 'gold'
    });
    circle.bindTo('center', marker, 'position');
    circlesArray.push(circle);
  }

  var initialize = function(){
    var mapOptions = {
        // center: myLatlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Put Google all over Australia
    map.data.loadGeoJson('https://storage.googleapis.com/maps-devrel/google.json');
    map.data.setStyle({fillColor: 'purple', strokeColor: 'yellow'})

    google.maps.event.addListener(map, "click", function(event){
      // place a marker
      placeMarker(event.latLng);

      // event.latLng.k --> latitude
      searchLocation.latitude = event.latLng.k
      console.log('latitude - ', event.latLng.k);
      // event.latLng.D --> longitude
      searchLocation.longitude = event.latLng.D
      console.log('longitude - ', event.latLng.D);

    });

    // Set the maps center to user's current position
    navigator.geolocation.getCurrentPosition(function(pos) {
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    });
  }

  var placeMarker = function(location) {
    // first remove all markers if there are any
    deleteMarker();
    deleteCircle()

    var marker = new google.maps.Marker({
        position: location, 
        map: map
    });

    // add marker in markers array
    markersArray.push(marker);
  }

  var geoCodeIt = function(address){
    var geocoder = new google.maps.Geocoder();
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

  // Deletes all markers in the array by removing references to them
  var deleteMarker = function() {
    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
    markersArray.length = 0;
    }
  }

  var deleteCircle = function(){
    if(circlesArray){
      for(i in circlesArray){
        circlesArray[i].setMap(null);
      }
      circlesArray.length = 0;
    }
  }

  // Converts degrees to radians
  var toRad = function(num){
    return num * Math.PI / 180
  };

  // Basic distance calculator based on two sets of latitude and longitude coordinates
  var distanceBetween = function(lat1, lon1, lat2, lon2){
    var R = 3958
    var φ1 = toRad(lat1);
    var φ2 = toRad(lat2);
    var Δλ = toRad((lon2-lon1));
    var x = Δλ * Math.cos((φ1+φ2)/2);
    var y = (φ2-φ1);

    return Math.sqrt(x*x + y*y) * R;
  };

  return {
    placeMarker: placeMarker,
    deleteMarker: deleteMarker,
    deleteCircle: deleteCircle,
    distanceBetween: distanceBetween,
    saveLocation: saveLocation,
    searchLocation: searchLocation,
    geoCodeIt: geoCodeIt,
    initialize: initialize
  }
})