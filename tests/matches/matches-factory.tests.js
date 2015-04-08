describe('services: matches', function() {

  var MatchesFact;
  
  beforeEach(module('data', 'ui.router'));
  
  beforeEach(inject(function(_MatchesFactory_) {
    MatchesFactory = _MatchesFactory_;
  }));

  it('should have a remove function', function(){
    expect(MatchesFactory.remove).toBeDefined();
  });
})