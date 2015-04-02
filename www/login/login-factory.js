angular.module('login.services', [])

.factory('LoginFact', function(){

  var getUserStatus = function(){
    var userStatus = null;

    openFB.getLoginStatus(function(response){
      if(response.status === 'connected'){
        console.log('Logged in')
        userStatus = true;
      } 
      else {
        console.log('logged out')
        userStatus = false;
      }
    });
    return userStatus;  
  };

  var userStatus = getUserStatus();

  return {
    getUserStatus: getUserStatus
  }
})