angular.module('nova.services', [])

.factory('Auth', function($http){

  var signin = function(user){
    return $http.post('/api/signin', user).then(function(response){
      return response.data.token;
    }).catch(function(err){
      console.error(err);
    })
   };

  var signup = function(user){
    return $http.post('/api/signup', user).then(function(response){
      return response.data.token;
    }).catch(function(err){
      console.error(err);
    })
  };

  var update = function(){
    
  };

  var signout = function(){
    
  };


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

});
