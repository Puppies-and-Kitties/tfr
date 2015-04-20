angular.module('chats.services', ['firebase'])

.factory('Chats', function($firebaseArray,$firebaseObject,FIREBASE_REF,userSession,$stateParams) {

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
    // matchChatURL: function(chatURLName,existingChatUrl){
    //   return existingChatUrl||"https://ionictestchat.firebaseio.com/"+chatURLName;
    // },
    setChats: function(chatURL){
      var ref = new Firebase(FIREBASE_REF+"/chats");
      return $firebaseArray(ref.child(chatURL));
    },
    setUserAccess: function(chatURL,userId,matchId){
      var ref = new Firebase(FIREBASE_REF+"/chatAccessIDs");
      ref.child(chatURL).set({
        user1:"facebook:"+userId,
        user2:"facebook:"+matchId
      });
    },
    add: function(firebaseArr,from,message,fbId){
      var photoUri = "//graph.facebook.com/"+fbId+"/picture";
      firebaseArr.$add({from:from,message:message,photoUri:photoUri});
    }
  };
});
