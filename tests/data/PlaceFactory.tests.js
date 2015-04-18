describe('Factory: PlaceFactory', function() {
  // var scope, $login, controller;
  var scope, PlaceFactory, httpBackend;

  var testPlace;
  //load controller's module and other necessary modules
  beforeEach(module('data'/*,'ui.router'*/));

  beforeEach(inject(function(_PlaceFactory_, $httpBackend) {
    PlaceFactory = _PlaceFactory_;
    httpBackend = $httpBackend;
    testPlace = { 
      host: true,
      myPlace: {
        rent: 1000,
        zipCode: 77777,
        genders: 'any',
        openRooms: 2,
        roomType: 'awesome',
        occupants: 1,
        city: null,
        state: null
      },
      desiredPlace:{
        rent: 1000,
        zipCode: 77776,
        radius: 3,
        roomType: 'awesome',
        latitude: null,
        longitude: null,
        city: null,
        state: null
      }
    };
  }));
  
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  //tests start here

    it('Should initialize place to the empty default', function(){
      var place = PlaceFactory.all();
      expect(place.myPlace.rent).toBeNull();
      expect(place.myPlace.genders).toBeNull();
      expect(Object.keys(place.desiredPlace).length).toEqual(8);
    });

    describe('initialize', function() {

      it("Should initialize place to the passed in object", function() {
        httpBackend.whenPUT('http://localhost:8888/user/1234/location')
          .respond(testPlace)
        PlaceFactory.initialize(testPlace, {fbid: 1234})
          .then(function(newLocation) {
            expect(newLocation.myPlace.rent).toEqual(1000);
          });
        httpBackend.flush();
      });

    });

    describe('all', function() {

      it("Should return the place object", function() {
        httpBackend.whenPUT('http://localhost:8888/user/1234/location')
          .respond(testPlace)
        PlaceFactory.initialize(testPlace, {fbid: 1234})
          .then(function(newLocation) {
            console.log("all ", PlaceFactory.all())
            expect(PlaceFactory.all().myPlace.rent).toEqual(1000);
          });
        httpBackend.flush();
      });

    });
    /////////////////////////Not Using these right now////////////////////
    describe('update', function() {

      it("Should update a place property", function() {
        PlaceFactory.update('host',false);
        var myPlace = {
          rent: 2000,
          zipCode: 88888,
          genders: 'unspecified',
          openRooms: 1,
          roomType: 'nice',
          occupants: 0
        };
        var desiredPlace = {
          rent: 2000,
          zipCode: 99999,
          radius: 5,
          roomType: 'nice',
        };
        PlaceFactory.update('myPlace',myPlace);
        PlaceFactory.update('desiredPlace',desiredPlace);
        var place = PlaceFactory.all();
        expect(place.host).toEqual(false);
        expect(place.myPlace.zipCode).toEqual(88888);
        expect(place.myPlace.roomType).toEqual('nice');
        expect(place.desiredPlace.zipCode).toEqual(99999);
        expect(place.desiredPlace.roomType).toEqual('nice');
      });

    });

    describe('getProperty', function() {

      it("Should return the specified property", function() {
        httpBackend.whenPUT('http://localhost:8888/user/1234/location')
          .respond(testPlace)
        PlaceFactory.initialize(testPlace, {fbid: 1234})
          .then(function(newLocation) {
            expect(PlaceFactory.getProperty('host')).toEqual(true);
            var myPlace = PlaceFactory.getProperty('myPlace');
            expect(myPlace.genders).toEqual('any');
            expect(myPlace.zipCode).toEqual(77777);
          });
        httpBackend.flush();
      });

    });
    ///////////////////////////////////////////////////////////////

  
});
