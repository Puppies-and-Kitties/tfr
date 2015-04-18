angular.module('map.services', [])

.factory('MapFactory', function(){
  var markersArray = [];

  var placeMarker = function(location, map){
    // first remove all markers if there are any
    deleteOverlays();
    // deleteCircle();

    marker = new google.maps.Marker({
        position: location, 
        map: map
    });
    // add marker in markers array
    markersArray.push(marker);
  }


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





  // Converts degrees to radians
  var toRad = function(num){
    return num * Math.PI / 180
  };

  // Basic distance calculator based on two sets of latitude and longitude coordinates
  // Can use this to check whether two users are suitable candidates for one another
  // if the distance between them is less than their combined radii, they're good to go
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
    distanceBetween: distanceBetween,
    placeMarker: placeMarker
  }
})