angular.module('profile.directives', [])

  .directive('candidateTopBox', function() {
    var topBox = '<div><p id="h4">Your next roomate</p><p><i id="h4" class="icon ion-help"></p></div>';
    return {
      replace:true,
      template: topBox
    };
  })
  .directive('matchTopBox', function() {
    var topBox = '<div><p id="h4">We\'re a match!</p><p><i id="h4" class="icon ion-ios-body"></i><i id="h4" class="icon ion-ios-home-outline"></i><i id="h4" class="icon ion-ios-body-outline"></i></p></div>';
    return {
      replace:true,
      template: topBox
    };
  })
  .directive('userTopBox', function() {
    var topBox = '<div><p id="h4">Your profile</p><p><i id="h4" class="icon ion-help"></p></div>';
    return {
      replace:true,
      template: topBox
    };
  })
  .directive('likeDislike', function() {
    var bottomBox = '<div><button class="button-large button button-assertive icon-left ion-close" ng-click="pass(profile)">Skip</button><button class="button-large button button-positive icon-left ion-android-happy" ng-click="like(profile)">Like</button></div>';
    return {
      replace:true,
      template: bottomBox
    };
  })
  .directive('contactInfo', function() {
    var bottomBox = '<div><p><strong>Email:</strong><br> {{profile.email}}</p><p><strong>Phone:</strong><br> {{profile.phone}}</p></div>';
    return {
      replace:true,
      template: bottomBox
    };
  })
  .directive('editProfile', function() {
    var bottomBox = '<div><button class="button-large button button-positive icon-left ion-compose" href="#/tab/account">Edit</button></div>';
    return {
      replace:true,
      template: bottomBox
    };
  })
