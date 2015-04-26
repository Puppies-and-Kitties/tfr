angular.module('profile.directives', [])

  .directive('profileBox', [
    '$compile', 
    '$http', 
    '$templateCache', 

    function($compile, $http, $templateCache) {

      var getTemplate = function(boxType) {
          console.log("box type in getTemplate ", boxType)
          var templateLoader,
          baseUrl = './profiles/directives/',
          templateMap = {
              swipeTop: 'candidate-top-box.html',
              matchesBottom: 'contact-info.html',
              userBottom: 'edit-profile.html',
              swipeBottom: 'like-dislike.html',
              matchesTop: 'match-top-box.html',
              userTop: 'user-top-box.html',
          };

          var templateUrl = baseUrl + templateMap[boxType];
          templateLoader = $http.get(templateUrl, {cache: $templateCache});
          return templateLoader;

      }

      var linker = function(scope, element, attrs) {
          console.log("scope.boxtype.type", scope.boxtype.type);
          var loader = getTemplate(scope.boxtype.type);

          var promise = loader.success(function(html) {
              element.html(html);
          }).then(function (response) {
              console.log("element ", element)
              element.replaceWith($compile(element.html())(scope));
              console.log("element 2 ", element)
          });
      }

      return {
          transclude: true,
          restrict: 'E',
          scope: {
              boxtype:'=',
              boxaction:"&",
              boxprofile:'='
          },
          link: linker,
      };
      
  }]);
