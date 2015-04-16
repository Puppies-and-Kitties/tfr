describe('controllers: swipe', function() {
  // var scope, $login, controller;
  var scope, MatchesFactory;

  var testMatches; 
  //load controller's module and other necessary modules
  beforeEach(module('data'/*,'ui.router'*/));

  beforeEach(inject(function($rootScope, $injector) {
    scope = $rootScope.$new();
    MatchesFactory = $injector.get('MatchesFactory');
    testMatches = [
      {id:123,name:"Test Name"},
      {id:456,name:"Hello World"},
      {id:789,name:"Another Test"}
    ];
  }));
  

  //tests start here
  describe('MatchesFactory', function() {

    describe('initialize', function() {

      it("Should initialize matches to the passed in array", function() {
        expect(MatchesFactory.all().length).toEqual(0);
        MatchesFactory.initialize(testMatches);
        expect(MatchesFactory.all().length).toEqual(3);
      });

    });

    describe('all', function() {

      it("Should return an empty array before being initialized", function() {
        expect(MatchesFactory.all().length).toEqual(0);
      });

      xit("Should return all added objects array after initialization and adding", function() {
        MatchesFactory.initialize(testMatches);
        MatchesFactory.add({id:0,name:"Zero",likeCurrentUser:true});
        expect(MatchesFactory.all().length).toEqual(4);
      });

    });

    describe('remove', function() {

      it("Should remove a match from MatchesFactory", function() {
        MatchesFactory.initialize(testMatches);
        MatchesFactory.remove(testMatches[1]);
        expect(MatchesFactory.all().length).toEqual(2);
        MatchesFactory.remove(testMatches[1]);
        MatchesFactory.remove(testMatches[0]);
        expect(MatchesFactory.all().length).toEqual(0);
      });

    });

    describe('add', function() {

      xit("Should add a match to MatchesFactory", function() {
        MatchesFactory.initialize(testMatches);
        MatchesFactory.add({id:0,name:"Zero",likeCurrentUser:true});
        expect(MatchesFactory.all().length).toEqual(4);
        MatchesFactory.add({id:1,name:"One",likeCurrentUser:true});
        MatchesFactory.add({id:2,name:"Two",likeCurrentUser:true});
        expect(MatchesFactory.all().length).toEqual(6);
      });

    });

    describe('get', function() {

      xit("Should return a match with the specified id from MatchesFactory", function() {
        MatchesFactory.initialize(testMatches);
        var getName = MatchesFactory.get(456).name;
        expect(getName).toEqual("Hello World");
      });

    });

  });
  
});
