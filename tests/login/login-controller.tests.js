describe('controller: login', function() {
  // var scope, $login, controller;
  var scope, createController;

  //load controller's module and other necessary modules
  beforeEach(module('login.controllers', 'login.services'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    createController = function() {
      return $controller('LoginCtrl', { $scope: scope})
    }
  }));

  //issues with firebaseAuthProvider
  xit('should have a save user function', function() {
    var controller = createController();
    //expect(scope.login).to.be.a('function');
    // console.log("scope ", scope.fbLogin);
    expect(scope.login).toBeDefined();
  });

});
