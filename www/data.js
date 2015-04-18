//Can we reuse the initialize functions?
//Can we reuse the all functions?

angular.module('data', [])

.factory('MatchesFactory', function(){

  var matches = [];

  //Possibly too much repetition/redundancy with CandidatesFactory
  return {
    initialize: function(usersMatches){
      matches = usersMatches;
    },
    all: function() {
     return matches;
    },
    remove: function(match) {
      matches.splice(matches.indexOf(match), 1);
    },
    get: function(matchId) {
      console.log("matches in matchfact.get ", matches)
      console.log("matchId in matches fact ", matchId)
      for (var i = 0; i < matches.length; i++) {
        if (matches[i].fbid === parseInt(matchId)) {
          return matches[i];
        }
      }
      return null;
    },
    update: function(matchId,property,newValue){
      for (var i = 0; i < matches.length; i++) {
        if (matches[i].id === parseInt(matchId)) {
          matches[i][property] = newValue;
        }
      }
    },
    add: function(match){
      console.log("Match in matchfact add ", match)
      if(match.likedCurrentUser){
        console.log("and match.likecurrentuser")
        matches.push(match);
      }
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
    },
    getFirst: function() {
      return skipped[0];
    } 
  };

})

.factory('ProfileFactory', function($http){

  //???Should we make myPlace a separate object accessed through a separate factory?
  //???Or should we make myPlace properties direct properties of profile?
  //???Current approach means we have to update the whole object to update any myPlace property?
  //???But maybe we would only ever update all properties at once?
  var profile = {
    gender: null,
    age: null,
    keywords: ['','','','','']
  };

  var baseUrl = 'http://localhost:8888';

   //???How best to remove the redundancy in lines 86-99 and lines 107-120?
  return {
    initialize: function(usersProfile, User){
      //console.log("!",usersProfile);
      // profile = usersProfile;
      return $http({
        method: 'PUT',
        url: baseUrl + '/user/' + User.fbid + '/profile',
        data: {
          profile: usersProfile
        }
      })
      .then(function(res) {
        console.log('Profile Factory Data - ', res);
        profile = res.data.profile;
        return res.data.profile;
      })    
    },
    all: function() {
      return profile;
    },
    update: function(property,newValue) {
      profile[property] = newValue;
    },
    getProperty: function(property) {
      return profile[property];
    },
  };

})

.factory('PlaceFactory', function($http){
  
  //???What is the difference between myplace here and myplace in profile factory?
  var location = { 
    host: null,
    myPlace: {
      rent: null,
      zipCode: null,
      genders: null,
      openRooms: null,
      roomType: null,
      occupants: null,
      city: null,
      state: null,
      latitude: null,
      longitude: null
    },
    desiredPlace:{
      rent: null,
      zipCode: null,
      radius: null,
      roomType: null,
      latitude: null,
      longitude: null,
      city: null,
      state: null
    }
  };



  var baseUrl = 'http://localhost:8888'

  //How best to remove the redundancy in lines 86-99 and lines 107-120?
  return {
    initialize: function(userLocation, User){
      // location = userLocation;
      return $http({
        method: 'PUT',
        url: baseUrl + '/user/' + User.fbid + '/location',
        data: {
          location: userLocation
        }
      })
      .then(function(res){
        console.log("place factory res from db ", res)
        location = res.data.location;
        return res.data.location;
      })
    },
    all: function() {
      return location;
      // return $http({
      //   method: 'GET',
      //   url: baseUrl + '/user/' + User.fbid + '/location'
      // })
      // .then(function(data){
      //   console.log('data in placefactory get - ', data);
      //   return data;
      // })
    },
    update: function(property,newValue) {
      location[property] = newValue;
    },
    getProperty: function(property) {
      return location[property];
    },
  };

})

.factory('RoommateFactory', function($http){

  var baseUrl = 'http://localhost:8888'

  var roommatePreferences = {
    gender: null,
    ageMin: null,
    ageMax: null
  };

  //How best to remove the redundancy in lines 86-99 and lines 107-120?
  return {
    initialize: function(preference, User){
      // roommatePreferences = preference;
      return $http({
        method: 'PUT',
        url: baseUrl + '/user/' + User.fbid + '/roommatePreferences',
        data: {
          roommatePreferences: preference
        }
      })
      .then(function(res) {
        console.log('Roommate Factory Data - ', res);
        roommatePreferences = res.data.roommatePreferences;
        return res.data.roommatePreferences;
      })    
    },
    all: function() {
      return roommatePreferences;
    },
    update: function(property,newValue) {
      roommatePreferences[property] = newValue;
    },
    getProperty: function(property) {
      return roommatePreferences[property];
    },
  };

})


// https://Fauth.firebase.com%2Fv2%2Ftinderforroomies%2Fauth%2Ffacebook%2Fcallback
.factory('CandidatesFactory', function($http, $rootScope){

  var baseUrl = 'http://localhost:8888'

  var candidates = [];
  // //Possibly too much repetition/redundancy with MatchesFactory
  return {
    initialize: function(req){
      if (req.data.location.host) {
        return $http({
          method: 'GET',
          url: baseUrl + '/user/' + req.data.fbid + '/' + req.data.location.myPlace.city
        })
        .then(function(res) {
          console.log("candidates that match location ", res)
          candidates = res.data;
          // return candidates;
        })
      } else {
        return $http({
          method: 'GET',
          url: baseUrl + '/user/' + req.data.fbid + '/' + req.data.location.desiredPlace.city
        })
        .then(function(res) {
          console.log("candidates that match location ", res)
          candidates = res.data;
          // return candidates;
        })
      }
    },

    all: function() {
      console.log("calling from test")
      return candidates;
    },


      // console.log('You called candidate factory\'s all method');
     // return candidates
    removeFirst: function() {
      candidates.splice(0, 1);
    },
    getFirst: function() {
      return candidates[0];
    },
    add: function(candidate){
      candidates.push(candidate);
    },
    mock: function(){
      // candidates.forEach(function(candidate){
        // console.log('mock candidate being sent to server ', candidate)
        return $http({
          method: 'PUT',
          url: baseUrl + '/user/' + candidates[1].id,
          data: {
            candidate: candidates[1],
          }
        })
        .then(function(res){
          console.log("place factory res from db ", res)
          return res.data.location;
        })
    },
    candidates: candidates
  };

})

  // Dummy Data all moved to tests/data/CandidatesFactory.tests.js