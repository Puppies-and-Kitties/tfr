angular.module('map.services', [])

.factory('MapFactory', function($state, PlaceFactory){
  var markersArray = [], circlesArray = [], map, searchLocation;

  var input =  {
    address: null,
    radius: 1,
    toggleRadius: false
  };

  var initialize = function(loc){
    searchLocation = loc;

    var lat = 37.867044;
    var lng = -122.250559;

    if(loc.host && loc.myPlace.latitude !== null){
      input.toggleRadius = false;
      lat = loc.myPlace.latitude;
      lng = loc.myPlace.longitude;
    }
    else if(!loc.host && loc.desiredPlace.latitude !== null){
      lat = loc.desiredPlace.latitude;
      lng = loc.desiredPlace.longitude;
    }

    myLatlng = new google.maps.LatLng(lat, lng);

    var mapOptions = {
        center: myLatlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    placeMarker(myLatlng);

    google.maps.event.addListener(map, "click", function(event){
      console.log('event - ', event);
      // place a marker
      placeMarker(event.latLng);
    });
  };


  var saveLocation = function(User){
    var lastIndex = markersArray.length -1;

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

        if(searchLocation.host){
          searchLocation.myPlace.latitude = lat;
          searchLocation.myPlace.longitude = lng;
          searchLocation.myPlace.city = city;
          searchLocation.myPlace.state = state;
        }
        else {
          searchLocation.desiredPlace.latitude = lat;
          searchLocation.desiredPlace.longitude = lng;
          searchLocation.desiredPlace.radius = parseFloat(input.radius);
          searchLocation.desiredPlace.city = city;
          searchLocation.desiredPlace.state = state;
        }
      }
      else {
        alert('Geocoder failed due to: ', status);
      }
    });
    console.log('about to init place factory location with - ', searchLocation);

    // PlaceFactory.initialize(searchLocation, User)
      // .then(function(res) {
        // console.log("response from db in MAPCONTROLLER ", res)
      // })
    return searchLocation;

    // $state.go('tab.account-place');
  };

  var codeIt = function(address, radius){
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log('OK Status - ', results);
        map.setCenter(results[0].geometry.location);
        placeMarker(results[0].geometry.location);
        placeCircle(radius);
      } 
      else {
        alert('Geocode was not successful for the following reason: ', status);
      }
    });
  }


  var placeMarker = function(location){
    // first remove all markers if there are any
    deleteMarker();
    deleteCircle();

    marker = new google.maps.Marker({
        position: location, 
        map: map
    });
    // add marker in markers array
    markersArray.push(marker);

    if(input.toggleRadius){
      placeCircle(input.radius)
    }
  }

  var placeCircle = function(radius){
    deleteCircle();

    radius = radius || 0;

    // if($scope.input.toggleRadius){
      circle = new google.maps.Circle({
        map: map,
        radius: 1693 * radius,
        fillColor: 'blue',
        strokeColor: 'gold'
      });
      circle.bindTo('center', marker, 'position');
      
      circlesArray.push(circle);
    // }
  };

  // Deletes all markers in the array by removing references to them
  var deleteMarker = function() {
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

  var toggleRadius = function(radius){
    if(radius){
      deleteCircle();
      placeCircle(radius);
    }
    else {
      deleteCircle();
    }
  }


  return {
    initialize: initialize,
    placeCircle: placeCircle,
    toggleRadius: toggleRadius,
    codeIt: codeIt,
    input: input,
    saveLocation: saveLocation
  }
})