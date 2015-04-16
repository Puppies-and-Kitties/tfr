angular.module('chats.services', ['firebase'])

.factory('Chats', function($firebaseArray,userSession,$stateParams) {

  return {
    // Currently not being used
    // all: function() {
    //   return chats;
    // },
    // remove: function(chat) {
    //   chats.splice(chats.indexOf(chat), 1);
    // },
    // get: function(chatId) {
    //   for (var i = 0; i < chats.length; i++) {
    //     if (chats[i].id === parseInt(chatId)) {
    //       return chats[i];
    //     }
    //   }
    //   return null;
    // },
    set: function(userId,matchId){
      var currentMatchChats = new Firebase("https://ionictestchat.firebaseio.com/"+userId+matchId);
      console.log('currentMatchChats',currentMatchChats);
      return $firebaseArray(currentMatchChats);
    },
    add: function(firebaseArr,from,message,fbId){
      var photoUri = "//graph.facebook.com/"+fbId+"/picture";
      firebaseArr.$add({from:from,message:message,photoUri:photoUri});
    }
  };
});
