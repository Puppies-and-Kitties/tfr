describe('services: swipe', function() {

  var Candidates;
  
  beforeEach(module('data', 'ui.router'));
  
  beforeEach(inject(function(_CandidatesFactory_) {
    CandidatesFactory = _CandidatesFactory_;
  }));

  it('should have a remove function', function(){
    expect(CandidatesFactory.removeFirst).toBeDefined();
  });
})