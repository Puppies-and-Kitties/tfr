describe('services: profile', function() {

  var ProfileFact;
  
  beforeEach(module('profile.services', 'ui.router'));
  
  beforeEach(inject(function(_ProfileFact_) {
    ProfileFact = _ProfileFact_;
  }));

  // it('should have a remove function', function(){
  //   expect(ProfileFact.remove).toBeDefined();
  // });
})