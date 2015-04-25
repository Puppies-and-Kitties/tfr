angular.module('matches.controllers', [])

.controller('MatchesCtrl', [
  '$scope', 
  'MatchesFactory', 
  'User', 
  'CandidatesFactory',

  function($scope, MatchesFactory, User, CandidatesFactory){

    $scope.fbId = User.fbId;
    $scope.id = User._id;

    $scope.matches = MatchesFactory.all();
    console.log('MATCHES: ', $scope.matches);
    
    $scope.remove = function(match){
      MatchesFactory.remove(match);
    };
  
}]);
