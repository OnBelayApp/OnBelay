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
      return res.data;
    });
  };

  var getStatus = function() {
    return $http({
      method: 'GET',
      url: '/api/auth/user/flag'
    }).then(function(resp) {
      return resp.data;
    });
  };

  var updateStatus = function(status, climber) {
    var info = {flag: status};

    // if climber is specified, update that climber 
    if (climber) {
      info.username = climber.sender.username;
    }

    return $http({
      method: 'PUT',
      url: '/api/auth/user/flag',
      data: info
    }).then(function(resp) {
      return resp.data;
    });

  };

  return {
    getStatus: getStatus,
    updateStatus: updateStatus,
    getClimbers: getClimbers
  };

})

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

.factory('Notify', function($http, $rootScope) {

  var sendNotification = function(climber) {
    return $http({
      method: 'POST',
      url: '/api/auth/user/notifications/create',
      data: {targetUser: climber}
    }).then(function(res) {
      return res.data;
    });
  };

  var checkNotifications = function() {
    return $http({
      method: 'GET',
      url: '/api/auth/user/notifications/unread'
    }).then(function(resp) {
      $rootScope.unread = resp.data;
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
    }).then(function(resp) {
      console.log(resp.data);
      $rootScope.unread = 0;
      return resp.data;
    });
  };

  var replyToClimber = function(climber) {

    var data = {
      notificationId: climber.id,
      reply: true
    };

    return $http({
      method: 'PUT',
      url: '/api/auth/user/notifications/reply',
      data: {
        notificationId: climber.id,
        reply: true
      }
    }).then(function(res) {
      return res.data;
    });
  };

  return {
    sendNotification: sendNotification,
    checkNotifications: checkNotifications,
    fetchAllNotifications: fetchAllNotifications,
    markAllNotificationsRead: markAllNotificationsRead,
    replyToClimber: replyToClimber
  };

});
