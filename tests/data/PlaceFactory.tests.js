describe('controllers: swipe', function() {
  // var scope, $login, controller;
  var scope, PlaceFactory;

  var testPlace;
  //load controller's module and other necessary modules
  beforeEach(module('data'/*,'ui.router'*/));

  beforeEach(inject(function($rootScope, $injector) {
    scope = $rootScope.$new();
    PlaceFactory = $injector.get('PlaceFactory');
    testPlace = { 
      host: 'Jane',
      myPlace: {
        rent: 1000,
        zipCode: 77777,
        genders: 'any',
        openRooms: 2,
        roomType: 'awesome',
        occupants: 1
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

  //tests start here
  describe('PlaceFactory', function() {

    it('Should initialize place to the mostly empty default', function(){
      var place = PlaceFactory.all();
      expect(place.myPlace.rent).toEqual(1000);
      expect(place.myPlace.genders).toBeNull();
      expect(Object.keys(place.desiredPlace).length).toEqual(8);
    });

    describe('initialize', function() {

      it("Should initialize place to the passed in object", function() {
        PlaceFactory.initialize(testPlace);
        var place = PlaceFactory.all();
        
        expect(place.myPlace.zipCode).toEqual(77777);
        expect(place.myPlace.genders).toEqual('any');
        expect(place.desiredPlace.radius).toEqual(3);
        expect(place.desiredPlace.roomType).toEqual('awesome');
      });

    });

    describe('all', function() {

      it("Should return the place object", function() {
        var place = PlaceFactory.all();
        expect(Object.keys(place).length).toEqual(3);
        expect(Object.keys(place.myPlace).length).toEqual(6);
        expect(Object.keys(place.desiredPlace).length).toEqual(8);
      });

    });

    describe('update', function() {

      it("Should update a place property", function() {
        PlaceFactory.update('host','Jo');
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
        expect(place.host).toEqual('Jo');
        expect(place.myPlace.zipCode).toEqual(88888);
        expect(place.myPlace.roomType).toEqual('nice');
        expect(place.desiredPlace.zipCode).toEqual(99999);
        expect(place.desiredPlace.roomType).toEqual('nice');
      });

    });

    describe('getProperty', function() {

      it("Should return the specified property", function() {
        PlaceFactory.initialize(testPlace);
        expect(PlaceFactory.getProperty('host')).toEqual('Jane');
        var myPlace = PlaceFactory.getProperty('myPlace');
        expect(myPlace.genders).toEqual('any');
        expect(myPlace.zipCode).toEqual(77777);
      });

    });

  });
  
});
