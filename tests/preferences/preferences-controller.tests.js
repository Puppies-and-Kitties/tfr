describe('controller: preferences', function() {
  // var scope, $login, controller;
  var scope, User;

  //load controller's module and other necessary modules
  beforeEach(module('preferences.controllers', 'ui.router'));

  beforeEach(inject(function($rootScope, $controller, _User_) {
    scope = $rootScope.$new();
    var controller = $controller('PreferencesCtrl', { $scope: scope});
    User = _User_;
  }));

  //tests start here
  // it('should have a save function', function() {
  //   expect(scope.save).toBeDefined();
  // });
  
});
