describe('Services: login:', function() {

  var LoginFact, httpBackend;
  
  beforeEach(module('login.services'));
  
  beforeEach(inject(function(_LoginFact_, $httpBackend) {
    LoginFact = _LoginFact_;
    httpBackend = $httpBackend;
  }));

  afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a get fb info function and saveuser function', function(){
    expect(LoginFact.getFbInfo).toBeDefined();
    expect(LoginFact.saveUser).toBeDefined();
  });

  describe('saveUser:', function() {

    it('should get send a post request with the user data', function() {
      LoginFact.saveUser({id: 1234, name: "Jack"});
      httpBackend.expectPOST('http://localhost:8888/user/1234', {name: "Jack"})
        .respond(200);
      httpBackend.flush();
    })

  })

})