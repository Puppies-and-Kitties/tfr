describe('services: preferences', function() {

  var PreferencesFact;
  
  beforeEach(module('preferences.services', 'ui.router'));
  
  beforeEach(inject(function(_PreferencesFact_) {
    PreferencesFact = _PreferencesFact_;
  }));

})