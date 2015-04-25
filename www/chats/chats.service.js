angular.module('chats.services', ['firebase'])

.factory('Chats', [
  '$firebaseArray', 
  '$firebaseObject', 
  'FIREBASE_REF', 
  'userSession', 
  '$stateParams', 

  function($firebaseArray, $firebaseObject, FIREBASE_REF, userSession, $stateParams) {

  return {
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
}]);
