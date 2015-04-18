describe('Controller: Login', function() {
  // var scope, $login, controller;
  var scope, createController, state;

  //load controller's module and other necessary modules
  beforeEach(module('login.controllers', 'login.services', 'ui.router'));

  beforeEach(inject(function($rootScope, $controller, $state) {
    state = $state;
    scope = $rootScope.$new();
    createController = function() {
      return $controller('LoginCtrl', { $scope: scope})
    }
  }));

  //issues with firebaseAuthProvider
  xit('should have a save user function', function() {
    spyOn($state, 'go').andCallFake(function(state, params){

    })
    var controller = createController();
    //expect(scope.login).to.be.a('function');
    // console.log("scope ", scope.fbLogin);
    expect(scope.login).toBeDefined();
  });

});
