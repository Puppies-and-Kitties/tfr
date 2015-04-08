//Pre-refactor code

//angular.module('swipe.services', []);

//   .factory('Candidates', function() {
//   // Might use a resource here that returns a JSON array

//   // Some fake testing data
//     var candidates = [];

//     return {
//       all: function() {
//         return candidates;
//       },
//       remove: function(candidate) {
//         candidates.splice(candidates.indexOf(candidate), 1);
//       },
//       get: function(candidateId) {
//         for (var i = 0; i < candidates.length; i++) {
//           if (candidates[i].id === parseInt(candidateId)) {
//             return candidates[i];
//           }
//         }
//         return null;
//       }
//     };
//   })


//   .factory('UpdateMatches', function() {
    
//     var o = {
//       matches: []
//     };

//     o.addCandidateToMatches = function(candidate){
//       if(!candidate) return false;
//       o.matches.unshift(candidate);
//     };

//     o.removeCandidateFromMatches = function(candidate,index) {
//       if(!candidate) return false;
//       o.matches.splice(index,1);
//     };

//     return o;
//   });