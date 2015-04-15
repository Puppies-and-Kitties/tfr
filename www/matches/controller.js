angular.module('matches.controllers', [])

.controller('MatchesCtrl', function($scope, MatchesFactory, User, CandidatesFactory){
  $scope.fbId = User.fbId;

  $scope.getCandidates = function(){
    console.log('sanity chcker')
    CandidatesFactory.mock();
  }
  
  $scope.matches = MatchesFactory.all();

  $scope.remove = function(match){
    MatchesFactory.remove(match);
    //Will also need to do a PUT request here
  }
})
