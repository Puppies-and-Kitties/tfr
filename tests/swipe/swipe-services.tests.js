describe('services: swipe', function() {

  var Candidates;
  
  beforeEach(module('swipe.services', 'ui.router'));
  
  beforeEach(inject(function(_Candidates_) {
    Candidates = _Candidates_;
  }));

  it('should have a remove function', function(){
    expect(Candidates.remove).toBeDefined();
  });
})