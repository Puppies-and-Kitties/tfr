angular.module('people.controllers', [])

.controller('PeopleCtrl', function($scope, $state, User, PlaceFactory, RoommateFactory){
  $scope.fbId = User.id;
  $scope.username = User.first_name;

  // $scope.profile = ProfileFactory.all();
  
  $scope.people = RoommateFactory.all();

  $scope.savePeople = function(){
    // Will need to call PreferencesFactory.update and do a PUT/POST request to
    // the server
    console.log('people - ', $scope.people);
    RoommateFactory.initialize($scope.people);
  };

});