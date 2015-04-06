describe('controller: login', function() {
  // var scope, $login, controller;
  var scope;

  //load controller's module
  beforeEach(module('ui.router'));
  beforeEach(module('login.services'));
  beforeEach(module('login.controllers'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var controller = $controller('LoginCtrl', { $scope: scope})
  }));

  //tests start here
  it('should have a fb login function', function() {
    console.log("scope ", scope.fbLogin)
    expect(scope.fbLogin).toBeDefined();
  });
});
