describe('Factory: Candidates: ', function() {
  // var scope, $login, controller;
  var scope, CandidatesFactory, httpBackend;

  //load controller's module and other necessary modules
  beforeEach(module('data'/*,'ui.router'*/));

  beforeEach(inject(function(_CandidatesFactory_, $httpBackend) {
    httpBackend = $httpBackend;
    CandidatesFactory = _CandidatesFactory_;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  })

  //tests start here
  describe('Initialize and All', function() {

    it('Should initialize candidates with get request and return them with all', function(){
      httpBackend.whenGET("http://localhost:8888/user/1234/Berkeley")
        .respond(testCandidates);
      CandidatesFactory.initialize({
        data:{
          fbid: 1234, 
          location:{
            host: true, 
            myPlace:{
              city: "Berkeley"
            }
          }
        }
      })
      .then(function(candidates){
        expect(CandidatesFactory.all().length).toEqual(6);
      })
      httpBackend.flush();
    });
  });
    ////////////////////// Does not apply right now ////////////////////////
    describe('initialize', function() {

      xit("Should initialize skipped to the passed in array", function() {
        var newCandidates = CandidatesFactory.all();
        expect(newCandidates.length).toEqual(20);
        newCandidates = newCandidates.slice(10);
        CandidatesFactory.initialize(newCandidates);
        expect(CandidatesFactory.all().length).toEqual(10);
        expect(CandidatesFactory.all()[1].name).toEqual('Demarco Murray');
      });

    });
    //////////////////////////////////////////////////////////////////////

    describe('add', function() {

      it("Should add candidates to candidates array", function() {
        CandidatesFactory.add(testCandidate);
        expect(CandidatesFactory.all().length).toEqual(1);
        expect(CandidatesFactory.all()[0].name).toEqual('Jen Sparrow');
      });

    });

    describe('getFirst', function() {

      it("Should return the first candidate in CandidatesFactory", function() {
        httpBackend.whenGET("http://localhost:8888/user/1234/Berkeley")
          .respond(testCandidates);
        CandidatesFactory.initialize({
          data:{
            fbid: 1234, 
            location:{
              host: true, 
              myPlace:{
                city: "Berkeley"
              }
            }
          }
        })
        .then(function(candidates){
          var getName = CandidatesFactory.getFirst().name;
          expect(getName).toEqual("Daniel Miller");
        })
        httpBackend.flush();
      });

    });

  
var testCandidate = {
  fbid: 6,
    name: 'Jen Sparrow',
    face: 'img/faceDaniel.png',
    email: 'jensparrow@test.com',
    match: true,
    likedCurrentUser: true,
    location: { 
      host: true,
      myPlace: {
        rent: 850,
        zipCode: null,
        genders: 'both',
        openRooms: 1,
        roomType: 'private',
        occupants: 2,
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
      gender: 'female',
      ageMin: 21,
      ageMax: 30
    },
    profile: {
      gender: 'female',
      age: 27,
      choiceIonicons: []
    },
    liked: []
  }


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
