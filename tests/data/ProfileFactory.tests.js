describe('Factory: Profile', function() {
  // var scope, $login, controller;
  var scope, ProfileFactory;

  var testProfile;
  //load controller's module and other necessary modules
  beforeEach(module('data'/*,'ui.router'*/));

  beforeEach(inject(function($rootScope, $injector) {
    scope = $rootScope.$new();
    ProfileFactory = $injector.get('ProfileFactory');
    testProfile = {
      myPlace: {
        peopleCount: 3,
        genders: 'any',
        rent: 1200,
        zipCode: 55555
      },
      gender: 'woman',
      age: 25,
      keywords: ['Running','Coffee','Student','Vegetarian']
    };
  }));

  //tests start here
  describe('ProfileFactory', function() {

    xit('Should initialize profile to the mostly empty default', function(){
      var profile = ProfileFactory.all();
      expect(profile.myPlace.peopleCount).toEqual(2);
      expect(profile.gender).toBeNull();
      expect(profile.keywords.length).toEqual(5);
    });

    describe('initialize', function() {

      xit("Should initialize profile to the passed in object", function() {
        ProfileFactory.initialize(testProfile);
        var profile = ProfileFactory.all();
        
        expect(profile.myPlace.peopleCount).toEqual(3);
        expect(profile.gender).toEqual('woman');
        expect(profile.keywords[1]).toEqual('Coffee');
      });

    });

    describe('all', function() {

      xit("Should return the profile object", function() {
        var profile = ProfileFactory.all();
        expect(Object.keys(profile).length).toEqual(4);
        expect(Object.keys(profile.myPlace).length).toEqual(4);
      });

    });

    describe('update', function() {

      xit("Should update a profile property", function() {
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

      xit("Should return the specified property", function() {
        ProfileFactory.initialize(testProfile);
        expect(ProfileFactory.getProperty('age')).toEqual(25);
        expect(ProfileFactory.getProperty('gender')).toEqual('woman');
        var myPlace = ProfileFactory.getProperty('myPlace');
        expect(myPlace.rent).toEqual(1200);
        expect(myPlace.zipCode).toEqual(55555);
      });

    });

  });
  
});
