describe('Controllers: SwipeCtrl', function() {
  // var scope, $login, controller;
  var User, scope, controllerSwipe, CandidatesFactory, MatchesFactory, SkippedFactory, httpBackend, createController;

  //load controller's module and other necessary modules
  beforeEach(module('swipe.controllers','data','ui.router'));


  /////////Not quite sure how to use this, ended up using the spyOn jasmine method
  // beforeEach(module(function($provide){
  //   mockCandidateFactory = jasmine.createSpyObj('CandidateFactory', ['all'])
  // }))

  beforeEach(inject(function($rootScope, $httpBackend, $controller, _CandidatesFactory_, _MatchesFactory_, _SkippedFactory_) {
    scope = $rootScope.$new();
    createController = function() {
      return $controller('SwipeController', {$scope: scope, User: User});
    }
    CandidatesFactory = _CandidatesFactory_;
    MatchesFactory = _MatchesFactory_;
    SkippedFactory = _SkippedFactory_;
  }));

  //tests start here
  describe('SwipeController', function() {

    it('scope.candidates should call all candidates from candidates factory', function() {
      spyOn(CandidatesFactory, 'all').and.returnValue(testCandidates);
      var controller = createController();
      expect(CandidatesFactory.all).toHaveBeenCalled();
    });

    it('Should initialize scope.currentCandidate to be the first candidate in the list of loaded candidates', function() {
      spyOn(CandidatesFactory, 'all').and.returnValue(testCandidates);
      spyOn(CandidatesFactory, 'getFirst').and.returnValue(testCandidates[0]);
      var controller = createController();
      expect(scope.currentCandidate).toEqual(CandidatesFactory.getFirst());
    });

    it('should have a candidateSwipe function', function(){
      expect(scope.candidateSwipe).toBeDefined;
    });

    it('should not initialize currentCandidate.match, currentCandidate.rated or currentCandidate.hide',function(){
      spyOn(CandidatesFactory, 'all').and.returnValue(testCandidates);
      var controller = createController();
      expect(scope.currentCandidate.rated).not.toBeDefined;
      expect(scope.currentCandidate.hide).not.toBeDefined;
    });

    describe('scope.candidateSwipe', function() {

      fit('Should set currentCandidate.match to true and add the current candidate to MatchesFactory if like is selected', function() {
        spyOn(CandidatesFactory, 'all').and.returnValue(testCandidates);
        spyOn(MatchesFactory, 'add').and.returnValue({fbid: 1234, matched:[2222]});
        spyOn(MatchesFactory, 'saveAllMatches').and.returnValue({fbid: 1234, matched:[2222]});
        spyOn(MatchesFactory, 'updateMatchedUsers').and.returnValue({fbid: 2222, matched: [1234]});
        var controller = createController();
        expect(scope.currentCandidate.matched).not.toBeDefined;
        scope.candidateSwipe(true);
        expect(MatchesFactory.add).toHaveBeenCalled();
        expect(scope.currentCandidate.matched).toBeDefined;
        // expect(MatchesFactory.get(scope.currentCandidate.id).id).toEqual(CandidatesFactory.getFirst().id);
      });

      it('Should call SkipFactory.add if current candidate is skipped', function() {
        spyOn(CandidatesFactory, 'all').and.returnValue(testCandidates);
        spyOn(SkippedFactory, 'add')
        var controller = createController();
        expect(scope.currentCandidate.match).not.toBeDefined;
        scope.candidateSwipe(false);
        expect(SkippedFactory.add).toHaveBeenCalled();
        expect(scope.currentCandidate.match).toEqual(false);
        // expect(SkippedFactory.getFirst().id).toEqual(CandidatesFactory.getFirst().id);
      });

      // Need to incorporate $timeout into test before this will work
      // it('Should remove candidates from CandidatesFactory and update scope.currentCandidate', function(){
      //   var currentCandidateID = CandidatesFactory.getFirst().id;
      //   expect(scope.currentCandidate.id).toEqual(currentCandidateID);
      //   scope.candidateSwipe(true);
      //   expect(CandidatesFactory.getFirst().id).not.toEqual(currentCandidateID);
      //   expect(scope.currentCandidate.id).toEqual(CandidatesFactory.getFirst().id);
      //   currentCandidateID = CandidatesFactory.getFirst().id;
      //   scope.candidateSwipe(false);
      //   console.log(scope.currentCandidate,CandidatesFactory.getFirst());
      //   expect(CandidatesFactory.getFirst().id).not.toEqual(currentCandidateID);
      //   expect(scope.currentCandidate.id).toEqual(CandidatesFactory.getFirst().id);

      // });

    });


  });
var testCandidates = [{
    fbid: 0,
    name: 'Daniel Miller',
    face: 'img/faceDaniel.png',
    email: 'djmiller@gmail.com',
    chatURL: 'https://ionictestchat.firebaseio.com/10155475481120094499',
    match: false,
    likedCurrentUser: true,
    location: { 
      host: true,
      myPlace: {
        rent: 750,
        zipCode: null,
        genders: 'both',
        openRooms: 1,
        roomType: 'private',
        occupants: 3,
        city: 'Berkeley',
        state: 'CA',
        latitude: 37.867044,
        longitude: -122.250559
      },
      desiredPlace:{
        rent: null,
        zipCode: null,
        radius: null,
        roomType: null,
        latitude: null,
        longitude: null,
        city: null,
        state: null
      }
    },
    roommatePreferences: {
      gender: 'male',
      ageMin: 21,
      ageMax: 30
    },
    profile: {
      gender: 'male',
      age: 27,
      keywords: ['peaceful','cake','beer','wine','cheese']
    },
    liked: ["552eabd2a2d7560782cabdef"]
  }, {
    fbid: 1,
    name: 'Dick Rogers',
    face: 'img/face1.png',
    email: 'dickrodgers@test.com',
    match: false,
    likedCurrentUser: false,
    location: { 
      host: true,
      myPlace: {
        rent: null,
        zipCode: null,
        genders: null,
        openRooms: null,
        roomType: null,
        occupants: 3,
        city: null,
        state: null,
        latitude: null,
        longitude: null
      },
      desiredPlace:{
        rent: 900,
        zipCode: null,
        radius: 3,
        roomType: 'private',
        latitude: 37.79730575499309,
        longitude: -122.41619110107422,
        city: 'Berkeley',
        state: 'CA'
      }
    },
    roommatePreferences: {
      gender: 'male',
      ageMin: 21,
      ageMax: 30
    },
    profile: {
      gender: 'male',
      age: 27,
      keywords: ['rowdy','beer','cookies','football','cheese whiz']
    },
    liked: ["552eabd2a2d7560782cabdef"]
  }, {
    fbid: 2,
    name: 'Thick McStevens',
    face: 'img/face2.png',
    email: 'thicksteve@test.com',
    match: false,
    likedCurrentUser: true,
    location: { 
      host: false,
      myPlace: {
        rent: 750,
        zipCode: null,
        genders: 'both',
        openRooms: 1,
        roomType: 'private',
        occupants: 3,
        city: 'Berkeley',
        state: 'CA',
        latitude: 37.867044,
        longitude: -122.250559
      },
      desiredPlace:{
        rent: 250,
        zipCode: null,
        radius: 5,
        roomType: null,
        latitude: 37.867045,
        longitude: -122.250560,
        city: 'Berkeley',
        state: 'CA'
      }
    },
    roommatePreferences: {
      gender: 'male',
      ageMin: 21,
      ageMax: 30
    },
    profile: {
      gender: 'male',
      age: 27,
      keywords: ['peaceful','cake','beer','wine','cheese']
    },
    liked: []
  }, {
    fbid: 3,
    name: 'Jim Carrey',
    face: 'img/face3.jpeg',
    email: 'jimcarrey@test.com',
    match: false,
    likedCurrentUser: true,
    location: { 
      host: true,
      myPlace: {
        rent: 750,
        zipCode: null,
        genders: 'both',
        openRooms: 1,
        roomType: 'private',
        occupants: 3,
        city: 'Berkeley',
        state: 'CA',
        latitude: 37.867044,
        longitude: -122.250559
      },
      desiredPlace:{
        rent: null,
        zipCode: null,
        radius: null,
        roomType: null,
        latitude: null,
        longitude: null,
        city: null,
        state: null
      }
    },
    roommatePreferences: {
      gender: 'male',
      ageMin: 21,
      ageMax: 30
    },
    profile: {
      gender: 'male',
      age: 27,
      keywords: ['Chiller','Smoker','beer','wine','cheese']
    },
    liked: ["552eabd2a2d7560782cabdef"]
  }, {
    fbid: 4,
    name: 'Max Howser',
    face: 'img/face5.jpeg',
    email: 'maxhowser@test.com',
    match: false,
    likedCurrentUser: true,
    location: { 
      host: true,
      myPlace: {
        rent: 750,
        zipCode: null,
        genders: 'both',
        openRooms: 1,
        roomType: 'private',
        occupants: 3,
        city: 'Reno',
        state: 'NV',
        latitude: 39.49556336059472,
        longitude: -119.805908203125
      },
      desiredPlace:{
        rent: null,
        zipCode: null,
        radius: null,
        roomType: null,
        latitude: null,
        longitude: null,
        city: null,
        state: null
      }
    },
    roommatePreferences: {
      gender: 'male',
      ageMin: 21,
      ageMax: 30
    },
    profile: {
      gender: 'male',
      age: 27,
      keywords: ['Nuts','Crazy','Wild','Hateful','Bad']
    },
    liked: ["552eabd2a2d7560782cabdef"]
  }, {
    fbid: 5,
    name: 'Zack Thompson',
    face: 'img/face4.jpeg',
    email: 'zackthompson@test.com',
    match: false,
    likedCurrentUser: true,
    location: { 
      host: true,
      myPlace: {
        rent: 750,
        zipCode: null,
        genders: 'both',
        openRooms: 1,
        roomType: 'private',
        occupants: 3,
        city: 'Berkeley',
        state: 'CA',
        latitude: 37.86509663749013,
        longitude: -122.2639274597168
      },
      desiredPlace:{
        rent: null,
        zipCode: null,
        radius: null,
        roomType: null,
        latitude: null,
        longitude: null,
        city: null,
        state: null
      }
    },
    roommatePreferences: {
      gender: 'male',
      ageMin: 21,
      ageMax: 30
    },
    profile: {
      gender: 'female',
      age: 24,
      keywords: ['Books','Dogs','Fitness','Fun','Nature']
    },
    liked: ["552eabd2a2d7560782cabdef"]
  }];
  
});


  

  // it('should initialize scope.candidates with all current candidates', function() {
  //   jasmine.log(scopeData.CandidatesFactory.all().length);
  //   expect(scopeSwipe.candidates.length).toEqual(9);
  // });
  

