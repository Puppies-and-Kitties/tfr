describe('services: login', function() {

  var LoginFact;
  
  beforeEach(module('login.services'));
  
  beforeEach(inject(function(_LoginFact_) {
    LoginFact = _LoginFact_;
  }));

  it('should have a get user status function', function(){
    expect(LoginFact.getUserStatus).toBeDefined();
  });
})