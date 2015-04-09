angular.module('profile.directives', [])

  .directive('candidateTopBox', function() {
    var topBox = '<li class="item  match"><div class="profile-content"><p id="h4">Your next roomate</p><p><i id="h4" class="icon ion-help"></p></div></li>';
    return {
      template: topBox
    };
  })
  .directive('matchTopBox', function() {
    var topBox = '<li class="item  match"><div class="profile-content"><p id="h4">We\'re a match!</p><p><i id="h4" class="icon ion-ios-body"></i><i id="h4" class="icon ion-ios-home-outline"></i><i id="h4" class="icon ion-ios-body-outline"></i></p></div></li>';
    return {
      template: topBox
    };
  })
  .directive('userTopBox', function() {
    var topBox = '<li class="item  match"><div class="profile-content"><p id="h4">Your profile</p><p><i id="h4" class="icon ion-help"></p></div></li>';
    return {
      template: topBox
    };
  })
  .directive('likeDislike', function() {
    var bottomBox = '<button class="button-large button button-assertive icon-left ion-heart-broken" ng-click="pass(profile)">Pass</button><button class="button-large button button-positive icon-left ion-heart" ng-click="like(profile)">Like</button>';
    return {
      template: bottomBox
    };
  })
  .directive('contactInfo', function() {
    var bottomBox = '<p><strong>Email:</strong><br> {{profile.email}}</p><p><strong>Phone:</strong><br> {{profile.phone}}</p></div></li>';
    return {
      template: bottomBox
    };
  })
  .directive('editProfile', function() {
    var bottomBox = '<button class="button-large button button-positive icon-left ion-compose" href="#/tab/account">Pass</button>';
    return {
      template: bottomBox
    };
  })
