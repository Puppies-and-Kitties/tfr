angular.module('chats.controllers', [])

.controller('ChatsCtrl', function($scope, User, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
  $scope.add = function(from,chat){
    Chats.add(from,chat);
  }
});