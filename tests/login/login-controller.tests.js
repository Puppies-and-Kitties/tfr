describe('controller: login', function() {
  // var scope, $login, controller;
  var scope;

  //load controller's module and other necessary modules
  beforeEach(module('login.controllers', 'login.services','ui.router'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var controller = $controller('LoginCtrl', { $scope: scope})

  }));

  //tests start here
  it('should have a fb login function', function() {
    // expect(scope.fbLogin).to.be.a('function');
    console.log("scope ", scope.fbLogin)
    expect(scope.fbLogin).toBeDefined();
  });

});
