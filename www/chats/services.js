angular.module('chats.services', ['firebase'])

.factory('Chats', function($firebaseArray,$firebaseObject,userSession,$stateParams) {

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
    matchChatURL: function(chatURLName,existingChatUrl){
      return existingChatUrl||"https://ionictestchat.firebaseio.com/chats"+chatURLName;
    },
    setChats: function(matchChatURL){
      var currentMatchChats = new Firebase(matchChatURL);
      return $firebaseArray(currentMatchChats);
    },
    setUserAccess: function(chatURLName,userId,matchId){
      var ref = new Firebase("https://ionictestchat.firebaseio.com/chatAccessIDs");
      var allowedUsers = {userId:true,matchId:true};
     ref.child(chatURLName).set({
        user1:userId,
        user2:matchId
      });
      // $firebaseObject(usersRef).$save().then(function(ref){
      //   console.log("users saved!",ref);
      // });
    },
    add: function(firebaseArr,from,message,fbId){
      var photoUri = "//graph.facebook.com/"+fbId+"/picture";
      firebaseArr.$add({from:from,message:message,photoUri:photoUri});
    }
  };
});
