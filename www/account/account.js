angular.module('account.controllers', [])

.controller('AccountCtrl', [
  '$scope', 
  '$state', 
  'userSession', 
  'User', 
  '$rootScope', 
  'ProfileFactory', 
  '$ionicPopup',

  function($scope, $state, userSession, User, $rootScope, ProfileFactory, $ionicPopup){

    $scope.username = User.name;

    $scope.fbId = User.fbid;

    $scope.logout = function(){
      userSession.auth.$unauth();
    };

    $scope.alert = function() {
      $ionicPopup.show({
        subTitle: 'Delete account? All of your account data will be removed.',
        // subTitle: ,
        buttons: [
          {
            text: '<b>Delete</b>',
            type: 'button-assertive',
            onTap: function() {
              $scope.deleteAccount(true);
            }
          },
          {
            text: 'Cancel',
            onTap: function () {
              $scope.deleteAccount(false);
            }
          }
        ]
      })
    };

    $scope.deleteAccount = function(bool) {
      if(bool) {
        ProfileFactory.deleteAccount(User);
        $state.go('login');
      }
    };

  }]);
