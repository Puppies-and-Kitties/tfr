angular.module('chats.controllers', [])

.controller('ChatsCtrl', function($scope, User, Chats, MatchesFactory, userSession, $stateParams) {

  var matchId = $stateParams.matchId;
  console.log('match id in chats controller - ', $stateParams);
  
  $scope.match = MatchesFactory.get(matchId);

  var chatURL = $scope.match.matched[User._id] || User.matched[$scope.match._id];  

  if(!chatURL){
    console.log('going to set chat url')
    chatURL = userSession.user.id + matchId;
    MatchesFactory.updateChatURL(matchId,User._id,chatURL, function(matchWithChat) {
      MatchesFactory.updateMatchedUsers(matchWithChat)
        .then(function(res){
          console.log('response made it back to chatURL!');
        })
    });
    Chats.setUserAccess(chatURL,userSession.user.id,matchId);
  }

  $scope.chats = Chats.setChats(chatURL);
  console.log('scope chats ', $scope.chats);

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $scope.add = function(message){
    Chats.add($scope.chats,User.name,message,User.fbid);
  };

});
