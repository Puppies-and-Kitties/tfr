describe('controllers: swipe', function() {
  // var scope, $login, controller;
  var scope, CandidatesFactory;

  var testCandidate; 
  //load controller's module and other necessary modules
  beforeEach(module('data'/*,'ui.router'*/));

  beforeEach(inject(function($rootScope, $injector) {
    scope = $rootScope.$new();
    CandidatesFactory = $injector.get('CandidatesFactory');
    testCandidate = {
      id: 0,
      name: 'Jen Sparrow',
      aboutMeWords: 'Logs, Bright-Owl, Hesitator, Taffee',
      // face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
      face: './img/face1.png',
      matched: true,
      likeCurrentUser: true,
      email: 'jensparrow@test.com',
      preferences: {
        radius: 6,
        zipCode: 95990,
        lookingForRoommateOnly: true,
        rent: 1250,
        gender: 'woman'
      }
    };
  }));

  //tests start here
  describe('CandidatesFactory', function() {

    it('Should initialize candidates to the default', function(){
      var candidates = CandidatesFactory.all();
      expect(candidates[1].name).toEqual('Max Lynx');
      expect(candidates[0].preferences.rent).toEqual(250);
      expect(candidates.length).toEqual(20);
    });

    describe('initialize', function() {

      it("Should initialize skipped to the passed in array", function() {
        var newCandidates = CandidatesFactory.all();
        expect(newCandidates.length).toEqual(20);
        newCandidates = newCandidates.slice(10);
        CandidatesFactory.initialize(newCandidates);
        expect(CandidatesFactory.all().length).toEqual(10);
        expect(CandidatesFactory.all()[1].name).toEqual('Demarco Murray');
      });

    });

    describe('all', function() {

      it("Should return all objects", function() {
        expect(CandidatesFactory.all().length).toEqual(20);
      });

    });

    describe('add', function() {

      it("Should add a canidate to CandidatesFactory", function() {
        CandidatesFactory.add(testCandidate);
        expect(CandidatesFactory.all().length).toEqual(21);
        expect(CandidatesFactory.all()[20].name).toEqual('Jen Sparrow');
      });

    });

    describe('getFirst', function() {

      it("Should return the first candidate in CandidatesFactory", function() {
        var getName = CandidatesFactory.getFirst().name;
        expect(getName).toEqual("Ben Sparrow");
      });

    });

  });
  
});
