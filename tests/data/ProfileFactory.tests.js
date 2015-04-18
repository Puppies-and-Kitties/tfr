describe('Factory: Profile', function() {
  // var scope, $login, controller;
  var scope, ProfileFactory, httpBackend;

  var testProfile;
  //load controller's module and other necessary modules
  beforeEach(module('data'/*,'ui.router'*/));

  beforeEach(inject(function($httpBackend, _ProfileFactory_) {
    ProfileFactory = _ProfileFactory_;
    httpBackend = $httpBackend;
    testProfile = {
      gender: 'female',
      age: 25,
      keywords: ['Running','Coffee','Student','Vegetarian']
    };
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  //tests start here
  describe('ProfileFactory', function() {

    it('Should initialize profile to empty default', function(){
      var profile = ProfileFactory.all();
      expect(profile.gender).toBeNull();
      expect(profile.keywords.length).toEqual(5);
    });

    describe('initialize', function() {

      it("Should initialize profile to the passed in object", function() {
        httpBackend.whenPUT('http://localhost:8888/user/1234/profile')
          .respond(testProfile)
        ProfileFactory.initialize(testProfile, {fbid: 1234})
          .then(function(newProfile) {
            console.log("new location ", newProfile)
            expect(newProfile.age).toEqual(25);
          });
        httpBackend.flush();
      });

    });

    describe('all', function() {

      it("Should return the profile object", function() {
        httpBackend.whenPUT('http://localhost:8888/user/1234/profile')
          .respond(testProfile)
        ProfileFactory.initialize(testProfile, {fbid: 1234})
          .then(function(newProfile) {
            expect(ProfileFactory.all().gender).toEqual('female');
          });
        httpBackend.flush();
      });

    });

    describe('update', function() {

      it("Should update a profile property", function() {
        ProfileFactory.update('age',35);
        ProfileFactory.update('keywords',['Jogging','tea','teacher']);
        var newPlace = {
          peopleCount: 4,
          genders: 'women',
          rent: 1200,
          zipCode: 12345
        };
        ProfileFactory.update('myPlace',newPlace);
        var profile = ProfileFactory.all();
        expect(profile.age).toEqual(35);
        expect(profile.keywords[1]).toEqual('tea');
        expect(profile.myPlace.peopleCount).toEqual(4);
        expect(profile.myPlace.zipCode).toEqual(12345);
      });

    });

    describe('getProperty', function() {

      it("Should return the specified property", function() {
        httpBackend.whenPUT('http://localhost:8888/user/1234/profile')
          .respond(testProfile)
        ProfileFactory.initialize(testProfile, {fbid: 1234})
          .then(function(newProfile) {
            expect(ProfileFactory.getProperty('age')).toEqual(25);
            expect(ProfileFactory.getProperty('gender')).toEqual('female');
          });
        httpBackend.flush();
      });

    });

  });
  
});
