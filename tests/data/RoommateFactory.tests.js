describe('Factory: RoommateFactory', function() {
  // var scope, $login, controller;
  var scope, RoommateFactory, httpBackend;

  var testRoommatePreferences;
  //load controller's module and other necessary modules
  beforeEach(module('data'/*,'ui.router'*/));

  beforeEach(inject(function(_RoommateFactory_, $httpBackend) {
    RoommateFactory = _RoommateFactory_;
    httpBackend = $httpBackend;

    testRoommatePreferences = {
      gender: 'female',
      ageMin: 22,
      ageMax: 26
    };
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  //tests start here
  describe('RoommateFactory', function() {

    it('Should initialize roommatePreferences to the empty default', function(){
      var roommatePreferences = RoommateFactory.all();
      expect(roommatePreferences.gender).toBeNull();
      expect(Object.keys(roommatePreferences).length).toEqual(3);
    });

    describe('initialize', function() {

      it("Should initialize roommatePreferences to the passed in object", function() {
        httpBackend.whenPUT('http://localhost:8888/user/1234/roommatePreferences')
          .respond(testRoommatePreferences)
        RoommateFactory.initialize(testRoommatePreferences, {fbid: 1234})
          .then(function(prefs){
            expect(prefs.ageMin).toEqual(22);
          })
        httpBackend.flush();
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
        httpBackend.whenPUT('http://localhost:8888/user/1234/roommatePreferences')
          .respond(testRoommatePreferences)
        RoommateFactory.initialize(testRoommatePreferences, {fbid: 1234})
          .then(function(prefs){
            expect(RoommateFactory.getProperty('gender')).toEqual('female');
            expect(RoommateFactory.getProperty('ageMin')).toEqual(22);
            expect(RoommateFactory.getProperty('ageMax')).toEqual(26);
          })
        httpBackend.flush();
      });

    });

  });
  
});
