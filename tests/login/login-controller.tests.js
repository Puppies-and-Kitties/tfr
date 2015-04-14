describe('controller: login', function() {
  // var scope, $login, controller;
  var scope;

  //load controller's module and other necessary modules
  beforeEach(module('login.controllers', 'login.services','ui.router', 'firebase'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var controller = $controller('LoginCtrl', { $scope: scope})

  }));

  //tests start here
  xit('should have a login function', function() {
    // expect(scope.login).to.be.a('function');
    // console.log("scope ", scope.fbLogin);
    expect(scope.login).toBeDefined();
  });

});
