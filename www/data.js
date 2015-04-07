angular.module('data.services', [])

.factory('MatchFactory', function(){

  var matches = [];

  //How best to remove the redundancy in lines 8-26 and lines 34-52?
  return {
    initialize: function(usersMatches){
      var matches = usersMatches;
    },
    all: function() {
     return matches;
    },
    remove: function(match) {
      matches.splice(matches.indexOf(match), 1);
    },
    get: function(matchId) {
      for (var i = 0; i < matches.length; i++) {
        if (matches[i].id === parseInt(matchId)) {
          return matches[i];
        }
      }
      return null;
    },
    add: function(match){
      matches.push(match);
    }
  };

})

.factory('CandidatesFactory', function(){

  var candidates = [];

   //How best to remove the redundancy in lines 8-26 and lines 34-52?
  return {
    initialize: function(usersCandidates){
      candidates = usersCandidates;
    },
    all: function() {
     return candidates;
    },
    remove: function(candidate) {
      candidates.splice(candidates.indexOf(candidate), 1);
    },
    get: function(candidateId) {
      for (var i = 0; i < candidates.length; i++) {
        if (candidates[i].id === parseInt(candidateId)) {
          return candidates[i];
        }
      }
      return null;
    },
    add: function(candidate){
      candidates.push(candidate);
    }
  };

})

.factory('SkippedFactory', function(){

  var skipped = [];

  return {
    initialize: function(usersSkipped){
      skipped = usersSkipped;
    },
    all: function() {
     return skipped;
    },
    add: function(candidate){
      candidates.push(candidate);
    }
  };

})

.factory('ProfileFactory', function(){

  var profile = {};

   //How best to remove the redundancy in lines 86-99 and lines 107-120?
  return {
    initialize: function(usersProfile){
      profile = usersProfile;
    },
    all: function() {
     return profile;
    },
    update: function(property,newValue) {
      profile.property = newValue;
    },
    get: function(property) {
      return profile.property;
    },
  };

})

.factory('PreferencesFactory', function(){

  var preferences = {};

  //How best to remove the redundancy in lines 86-99 and lines 107-120?
  return {
    initialize: function(usersProfile){
      profile = usersProfile;
    },
    allProperties: function() {
     return profile;
    },
    update: function(property,newValue) {
      profile.property = newValue;
    },
    get: function(property) {
      return profile.property;
    },
  };

});