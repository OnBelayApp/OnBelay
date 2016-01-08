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


.factory('Climbers', function($http){

  var getClimbers = function(){
    return $http({
      method: 'GET',
      url: "/auth/user/climbers",
    }).then(function(res){
      return res;
    });
  };

  return {
    getClimbers: getClimbers
  };

})