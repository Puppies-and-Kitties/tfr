// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'ngResource',
  'firebase',
  // 'starter.controllers', 
  // 'starter.services', 
  'login.controllers', 
  'login.services', 
  //'matches.services', 
  'matches.controllers',
  //'matchProfile.controllers',
  'profile.controllers',
  'profile.directives',
  //'profile.services',
  'userProfile.controllers',
  'preferences.controllers',
  'people.controllers',
  //'preferences.services',
  'swipe.controllers',
  //'swipe.services',
  'data',
  'map.controllers',
  'map.services',
  'account.controllers',
  'chats.services',
  'chats.controllers',
  'userProfile.services',
  'ionic.contrib.ui.tinderCards'
  ])

.filter('range', function() {
  return function(input, start, end) {    
    start = parseInt(start);
    end = parseInt(end);
    // console.log("range filter start ", start);
    var direction = (start <= end) ? 1 : -1;
    while (start != end) {
        input.push(start);
        start += direction;
    }
    // console.log("range filter input ", input)
    return input;
  };
})

.run(function($ionicPlatform, $rootScope, $state, userSession, CandidatesFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$firebaseSimpleLogin:login', function(event, user) {
       userSession.user = user;
       console.log('success - ', userSession);
       $state.go('tab.account');
   });

   $rootScope.$on('$firebaseSimpleLogin:error', function(event, error) {
        console.log('Error logging user in: ', error);
   });

   $rootScope.$on('$firebaseSimpleLogin:logout', function(event) {
    console.log('logged out')
    $state.go('login');
   });


   $rootScope.$on('userRetrieved', function(event, data){
    console.log('testing testing - ', data);
    CandidatesFactory.initialize(data);
   });

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  // Initializes the openFB library with the appId, which enables oAuth.
  // openFB.init({appId: 1631486397070306})

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    // Sets the User object to the user data firebase returns from fb
    // To access this data, simply inject User into the controller
    resolve: {
      User: function(userSession, LoginFact){
        console.log("userSession",userSession);
        var user = userSession.user.cachedUserProfile;

        return LoginFact.saveUser(user)
          .then(function(data){
            console.log("DATA", data);
            return data.data;
          })
      }
    }
  })
  // User: function(LoginFact){
  //   return LoginFact.getFbInfo()
  //     .then(function(data){
  //       // console.log("data ", data)
  //       // return data
  //       return LoginFact.saveUser(data)
  //         .then(function(data){
  //           console.log("DATA", data)
  //           return data.data;
  //         })
  //     })
  // }
  // Each tab has its own nav history stack:

  .state('tab.swipe', {
    url: '/swipe',
    views: {
      'tab-swipe': {
        templateUrl: 'swipe/view.html',
        controller: 'SwipeController'
      }
    }
  })

  .state('tab.swipe-detail', {
    url: '/:type/profiles/:id',
    views: {
      'tab-swipe': {
        templateUrl: 'profiles/view.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'account/view.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.account-profile', {
    url: '/account/profile',
    views: {
      'tab-account': {
        templateUrl: 'profiles/view.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tab.account-place', {
    url: '/account/place',
    views: {
      'tab-account': {
        templateUrl: 'account/place/view.html',
        controller: 'PlaceCtrl'
      }
    }
  })

  .state('tab.account-people', {
    url: '/account/people',
    views: {
      'tab-account': {
        templateUrl: 'account/people/view.html',
        controller: 'PeopleCtrl'
      }
    }
  })

  .state('tab.account-editProfile', {
    url: '/account/profile/edit',
    views: {
      'tab-account': {
        templateUrl: 'account/userProfile/view.html',
        controller: 'UserProfileCtrl'
      }
    }
  })

  .state('tab.account-map', {
    url: '/account/map',
    views: {
      'tab-account': {
        templateUrl: 'map/map-view.html',
        controller: 'MapCtrl'
      }
    }
  })

  // all matches state view
  .state('tab.matches', {
    url: '/matches',
      views: {
        'tab-matches': {
          templateUrl: 'matches/view.html',
          controller: 'MatchesCtrl'          
        }        
      }
  })
  // Tried using the same pattern as for the swipe/profile, but it was causing a bunch of errors
  .state('tab.matches-detail', {
    url: '/matches/profiles/:type/:id',
    views: {
      'tab-matches': {
        templateUrl: 'profiles/view.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tab.matches-chat', {
    url: '/matches/chat/:matchId',
    views: {
      'tab-matches': {
        templateUrl: 'chats/view.html',
        controller: 'ChatsCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'login/view.html',
    controller: 'LoginCtrl'
  })

  // if none of the above states are matched, redirect to the login tab
  $urlRouterProvider.otherwise('/login');

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

});
