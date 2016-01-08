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