describe('controllers: profile', function() {
  // var scope, $login, controller;
  var scope, User;

  //load controller's module and other necessary modules
  beforeEach(module('profile.controllers' ,'ui.router'));

  beforeEach(inject(function($rootScope, $controller, _User_) {
    scope = $rootScope.$new();
    var controller = $controller('ProfileCtrl', { $scope: scope});
    User = _User_;
  }));

  //tests start here
  // it('should have a like function', function() {
  //   expect(scope.like).toBeDefined();
  // });
  
});
