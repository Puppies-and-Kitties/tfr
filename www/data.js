//Can we reuse the initialize functions?
//Can we reuse the all functions?

angular.module('data', [])

.factory('MatchesFactory', function(){

  var matches = [];

  //Possibly too much repetition/redundancy with CandidatesFactory
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

  //Dummy data for now, eventually will be initialized in tab state resolve
  var candidates = [{
      id: 0,
      name: 'Ben Sparrow',
      aboutMeWords: 'Dogs, Night-Owl, Meditator, Coffee',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
      matched: false,
      likeCurrentUser: true,
      email: 'bensparrow@test.com',
      preferences: {
        radius: 7,
        zipCode: 95991,
        lookingForRoommateOnly: false,
        rent: 250,
        gender: 'either'
      }
    }, {
      id: 1,
      name: 'Max Lynx',
      aboutMeWords: 'Fitness, football, work-from-home, house-plants',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
      matched: false,
      likeCurrentUser: true,
      email: 'maxlynx@test.com',
      preferences: {
        radius: 7,
        zipCode: 53011,
        lookingForRoommateOnly: false,
        rent: 400,
        gender: 'male'
      }
    }, {
      id: 2,
      name: 'Andrew Jostlin',
      aboutMeWords: 'Partyer, Christian, often-travelling, cats',
      face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg',
      matched: false,
      likeCurrentUser: true,
      email: 'andrewjostlin@test.com',
      preferences: {
        radius: 7,
        zipCode: 94720,
        lookingForRoommateOnly: false,
        rent: 700,
        gender: 'either'
      }
    }, {
      id: 3,
      name: 'Adam Bradleyson',
      aboutMeWords: 'Beer, barbeques, books, big-screen tv',
      face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
      matched: false,
      likeCurrentUser: true,
      email: 'adambradleyson@test.com',
      preferences: {
        radius: 7,
        zipCode: 53017,
        lookingForRoommateOnly: false,
        rent: 1300,
        gender: 'female'
      }
    }, {
      id: 4,
      name: 'Perry Governor',
      aboutMeWords: 'Recycling, chef, works nights, Coffee',
      face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg',
      matched: false,
      likeCurrentUser: true,
      email: 'perrygovernor@test.com',
      preferences: {
        radius: 7,
        zipCode: 94604,
        lookingForRoommateOnly: false,
        rent: 1000,
        gender: 'male'
      }
    }];

  //Possibly too much repetition/redundancy with MatchesFactory
  return {
    initialize: function(usersCandidates){
      candidates = usersCandidates;
    },
    all: function() {
     return candidates;
    },
    removeFirst: function() {
      candidates.splice(0, 1);
    },
    getFirst: function() {
      return candidates[0];
    },
    add: function(candidate){
      candidates.push(candidate);
    }
  };

})

//Outstanding question: Should be just handle those 'skipped' ('disliked') on 
//the backend?
//Do we need this list on the front end?
//... probably not...
.factory('SkippedFactory', function(){

  var skipped = [];

  return {
    initialize: function(usersSkipped){
      skipped = usersSkipped;
    },
    all: function() {
     return skipped;
    },
    add: function(skip){
      skipped.push(skip);
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
      console.log("in all ")
      return profile;
    },
    update: function(property,newValue) {
      profile.property = newValue;
    },
    getProperty: function(property) {
      return profile.property;
    },
  };

})

.factory('PlaceFactory', function(){

  var preferences = {};

  //How best to remove the redundancy in lines 86-99 and lines 107-120?
  return {
    initialize: function(userPreferences){
      preferences = userPreferences;
    },
    all: function() {
     return preferences;
    },
    update: function(property,newValue) {
      preferences.property = newValue;
    },
    getProperty: function(property) {
      return preferences.property;
    },
  };

});