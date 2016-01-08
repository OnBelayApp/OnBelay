angular.module('nova.services', [])

.factory('Auth', function($http){

  var signin = function(){};

  var signup = function(){};

  var signout = function(){};

  return {
      signin: signin,
      signup: signup,
      signout: signout
    };

})


.factory('Main', function($http){

  var getProfiles = function(){};


  return {
    getProfiles: getProfiles
  };

})