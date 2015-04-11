angular.module('map.services', [])

.factory('MapFactory', function(){



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

})