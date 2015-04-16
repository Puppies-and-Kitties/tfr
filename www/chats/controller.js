angular.module('chats.controllers', [])

.controller('ChatsCtrl', function($scope, User, Chats, userSession, $stateParams) {

  // We will have to refactor this controller and other parts of the app as to:
    // When a user A likes user B, we check if B already likes A
      // If so, its a match and the url for the firebase chat will already be stored with B's like data
      // If not, the url will have to be created at this time and stored with A's like data
    // Once this url is stored, scope.chat (which will only be defined in the case of matches)
    // will only need to take one parameter: the url for the firebase chat

  $scope.chats = Chats.set(userSession.user.id,$stateParams.matchId);
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
  $scope.add = function(message){
    Chats.add($scope.chats,User.name,message,User.fbid);
  }
});