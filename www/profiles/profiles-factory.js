// angular.module('profile.services', [])

// .factory('ProfileFact', function($resource){
//   var UserProfile = $resource('https://graph.facebook.com/')
//   var fbToken = window.sessionStorage['fbtoken'];

//   var profiles = [];

//   return {
//     all: function() {
//      return profiles;
//     },
//     remove: function(profile) {
//       profiles.splice(profiles.indexOf(profile), 1);
//     },
//     get: function(profileId) {
//       for (var i = 0; i < profiles.length; i++) {
//         if (profiles[i].id === parseInt(profileId)) {
//           return profiles[i];
//         }
//       }
//       return null;
//     },
//     add: function(profile){
//       profiles.push(profile);
//     }
//   };

// })
