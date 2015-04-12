describe('controllers: swipe', function() {
  // var scope, $login, controller;
  var scope, RoommateFactory;

  var testRoommatePreferences;
  //load controller's module and other necessary modules
  beforeEach(module('data'/*,'ui.router'*/));

  beforeEach(inject(function($rootScope, $injector) {
    scope = $rootScope.$new();
    RoommateFactory = $injector.get('RoommateFactory');
    testRoommatePreferences = {
      gender: 'woman',
      ageMin: 22,
      ageMax: 26
    };
  }));

  //tests start here
  describe('RoommateFactory', function() {

    it('Should initialize roommatePreferences to the mostly empty default', function(){
      var roommatePreferences = RoommateFactory.all();
      expect(roommatePreferences.gender).toBeNull();
      expect(Object.keys(roommatePreferences).length).toEqual(3);
    });

    describe('initialize', function() {

      it("Should initialize roommatePreferences to the passed in object", function() {
        RoommateFactory.initialize(testRoommatePreferences);
        var roommatePreferences = RoommateFactory.all();
        
        expect(roommatePreferences.gender).toEqual('woman');
        expect(roommatePreferences.ageMin).toEqual(22);
      });

    });

    describe('all', function() {

      it("Should return the roommatePreferences object", function() {
        var roommatePreferences = RoommateFactory.all();
        expect(Object.keys(roommatePreferences).length).toEqual(3);
      });

    });

    describe('update', function() {

      it("Should update a roommatePreferences property", function() {
        RoommateFactory.update('gender','any');
        RoommateFactory.update('ageMin',24);
        RoommateFactory.update('ageMax',28);
        var roommatePreferences = RoommateFactory.all();
        expect(roommatePreferences.gender).toEqual('any');
        expect(roommatePreferences.ageMin).toEqual(24);
        expect(roommatePreferences.ageMax).toEqual(28);
      });

    });

    describe('getProperty', function() {

      it("Should return the specified property", function() {
        RoommateFactory.initialize(testRoommatePreferences);
        expect(RoommateFactory.getProperty('gender')).toEqual('woman');
        expect(RoommateFactory.getProperty('ageMin')).toEqual(22);
        expect(RoommateFactory.getProperty('ageMax')).toEqual(26);
      });

    });

  });
  
});
