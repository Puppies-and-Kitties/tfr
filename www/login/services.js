angular.module('login.services', [])

.factory('LoginFact', function($resource, $http, $rootScope){

  var UserProfile = $resource('https://graph.facebook.com/me')
  var fbToken = window.sessionStorage['fbtoken'];

  var getFbInfo = function(){
    // Returns a promise with the logged in user's basic FB info, this is resolved in the app.js stateprovider
    return UserProfile.get({access_token: fbToken}).$promise;
  }
  

  var candidate = {
      id: 10153290310337999,
      name: 'Daniel Miller',
      face: 'img/faceDaniel.png',
      location: { 
        host: true,
        myPlace: {
          rent: 750,
          zipCode: null,
          genders: 'both',
          openRooms: 1,
          roomType: 'private',
          occupants: 3,
          city: 'Berkeley',
          state: 'CA',
          latitude: 37.867044,
          longitude: -122.250559
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
      },
      roommatePreferences: {
        gender: 'male',
        ageMin: 21,
        ageMax: 30
      },
      profile: {
        gender: 'male',
        age: 27,
        keywords: ['peaceful','cake','beer','wine','cheese']
      },
      liked: ["552eabd2a2d7560782cabdef"]
    }

  var saveUser = function(user) {
    console.log("in save user")
    var baseUrl = 'http://localhost:8888';
    return $http({
      method: 'POST',
      url: baseUrl + '/user/' + user.id,
      data: {
        name: user.name
      }
    })
    .then(function(data) {
      console.log('data',data);
      $rootScope.$emit('userRetrieved', data);
      return data;
    })
  };


  return {
    saveUser: saveUser,
    getFbInfo: getFbInfo
  };
})

.value('FIREBASE_REF','https://tinderforroomies.firebaseio.com')
.value('userSession',{});
