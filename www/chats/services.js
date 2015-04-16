angular.module('chats.services', ['firebase'])

.factory('Chats', function($firebaseArray,userSession,$stateParams) {
  console.log('userSession',userSession);
  var currentMatchChats = new Firebase("https://ionictestchat.firebaseio.com/"+userSession.user.id+$stateParams.matchId);

  var chats = $firebaseArray(currentMatchChats);

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    add: function(from,message){
      chats.$add({from:from,message:message});
    }
  };
});
