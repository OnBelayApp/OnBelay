angular.module('nova.services', [])

.factory('Auth', function($http, $state, $window){

  var signin = function(user){
    return $http({
      method: 'POST',
      url: '/api/signin',
      data: user
    })
    .then(function(resp){
      return resp.data.token;
    });
  };

  var signup = function(user){
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    })
    .then(function(resp){
      return resp.data.token;
    })
  };

  var signout = function(){
    $window.localStorage.removeItem('com.nova');
    $state.go('signin');
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
      url: "/api/auth/user/climbers",
    }).then(function(res){
      return res;
    });
  };

  return {
    getClimbers: getClimbers
  };

})

.factory('Update', function($http){
  var update = function(){
    return $http.post('/api/auth/user/update', user)
    .then(function(response){
      return response.data;
    })
    .catch(function(err){
      console.error(err);
    });
  };

  return {
    update: update
  }
});
