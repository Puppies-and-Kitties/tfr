angular.module('people.controllers', [])

.controller('PeopleCtrl', function($scope, $state, User, PlaceFactory, RoommateFactory){
  $scope.fbId = User.fbid;
  $scope.username = User.name;
  
  $scope.people = User.roommatePreferences || RoommateFactory.all();

  $scope.savePeople = function(){    
    RoommateFactory.initialize($scope.people, User)
      .then(function(res) {
        console.log('roommatePreferences response ', res);
        User.roommatePreferences = res;
        console.log('User after roommate update ', User)
      })
    $state.go('tab.account');
  };
  
});
