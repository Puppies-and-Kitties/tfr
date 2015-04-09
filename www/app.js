// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'ngResource',
  'starter.controllers', 
  'starter.services', 
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
  'data'
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

.run(function($ionicPlatform) {
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
})

.config(function($stateProvider, $urlRouterProvider) {
  // Initializes the openFB library with the appId, which enables oAuth.
  openFB.init({appId: 1631486397070306})

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
    // Sets the User object to the user data fb returns
    // To access this data, simply inject User into the controller
    resolve: {
      User: function(LoginFact){
        return LoginFact.getFbInfo()
          .then(function(data){
            return data
          });
      }
    }
  })

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




  // .state('tab.settings-profile', {
  //   url: '/settings/userProfile',
  //   views: {
  //     'tab-preferences': {
  //       templateUrl: 'settings/userProfile/view.html',
  //       controller: 'UserProfileCtrl'
  //     }
  //   }
  // })

  // .state('tab.settings-preferences', {
  //   url: '/settings/preferences',
  //   views: {
  //     'tab-preferences': {
  //       //templateUrl: 'preferences/view.html',
  //       templateUrl: 'settings/preferences/view.html',
  //       controller: 'PreferencesCtrl'
  //     }
  //   }
  // })

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

  .state('login', {
    url: '/login',
    templateUrl: 'login/view.html',
    controller: 'LoginCtrl'
  })

  // if none of the above states are matched, redirect to the login tab
  $urlRouterProvider.otherwise('/login');

});
