describe('Controllers', function() {
  var scope, state, User;
<<<<<<< HEAD
<<<<<<< HEAD

  //load controller's module
  beforeEach(module('starter.controllers', 'ui.router'));
  var scope, state;

  //load controller's module
  beforeEach(module('starter.controllers', 'ui.router'));

  beforeEach(inject(function($rootScope, $controller, _User_) {
    scope = $rootScope.$new();
    $controller('AccountCtrl', {
      $scope: scope
    });
    User = _User_;
  }));

  //tests start here
  // it('should have enabled friends to be true', function() {
  //   expect(scope.settings.enableFriends).toEqual(true);
  // });
});
