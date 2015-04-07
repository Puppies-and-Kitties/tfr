angular.module('profile.services', [])

.factory('ProfileFact', function($resource){
  var UserProfile = $resource('https://graph.facebook.com/')
  var fbToken = window.sessionStorage['fbtoken'];

  var profiles = [
  // {
  //   id: 0,
  //   name: 'Ben Sparrow',
  //   lastText: 'You on your way?',
  //   face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
  //   phone: '530.635.4095',
  //   matched: false
  // }, {
  //   id: 1,
  //   name: 'Max Lynx',
  //   lastText: 'Hey, it\'s me',
  //   face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
  //   phone: '530.635.4095',
  //   matched: true
  // }, {
  //   id: 2,
  //   name: 'Andrew Jostlin',
  //   lastText: 'Did you get the ice cream?',
  //   face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg',
  //   phone: '530.635.4095',
  //   matched: true
  // }, {
  //   id: 3,
  //   name: 'Adam Bradleyson',
  //   lastText: 'I should buy a boat',
  //   face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
  //   phone: '530.635.4095',
  //   matched: false
  // }, {
  //   id: 4,
  //   name: 'Perry Governor',
  //   lastText: 'Look at my mukluks!',
  //   face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg',
  //   phone: '530.635.4095',
  //   matched: false
  // }
  ];

  return {
    all: function() {
     return profiles;
    },
    remove: function(profile) {
      profiles.splice(profiles.indexOf(profile), 1);
    },
    get: function(profileId) {
      for (var i = 0; i < profiles.length; i++) {
        if (profiles[i].id === parseInt(profileId)) {
          return profiles[i];
        }
      }
      return null;
    },
    add: function(profile){
      profiles.push(profile);
    }
  };

})