describe('controllers: swipe', function() {
  // var scope, $login, controller;
  var scope, User;

  //load controller's module and other necessary modules
  beforeEach(module('swipe.controllers','ui.router'));

  beforeEach(inject(function($rootScope, $controller, _User_) {
    scope = $rootScope.$new();
    var controller = $controller('SwipeController', { $scope: scope});
    User = _User_;
  }));

  //tests start here
  // it('should have a candidateSwipe function', function() {
  //   expect(scope.candidateSwipe).toBeDefined();
  // });
  
});
