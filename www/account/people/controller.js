angular.module('people.controllers', [])

.controller('PeopleCtrl', function($scope, $state, User, PlaceFactory, RoommateFactory){
  $scope.fbId = User.fbid;
  $scope.username = User.name;

  // $scope.profile = ProfileFactory.all();
  
  $scope.people = User.roommatePreferences || RoommateFactory.all();

  $scope.savePeople = function(){
    // Will need to call PreferencesFactory.update and do a PUT/POST request to
    // the server
    
    RoommateFactory.initialize($scope.people, User)
      .then(function(res) {
        console.log("muddaflippin roommatePreferences response ", res);
        User.roommatePreferences = res;
        console.log("User after roommate update ", User)
      })
    $state.go('tab.account');
  };

});