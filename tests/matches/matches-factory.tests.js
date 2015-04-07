describe('services: matches', function() {

  var MatchesFact;
  
  beforeEach(module('matches.services', 'ui.router'));
  
  beforeEach(inject(function(_MatchesFact_) {
    MatchesFact = _MatchesFact_;
  }));

  it('should have a remove function', function(){
    expect(MatchesFact.remove).toBeDefined();
  });
})