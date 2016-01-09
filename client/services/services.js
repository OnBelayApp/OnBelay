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
      url: "/api/auth/user/climbers"
    }).then(function(res){
<<<<<<< HEAD
      console.log('res in fact', res);
=======
>>>>>>> 64615ca510d58ca888caf0072ba2b4ab704ec3c7
      return res.data;
    });
  };

  return {
    getClimbers: getClimbers
  };

})

<<<<<<< HEAD
.factory('Update', function($http){
  var update = function(user){
    return $http.put('/api/auth/user/update', user)
    .then(function(response){
      return response.data;
    })
    .catch(function(err){
      console.error(err);
    });
  };

  return {
    update: update
  };

})
=======
>>>>>>> 64615ca510d58ca888caf0072ba2b4ab704ec3c7
.factory('Notify', function($http) {

  var sendNotification = function(climber) {
    return $http({
      method: 'POST',
      url: '/api/auth/user/notifications/create',
      data: {targetUser: climber}
    }).then(function(res) {
      return res.data;
    });
  };

  var fetchAllNotifications = function() {
    return $http({
      method: 'GET',
      url: '/api/auth/user/notifications/incoming'
    }).then(function(res) {
      return res.data;
    });
  };

  var markAllNotificationsRead = function() {
    return $http({
      method: 'PUT',
      url: '/api/auth/user/notifications/read'
    }).then(function(res) {
      return res.data;
    });
  };

  var replyToClimber = function(climber) {
    return $http({
      method: 'PUT',
      url: '/api/auth/user/notifications/reply',
      data: climber
    }).then(function(res) {
      return res.data;
    });
  };

  return {
    sendNotification: sendNotification,
    fetchAllNotifications: fetchAllNotifications,
    markAllNotificationsRead: markAllNotificationsRead,
    replyToClimber: replyToClimber
  };

});
