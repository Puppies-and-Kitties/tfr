// describe('controllers: profile', function() {
//   // var scope, $login, controller;
//   var scope, controllerSwipe, CandidatesFactory, MatchesFactory, SkippedFactory, User;

//   //load controller's module and other necessary modules
//   //??? Why do we add ui.router here?
//   beforeEach(module('profile.controllers' , 'data','ui.router'));

//   beforeEach(inject(function($rootScope, $controller,$injector,User) {
//     scope = $rootScope.$new();
//     controller = $controller('ProfileCtrl', { $scope: scope});
//     CandidatesFactory = $injector.get('CandidatesFactory');
//     MatchesFactory = $injector.get('MatchesFactory');
//     SkippedFactory = $injector.get('SkippedFactory');
//   }));

//   afterEach(function(){
//     CandidatesFactory.initialize([]);
//     MatchesFactory.initialize([]);
//     SkippedFactory.initialize([]);
//   });

//   describe('ProfileController', function() {

//     it('Should initialize scope.candidates to contain all currently loaded candidates', function() {
//       expect(scope.candidates.length).toEqual(CandidatesFactory.all().length);
//     });

//     it('Should initialize scope.currentCandidate to be the first candidate in the list of loaded candidates', function() {
//       expect(scope.currentCandidate).toEqual(CandidatesFactory.getFirst());
//     });

//     it('should have a candidateSwipe function', function(){
//       expect(scope.candidateSwipe).toBeDefined;
//     });

//     //How to test $stateParams

//     describe('scope.candidateSwipe', function() {

//       it('Should set currentCandidate.match to true and add the current candidate to MatchesFactory if like is selected', function() {
//         expect(MatchesFactory.all().length).toEqual(0);
//         expect(scope.currentCandidate.match).not.toBeDefined;
//         scope.candidateSwipe(true);
//         expect(MatchesFactory.all().length).toEqual(1);
//         expect(MatchesFactory.get(scope.currentCandidate.id).id).toEqual(CandidatesFactory.getFirst().id);
//       });

//       it('Should add the current candidate to SkippedFactory if skip is selected', function() {
//         expect(SkippedFactory.all().length).toEqual(0);
//         expect(scope.currentCandidate.match).not.toBeDefined;
//         scope.candidateSwipe(false);
//         expect(SkippedFactory.all().length).toEqual(1);
//         expect(SkippedFactory.getFirst().id).toEqual(CandidatesFactory.getFirst().id);
//       });

//       it('Should remove candidates from CandidatesFactory and update scope.currentCandidate', function(){
//         var currentCandidateID = CandidatesFactory.getFirst().id;
//         expect(scope.currentCandidate.id).toEqual(currentCandidateID);
//         scope.candidateSwipe(true);
//         expect(CandidatesFactory.getFirst().id).not.toEqual(currentCandidateID);
//         expect(scope.currentCandidate.id).toEqual(CandidatesFactory.getFirst().id);
//         currentCandidateID = CandidatesFactory.getFirst().id;
//         scope.candidateSwipe(false);
//         console.log(scope.currentCandidate,CandidatesFactory.getFirst());
//         expect(CandidatesFactory.getFirst().id).not.toEqual(currentCandidateID);
//         expect(scope.currentCandidate.id).toEqual(CandidatesFactory.getFirst().id);

//       });

//       //??? How to test $state.go('tab.swipe')

//     });


//   });

// });
