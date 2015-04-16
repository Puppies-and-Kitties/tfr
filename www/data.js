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
      for (var i = 0; i < matches.length; i++) {
        if (matches[i].id === parseInt(matchId)) {
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
      if(match.likeCurrentUser){
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


  //Dummy data for now, eventually will be initialized in tab state resolve
  // var candidates = [
  // {
  //     fbid: 10153290310337999,
  //     name: 'Daniel Miller',
  //     face: 'img/faceDaniel.png',
  //     location: { 
  //       host: true,
  //       myPlace: {
  //         rent: 750,
  //         zipCode: null,
  //         genders: 'both',
  //         openRooms: 1,
  //         roomType: 'private',
  //         occupants: 3,
  //         city: 'Berkeley',
  //         state: 'CA',
  //         latitude: 37.867044,
  //         longitude: -122.250559
  //       },
  //       desiredPlace:{
  //         rent: null,
  //         zipCode: null,
  //         radius: null,
  //         roomType: null,
  //         latitude: null,
  //         longitude: null,
  //         city: null,
  //         state: null
  //       }
  //     },
  //     roommatePreferences: {
  //       gender: 'male',
  //       ageMin: 21,
  //       ageMax: 30
  //     },
  //     profile: {
  //       gender: 'male',
  //       age: 27,
  //       keywords: ['peaceful','cake','beer','wine','cheese']
  //     },
  //     liked: ["552eabd2a2d7560782cabdef"]
  // }, {
  //     fbid: 1,
  //     name: 'Dick Rogers',
  //     face: 'img/face1.png',
  //     location: { 
  //       host: true,
  //       myPlace: {
  //         rent: 775,
  //         zipCode: null,
  //         genders: 'both',
  //         openRooms: 1,
  //         roomType: 'private',
  //         occupants: 3,
  //         city: 'Berkeley',
  //         state: 'CA',
  //         latitude: 37.86618078529668,
  //         longitude: -122.25912094116211
  //       },
  //       desiredPlace:{
  //         rent: null,
  //         zipCode: null,
  //         radius: null,
  //         roomType: null,
  //         latitude: null,
  //         longitude: null,
  //         city: null,
  //         state: null
  //       }
  //     },
  //     roommatePreferences: {
  //       gender: 'male',
  //       ageMin: 21,
  //       ageMax: 30
  //     },
  //     profile: {
  //       gender: 'male',
  //       age: 27,
  //       keywords: ['rowdy','beer','cookies','football','cheese whiz']
  //     },
  //     liked: ["552eabd2a2d7560782cabdef"]
  // }, {
  //     fbid: 2,
  //     name: 'Thick McStevens',
  //     face: 'img/face2.png',
  //     location: { 
  //       host: false,
  //       myPlace: {
  //         rent: 750,
  //         zipCode: null,
  //         genders: 'both',
  //         openRooms: 1,
  //         roomType: 'private',
  //         occupants: 3,
  //         city: 'Berkeley',
  //         state: 'CA',
  //         latitude: 37.867044,
  //         longitude: -122.250559
  //       },
  //       desiredPlace:{
  //         rent: 250,
  //         zipCode: null,
  //         radius: 5,
  //         roomType: null,
  //         latitude: 37.867045,
  //         longitude: -122.250560,
  //         city: 'Berkeley',
  //         state: 'CA'
  //       }
  //     },
  //     roommatePreferences: {
  //       gender: 'male',
  //       ageMin: 21,
  //       ageMax: 30
  //     },
  //     profile: {
  //       gender: 'male',
  //       age: 27,
  //       keywords: ['peaceful','cake','beer','wine','cheese']
  //     },
  //     liked: []
  //   }, 

  // }, {
  //     fbid: 3,
  //     name: 'Jim Carrey',
  //     face: 'img/face3.jpeg',
  //     location: { 
  //       host: true,
  //       myPlace: {
  //         rent: 750,
  //         zipCode: null,
  //         genders: 'both',
  //         openRooms: 1,
  //         roomType: 'private',
  //         occupants: 3,
  //         city: 'Berkeley',
  //         state: 'CA',
  //         latitude: 37.867044,
  //         longitude: -122.250559
  //       },
  //       desiredPlace:{
  //         rent: null,
  //         zipCode: null,
  //         radius: null,
  //         roomType: null,
  //         latitude: null,
  //         longitude: null,
  //         city: null,
  //         state: null
  //       }
  //     },
  //     roommatePreferences: {
  //       gender: 'male',
  //       ageMin: 21,
  //       ageMax: 30
  //     },
  //     profile: {
  //       gender: 'male',
  //       age: 27,
  //       keywords: ['Chiller','Smoker','beer','wine','cheese']
  //     },
  //     liked: ["552eabd2a2d7560782cabdef"]
  // }, {
  //     fbid: 4,
  //     name: 'Max Howser',
  //     face: 'img/face5.jpeg',
  //     location: { 
  //       host: true,
  //       myPlace: {
  //         rent: 750,
  //         zipCode: null,
  //         genders: 'both',
  //         openRooms: 1,
  //         roomType: 'private',
  //         occupants: 3,
  //         city: 'Reno',
  //         state: 'NV',
  //         latitude: 39.49556336059472,
  //         longitude: -119.805908203125
  //       },
  //       desiredPlace:{
  //         rent: null,
  //         zipCode: null,
  //         radius: null,
  //         roomType: null,
  //         latitude: null,
  //         longitude: null,
  //         city: null,
  //         state: null
  //       }
  //     },
  //     roommatePreferences: {
  //       gender: 'male',
  //       ageMin: 21,
  //       ageMax: 30
  //     },
  //     profile: {
  //       gender: 'male',
  //       age: 27,
  //       keywords: ['Nuts','Crazy','Wild','Hateful','Bad']
  //     },
  //     liked: ["552eabd2a2d7560782cabdef"]
  // }, {
  //     id: 5,
  //     name: 'Zack Thompson',
  //     face: 'img/face4.jpeg',
  //     location: { 
  //       host: true,
  //       myPlace: {
  //         rent: 750,
  //         zipCode: null,
  //         genders: 'both',
  //         openRooms: 1,
  //         roomType: 'private',
  //         occupants: 3,
  //         city: 'Berkeley',
  //         state: 'CA',
  //         latitude: 37.86509663749013,
  //         longitude: -122.2639274597168
  //       },
  //       desiredPlace:{
  //         rent: null,
  //         zipCode: null,
  //         radius: null,
  //         roomType: null,
  //         latitude: null,
  //         longitude: null,
  //         city: null,
  //         state: null
  //       }
  //     },
  //     roommatePreferences: {
  //       gender: 'male',
  //       ageMin: 21,
  //       ageMax: 30
  //     },
  //     profile: {
  //       gender: 'female',
  //       age: 24,
  //       keywords: ['Books','Dogs','Fitness','Fun','Nature']
  //     },
  //     liked: ["552eabd2a2d7560782cabdef"]
  // }
  // ];
  var candidates;
  // //Possibly too much repetition/redundancy with MatchesFactory
  return {
    initialize: function(req){
      console.log('Candidates All - ', req);
      if (req.data.location.host) {
        return $http({
          method: 'GET',
          url: baseUrl + '/user/' + req.data.fbid + '/' + req.data.location.myPlace.city
        })
        .then(function(res) {
          console.log("candidates that match location ", res)
          candidates = res.data;
        })
      } else {
        return $http({
          method: 'GET',
          url: baseUrl + '/user/' + req.data.fbid + '/' + req.data.location.desiredPlace.city
        })
        .then(function(res) {
          console.log("candidates that match location ", res)
          candidates = res.data;
        })
      }
    },

    all: function() {
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
    
    }
  };

})