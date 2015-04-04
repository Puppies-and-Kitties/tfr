describe('login controller', function() {
  var scope;

  //load controller's module
  beforeEach(module('login.controllers'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  //tests start here
  it('should have a fb login function', function() {
    expect(scope.fbLogin).to.be.a('function');
  });
});
