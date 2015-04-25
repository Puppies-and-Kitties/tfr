angular.module('map.services', [])

.factory('MapFactory', function($state, PlaceFactory){
  var markersArray = [], circlesArray = [], map, searchLocation;

  var input =  {
    address: null,
    radius: 1,
    toggleRadius: false
  };

  var initialize = function(loc){
    // set the current searchLocation to the users current location
    // does so on the gloabl scope for this factory since searchLocation is declared up top
    searchLocation = loc;

    // set's latitutde and longitude to Berkeley, Ca
    var lat = 37.867044;
    var lng = -122.250559;

    // if the user is a host and has saved his location, the map centers on that location
    if(loc.host && loc.myPlace.latitude !== null){
      input.toggleRadius = false;
      lat = loc.myPlace.latitude;
      lng = loc.myPlace.longitude;
    }
    // if the user is not a host and has saved his search location, the map centers on that location
    else if(!loc.host && loc.desiredPlace.latitude !== null){
      lat = loc.desiredPlace.latitude;
      lng = loc.desiredPlace.longitude;
    }

    // creates a google-readable latitude and longitude object
    myLatlng = new google.maps.LatLng(lat, lng);

    // sets the options to be passed along to the google maps api
    var mapOptions = {
        center: myLatlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // creates a google map based on the passed in options
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // if no location has been set for the user, center the map on their current location
      // if they don't avail their location, the map will center on Berkeley
    if(!loc.host && loc.desiredPlace.latitude === null || loc.host && loc.myPlace.latitude === null){
      navigator.geolocation.getCurrentPosition(function(pos) {
        myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        map.setCenter(myLatlng);
        placeMarker(myLatlng);
      });
    }

    // place a marker on the map center
    placeMarker(myLatlng);

    // listen for any user clicks
    google.maps.event.addListener(map, "click", function(event){
      // if the map is clicked, set a new marker there and delete the previous marker
      placeMarker(event.latLng);
    });
  };


  var saveLocation = function(User){

    // declare a new google maps geocoder
    var geocoder = new google.maps.Geocoder();

    // get the index of the most recenty placed marker, also the only visible marker
    var lastIndex = markersArray.length - 1;

    // set the latitude and longitude based on the most recently placed marker
    var lat = markersArray[lastIndex].position.k;
    var lng = markersArray[lastIndex].position.D;

    // creates a google-readable latitude and longitude object
    var latlng = new google.maps.LatLng(lat, lng);

    // the geocoder takes a latitude and longitude object and returns an object with human readable location data
    geocoder.geocode({'latLng': latlng}, function(results, status){
      if(status === google.maps.GeocoderStatus.OK){
        var city, state;

        // the locality value of the location data is equivalent to a city 
        // --> San Francisco, CA --> locality = San Francisco
        results[0].address_components.forEach(function(component){
          if(component.types[0] === "locality"){
            city = component.long_name;
          }
          // the administrative_area_level_1 value of the location data is equivalent to a State in the United States 
          // --> San Francisco, CA --> administrative_area_level_1 = San Francisco
          if(component.types[0] === "administrative_area_level_1"){
            state = component.short_name;
          }
        })

        // if the user is a host, set the new search location data to their 'myPlace' object
        if(searchLocation.host){
          searchLocation.myPlace.latitude = lat;
          searchLocation.myPlace.longitude = lng;
          searchLocation.myPlace.city = city;
          searchLocation.myPlace.state = state;
        }

        // if the user is not a host, set the new search location data to their 'desiredPlace' object
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

    return searchLocation;
  };

  // This is used by the search bar to find the latitude and longitude of the search string
  // address argument is the search string
  var codeIt = function(address, radius){
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log('OK Status - ', results);

        // if the location is found
          // center the map on the new location
        map.setCenter(results[0].geometry.location);

        // place a amrker on the new location
        placeMarker(results[0].geometry.location);

        // if they are not a host
          // place a search radius on the new location
        placeCircle(radius);
      } 
      else {
        alert('Geocode was not successful for the following reason: ', status);
      }
    });
  };


  var placeMarker = function(location){
    // first remove all markers and search radii if there are any
    deleteMarker();
    deleteCircle();

    // create a new google maps marker object
    marker = new google.maps.Marker({
        position: location, 
        map: map
    });

    // add the reference to the marker object into markers array
    markersArray.push(marker);

    if(input.toggleRadius){
      placeCircle(input.radius)
    }
  };

  var placeCircle = function(radius){
    deleteCircle();

    radius = radius || 0;

      circle = new google.maps.Circle({
        map: map,
        radius: 1693 * radius,
        fillColor: 'blue',
        strokeColor: 'gold'
      });
      circle.bindTo('center', marker, 'position');
      
      circlesArray.push(circle);
  };

  // sets all markers in the array to null
  var deleteMarker = function() {
    if(markersArray) {
        for(i in markersArray) {
          markersArray[i].setMap(null);
        }
    markersArray.length = 0;
    }
  };

  // sets all circles in the array to null
  var deleteCircle = function(){
    if(circlesArray){
      for(i in circlesArray){
        circlesArray[i].setMap(null);
      }
      circlesArray.length = 0;
    }
  };

  // toggles the search radius
  var toggleRadius = function(radius, toggled){
    // if toggle radius is being set to true, delete the old circle and place the new circle with the passed in radius
    if(toggled){
      deleteCircle();
      placeCircle(radius);
    }
    // otherwise, just delete the circle
    else {
      deleteCircle();
    }
  };


  return {
    initialize: initialize,
    placeCircle: placeCircle,
    toggleRadius: toggleRadius,
    codeIt: codeIt,
    input: input,
    saveLocation: saveLocation
  };

})
