describe('controllers: swipe', function() {
  // var scope, $login, controller;
  var scope, SkippedFactory;

  var testSkipped; 
  //load controller's module and other necessary modules
  beforeEach(module('data'/*,'ui.router'*/));

  beforeEach(inject(function($rootScope, $injector) {
    scope = $rootScope.$new();
    SkippedFactory = $injector.get('SkippedFactory');
    testSkipped = [
      {id:123,name:"Test Name"},
      {id:456,name:"Hello World"},
      {id:789,name:"Another Test"}
    ];
  }));

  //tests start here
  describe('SkippedFactory', function() {

    describe('initialize', function() {

      it("Should initialize skipped to the passed in array", function() {
        expect(SkippedFactory.all().length).toEqual(0);
        SkippedFactory.initialize(testSkipped);
        expect(SkippedFactory.all().length).toEqual(3);
      });

    });

    describe('all', function() {

      it("Should return an empty array before being initialized", function() {
        expect(SkippedFactory.all().length).toEqual(0);
      });

      it("Should return all added objects array after initialization and adding", function() {
        SkippedFactory.initialize(testSkipped);
        SkippedFactory.add({id:0,name:"Zero",likeCurrentUser:true});
        expect(SkippedFactory.all().length).toEqual(4);
      });

    });

    describe('add', function() {

      it("Should add a match to MatchesFactory", function() {
        SkippedFactory.initialize(testSkipped);
        SkippedFactory.add({id:0,name:"Zero",likeCurrentUser:true});
        expect(SkippedFactory.all().length).toEqual(4);
        SkippedFactory.add({id:1,name:"One",likeCurrentUser:true});
        SkippedFactory.add({id:2,name:"Two",likeCurrentUser:true});
        expect(SkippedFactory.all().length).toEqual(6);
      });

    });

    describe('getFirst', function() {

      it("Should return the first user in SkippedFactory", function() {
        SkippedFactory.initialize(testSkipped);
        var getName = SkippedFactory.getFirst().name;
        expect(getName).toEqual("Test Name");
      });

    });

  });
  
});
