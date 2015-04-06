describe('Controllers', function() {
  var scope, state;

  //load controller's module
  beforeEach(module('ui.router'));
  beforeEach(module('starter.controllers'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('AccountCtrl', {
      $scope: scope
    });
  }));

  //tests start here
  it('should have enabled friends to be true', function() {
    expect(scope.settings.enableFriends).toEqual(true);
  });
});
