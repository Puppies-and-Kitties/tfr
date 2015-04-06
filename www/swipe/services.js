angular.module('swipe.services', [])

  .factory('Candidates', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
    var candidates = [{
      id: 0,
      name: 'Ben Sparrow',
      aboutMeWords: 'Dogs, Night-Owl, Meditator, Coffee',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      aboutMeWords: 'Fitness, football, work-from-home, house-plants',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
      id: 2,
      name: 'Andrew Jostlin',
      aboutMeWords: 'Partyer, Christian, often-travelling, cats',
      face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    }, {
      id: 3,
      name: 'Adam Bradleyson',
      aboutMeWords: 'Beer, barbeques, books, big-screen tv',
      face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
      id: 4,
      name: 'Perry Governor',
      aboutMeWords: 'Recycling, chef, works nights, Coffee',
      face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
    }];

    return {
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
      }
    };
  })


  .factory('UpdateMatches', function() {
    
    var o = {
      matches: []
    };

    o.addCandidateToMatches = function(candidate){
      if(!candidate) return false;
      o.matches.unshift(candidate);
    };

    o.removeCandidateFromMatches = function(candidate,index) {
      if(!candidate) return false;
      o.matches.splice(index,1);
    };

    return o;
  });