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



.factory('CandidatesFactory', function(){

  //Dummy data for now, eventually will be initialized in tab state resolve
  var candidates = [{
      id: 0,
      name: 'Ben Sparrow',
      aboutMeWords: 'Dogs, Night-Owl, Meditator, Coffee',
      // face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
      face: './img/face1.png',
      icons:['ion-ios-paw','ion-ios-moon', 'ion-aperture', 'ion-coffee'],
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
      // face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
      face: 'img/face2.png',
      icons:['ion-android-bicycle','ion-ios-americanfootball', 'ion-home', 'ion-leaf'],
      matched: false,
      likeCurrentUser: false,
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
      // face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg',
      face: 'img/face3.jpeg',
      icons:['ion-ios-wineglass','ion-android-sunny', 'ion-earth', 'ion-ios-paw'],
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
      // face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
      face: 'img/face4.jpeg',
      icons:['ion-beer','ion-knife', 'ion-ios-book', 'ion-ios-monitor'],
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
      // face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg',
      face: 'img/face5.jpeg',
      icons:['ion-leaf','ion-fork', 'ion-ios-cloudy-night', 'ion-coffee'],
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
    },
    {
      id: 5,
      name: 'Marshawn Lynch',
      aboutMeWords: 'Beast Mode.',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
      matched: false,
      likeCurrentUser: true,
      email: 'bensparrow@test.com',
      preferences: {
        radius: 7,
        zipCode: 94123,
        lookingForRoommateOnly: false,
        rent: 400,
        gender: 'either'
      }
    }, {
      id: 6,
      name: 'Tom Brady',
      aboutMeWords: 'Fitness, football, Model-Wife, Model-Life',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
      matched: false,
      likeCurrentUser: true,
      email: 'maxlynx@test.com',
      preferences: {
        radius: 7,
        zipCode: 95992,
        lookingForRoommateOnly: false,
        rent: 400,
        gender: 'male'
      }
    }, {
      id: 7,
      name: 'Aaron Rodgers',
      aboutMeWords: 'Partyer, GOAT, Cal Bear',
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
      id: 8,
      name: 'Jimmy Dean',
      aboutMeWords: 'Sausages and Breakfast Sandwiches',
      face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
      matched: false,
      likeCurrentUser: false,
      email: 'adambradleyson@test.com',
      preferences: {
        radius: 7,
        zipCode: 94604,
        lookingForRoommateOnly: false,
        rent: 1300,
        gender: 'female'
      }
    }, {
      id: 9,
      name: 'James Dean',
      aboutMeWords: 'Too Young, Too Fast, Rebel, Eden',
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
    },
{
      id: 10,
      name: 'Jeff Goldblum',
      aboutMeWords: 'Independence Day',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
      matched: false,
      likeCurrentUser: true,
      email: 'bensparrow@test.com',
      preferences: {
        radius: 7,
        zipCode: 94123,
        lookingForRoommateOnly: false,
        rent: 250,
        gender: 'either'
      }
    }, {
      id: 11,
      name: 'Demarco Murray',
      aboutMeWords: 'Fitness, football, football, fitness',
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
      id: 12,
      name: 'Mike Johnson',
      aboutMeWords: 'Runner, Chiller',
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
      id: 13,
      name: 'Mike Jackson',
      aboutMeWords: 'Dancer, Singer, Star, Legend',
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
      id: 14,
      name: 'Reginald Cumberbatch',
      aboutMeWords: 'Reginald Cumberbatch',
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
    },
    {
      id: 15,
      name: 'Wellington Jones',
      aboutMeWords: 'Crumpets, Tea, Beef Wellington',
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
      id: 16,
      name: 'Sterling Bates',
      aboutMeWords: 'Spy Movies, Gadgets, Bein Brash',
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
      id: 17,
      name: 'Ricky Pick',
      aboutMeWords: 'Animal-Lover, Farmer',
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
      id: 18,
      name: 'Grant Solomon',
      aboutMeWords: 'Messiah Complex',
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
      id: 19,
      name: 'Dean Ford',
      aboutMeWords: 'Cars, Money',
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