angular.module('starter.controllers', [])


// One of the pre-loaded controllers, will be using it to make test calls to the facebook api
.controller('DashCtrl', function($scope, $resource, LoginFact, User) {
  $scope.fbId = User.id;
  console.log('User object - ', User);
})

.controller('ChatsCtrl', function($scope, Chats, User) {
  $scope.fbId = User.id;

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $state, User) {
  $scope.fbId = User.id;
  $scope.username = User.first_name;

  $scope.settings = {
    enableFriends: true
  };
  
  $scope.fbLogout = function(arg){
    // Call logout function from openFB
    openFB.logout();
    // redirect to login page 
    $state.go('login')
  };
});
