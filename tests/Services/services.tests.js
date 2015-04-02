describe('Chats Unit Tests', function() {
  var Chats
  beforeEach(module('starter.services'));

  beforeEach(inject(function(_Chats_) {
    Chats = _Chats_;
  }));

  it('can get an instance of my factory', inject(function(Chats) {
    expect(Chats).toBeDefined();
  }));

  it('has 5 chats', inject(function(Chats) {
    expect(Chats.all().length).toEqual(5);
  }));

  it('has Max as afriend with id 1', inject(function(Chats) {
    var oneFriend = {
      id: 1,
      name: 'Max Lynx',
      notes: 'Weird dude'
    };

    expect(Chats.get(1).name).toEqual(oneFriend.name);
  }));

});
