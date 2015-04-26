angular.module('data', [])

.factory('MatchesFactory', [
  '$http',

  function($http) {

    var baseUrl = 'http://localhost:8888';
    var liked = [];
    var matches = [];
  
    return {
      initialize: function(req){
        console.log('MatchFactory: user obj sent to initialize ', req.token);
        if(req.matched) {
          return $http({
            method: 'GET',
            url: baseUrl + '/user/' + req._id + '/matches' + '?token=' + req.token
          })
          .then(function(matchedUsers){
            console.log('MatchFactory: initialize: matches returned from db ', matchedUsers.data);
            matches = matchedUsers.data;
          })
        }
      },
      all: function() {
       return matches;
      },
      remove: function(match) {
        matches.splice(matches.indexOf(match), 1);
      },
      get: function(matchId) {
        console.log('matches in matchfact.get ', matches);
        console.log('matchId in matches fact ', matchId);
        for (var i = 0; i < matches.length; i++) {
          if (matches[i]._id === matchId) {
            console.log('matches[i] ', matches[i]);
            return matches[i];
          }
        }
        return null;
      },
      updateChatURL: function(matchId,property,newValue, cb){
        console.log('in update: matchId, property, newValue ', matchId, property, newValue)
        for (var i = 0; i < matches.length; i++) {
          if (matches[i]._id === matchId) {
            matches[i].matched[property] = newValue;
            console.log('Match with new chat url: ', matches[i]);
            cb(matches[i]);
          }
        }
      },

      saveAllMatches: function(User) {
       console.log('saveAllMatches: User', User)
       return $http ({
         method: 'PUT',
         url: baseUrl + '/user/' + User._id + '/matches' + '?token=' + User.token,
         data: {
           matchesIds: User.matched,
           likedIds: User.liked
         }
       })
       .then(function(res) {
         console.log('matches factory: response for saveAllMatches ', res);
         return res.data;
       })
      },

      updateMatchedUsers: function(newMatch) {
        console.log('MatchFact: updateMatchedUser: input: this matched user ', newMatch);
        return $http({
          method: 'Put',
          url: baseUrl + '/user/' + newMatch._id + '/matches',
          data: {
            matchesIds: newMatch.matched,
            likedIds: newMatch.liked
          }
        })
        .then(function(res) {
          console.log('MatchFact: updateMatchedUser: res from db ', res);
          return res.data;
        })
      },

      add: function(match, User, cb){
        var length = match.liked.length;
        var count = 0;
        var userIdString = User._id;
        var matchIdString = match._id;
        var result = [];
        console.log('matchFact: add: stringed user id ', userIdString);
        console.log('matchFact: add: stringed match id ', matchIdString);
        console.log('MatchFact: Add: match name ', match.name);
        console.log('MatchFact: Add: match.liked ', match.liked);
        if (match.liked.indexOf(User._id) >= 0 ) {
          console.log("!!!!!!!!!!!!!!!!!!!!match likes user, should become match !!!!!!!!!!!!!!!!")
          if (!match.matched) {
            match.matched = {};
          }
          if (!User.matched) {
            User.matched = {};
          }
          match.matched[userIdString] = 'isMatch';
          console.log("MatchFact: Add: match.matched after add userid ", match.matched)
          match.liked.splice(match.liked.indexOf(User._id), 1);
          matches.push(match);
          User.matched[matchIdString] = 'isMatch';
          console.log("MatchFact: Add: user.matched after adding match id ", User.matched)
          count ++;
          result.push(User, match);
          console.log('matchFact: add: result ', result);
          cb(result);
        } 
        else {
          console.log("MatchFact: Add: Match didn't like User")
          if (!User.liked.length) {
            User.liked = [];
          }
          User.liked.push(match._id);
          result.push(User, match);
          cb(result);
        }
      }
    }
}])

.factory('SkippedFactory',

  function(){

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

.factory('ProfileFactory', [
  '$http',

  function($http){

    var profile = {
      gender: null,
      age: null,
      keywords: ['','','','','']
    };

    var baseUrl = 'http://localhost:8888';
    return {
      initialize: function(usersProfile, User){
        return $http({
          method: 'PUT',
          url: baseUrl + '/user/' + User._id + '/profile' + '?token=' + User.token,
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
      deleteAccount: function(User) {
        console.log("going to delete account for User: ", User._id)
        return $http({
          method: 'DELETE',
          url: baseUrl + '/user/' + User._id + '?token=' + User.token
        })
        .then(function(res){
          console.log("User deleted: ", res)
        })
      }
    };
}])

.factory('PlaceFactory', [
  '$http',

  function($http){
  
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

    return {
      initialize: function(userLocation, User){
        console.log('UserLocation being passed to server form PlaceFactory initialize - ', userLocation);
        return $http({
          method: 'PUT',
          url: baseUrl + '/user/' + User._id + '/location?token=' + User.token,
          data: {
            location: userLocation
          }
        })
        .then(function(res){
          console.log('place factory res from db ', res)
          location = res.data.location;
          return res.data.location;
        })
      },
      all: function() {
        return location;
      },
      update: function(property,newValue) {
        location[property] = newValue;
      },
      getProperty: function(property) {
        return location[property];
      }
    };

}])

.factory('RoommateFactory', [
  '$http',

  function($http){

    var baseUrl = 'http://localhost:8888'

    var roommatePreferences = {
      gender: null,
      ageMin: null,
      ageMax: null
    };

    return {
      initialize: function(usersProfile, User){
        return $http({
          method: 'PUT',
          url: baseUrl + '/user/' + User._id + '/roommatePreferences' + '?token=' + User.token,
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

}])

.factory('CandidatesFactory', [
  '$http',
  '$rootScope',

  function($http, $rootScope){

    var baseUrl = 'http://localhost:8888'

    var candidates = [];
   
    return {
      initialize: function(req){
        console.log("In CandFact: Initialize")
        if (!req.location) {
          console.log('CandFact: Initialize: not grabbing candidates yet! need to set search prefs');
        } 
        else if (req.location.host) {
          return $http({
            method: 'GET',
            url: baseUrl + '/user/' + req._id + '/' + req.location.myPlace.city
          })
          .then(function(res) {
            console.log('candidates that match location ', res);
            candidates = res.data;
          })
        } 
        else {
          console.log("CandFact: Initialize: User not host ", req)
          var lat = req.location.desiredPlace.latitude;
          var longt = req.location.desiredPlace.longitude;
          var radi = req.location.desiredPlace.radius;
          var token = req.token;
          return $http({
            method: 'GET',
            url: baseUrl + '/user/' + req._id + 
                '/location?lat=' + lat + '&longt=' + longt + '&radi=' + radi + '&token=' + token
          })
          .then(function(res) {
              console.log('candidates that match location ', res.data);
              candidates = res.data;
          })  
        }
      },
      all: function() {
        console.log('Candidates: getting all candidates');
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
    }
}])
