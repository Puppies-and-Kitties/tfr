describe('controllers: matches', function() {
  // var scope, $login, controller;
  var scope, User;

  //load controller's module and other necessary modules
  beforeEach(module('matches.controllers', 'matches.services','ui.router'));

  beforeEach(inject(function($rootScope, $controller, _User_) {
    scope = $rootScope.$new();
    var controller = $controller('MatchesCtrl', { $scope: scope});
    User = _User_;
  }));

  //tests start here
  // it('should have a remove matches function', function() {
  //   expect(scope.remove).toBeDefined();
  // });
  
});
