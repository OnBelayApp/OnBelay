angular.module('nova.services', [])

.factory('Auth', function($http, $state, $window){

  var signin = function(user){
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function(resp){
      return resp.data.token;
    });
  };

  var signup = function(user){
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function(resp){
      return resp.data.token;
    });
  };

  var signout = function(){
    $window.localStorage.removeItem('com.nova');
    $state.go('/signin');
  };

  var isAuth = function(){
    return !!$window.localStorage.getItem('com.nova');
  };

  return {
      signin: signin,
      signup: signup,
      signout: signout,
      isAuth: isAuth
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

});
